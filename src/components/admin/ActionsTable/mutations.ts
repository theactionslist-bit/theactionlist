"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/admin/auth";
import { OTHER_SOURCE_TYPE } from "./constant";
import type { ActionInput } from "./service";

const LINK_PREVIEW_API_URL = "https://api.linkpreview.net/";

interface LinkPreviewResult {
  title: string;
  description: string;
  image: string;
  url: string;
}

async function fetchLinkPreview(url: string): Promise<LinkPreviewResult | null> {
  const apiKey = process.env.LINKPREVIEW_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `${LINK_PREVIEW_API_URL}?key=${apiKey}&q=${encodeURIComponent(url)}`,
    );
    const data = await response.json();
    if (!response.ok || !data?.url || !data?.title) return null;

    return {
      title: data.title,
      description: data.description ?? "",
      image: data.image ?? "",
      url: data.url,
    };
  } catch {
    return null;
  }
}

/**
 * Syncs a URL-list field against a child table: removes rows for URLs no longer
 * present, and fetches+inserts a row only for URLs that weren't already there —
 * unchanged URLs are left untouched so re-saving doesn't re-burn API quota.
 */
async function syncUrlEntries(
  supabase: ReturnType<typeof createAdminClient>,
  table: string,
  actionId: string,
  matchColumn: "url" | "link_url",
  urls: string[],
  buildRow: (url: string, preview: LinkPreviewResult) => Record<string, unknown>,
  scope: Record<string, string> = {},
): Promise<{ error?: string }> {
  let existingQuery = supabase.from(table).select(`id, ${matchColumn}`).eq("action_id", actionId);
  for (const [column, value] of Object.entries(scope)) {
    existingQuery = existingQuery.eq(column, value);
  }
  const { data: existingRows, error: fetchError } = await existingQuery;
  if (fetchError) return { error: fetchError.message };

  const existing = (existingRows ?? []) as Record<string, string>[];
  const existingValues = new Set(existing.map((row) => row[matchColumn]));
  const toRemove = existing.filter((row) => !urls.includes(row[matchColumn]));
  const toAdd = urls.filter((url) => !existingValues.has(url));

  if (toRemove.length > 0) {
    const { error } = await supabase
      .from(table)
      .delete()
      .in("id", toRemove.map((row) => row.id));
    if (error) return { error: error.message };
  }

  for (const url of toAdd) {
    const preview = await fetchLinkPreview(url);
    if (!preview) {
      return { error: `Could not fetch details for "${url}". Please check it and try again.` };
    }
    const { error } = await supabase.from(table).insert(buildRow(url, preview));
    if (error) return { error: error.message };
  }

  return {};
}

function syncActionProducts(
  supabase: ReturnType<typeof createAdminClient>,
  actionId: string,
  urls: string[],
): Promise<{ error?: string }> {
  return syncUrlEntries(supabase, "action_products", actionId, "url", urls, (_url, preview) => ({
    action_id: actionId,
    url: preview.url,
    title: preview.title,
    description: preview.description,
    image: preview.image,
  }));
}

function syncActionSources(
  supabase: ReturnType<typeof createAdminClient>,
  actionId: string,
  urls: string[],
): Promise<{ error?: string }> {
  return syncUrlEntries(
    supabase,
    "action_sources",
    actionId,
    "link_url",
    urls,
    (url, preview) => ({
      action_id: actionId,
      source_type: OTHER_SOURCE_TYPE,
      link_url: url,
      url: preview.url,
      title: preview.title,
      description: preview.description,
      image: preview.image,
    }),
    { source_type: OTHER_SOURCE_TYPE },
  );
}

async function syncJunctionTable(
  supabase: ReturnType<typeof createAdminClient>,
  table: string,
  foreignKeyColumn: string,
  actionId: string,
  ids: string[],
): Promise<{ error?: string }> {
  const { error: deleteError } = await supabase.from(table).delete().eq("action_id", actionId);
  if (deleteError) return { error: deleteError.message };

  if (ids.length === 0) return {};

  const rows = ids.map((id) => ({ action_id: actionId, [foreignKeyColumn]: id }));
  const { error: insertError } = await supabase.from(table).insert(rows);
  return insertError ? { error: insertError.message } : {};
}

async function syncActionRelations(
  supabase: ReturnType<typeof createAdminClient>,
  actionId: string,
  input: ActionInput,
): Promise<{ error?: string }> {
  const areasResult = await syncJunctionTable(supabase, "action_areas", "area_id", actionId, input.area_ids);
  if (areasResult.error) return areasResult;

  const authorsResult = await syncJunctionTable(supabase, "action_authors", "author_id", actionId, input.author_ids);
  if (authorsResult.error) return authorsResult;

  const frequenciesResult = await syncJunctionTable(
    supabase,
    "action_frequencies",
    "frequency_id",
    actionId,
    input.frequency_ids,
  );
  if (frequenciesResult.error) return frequenciesResult;

  return {};
}

export async function createAction(input: ActionInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { area_ids, author_ids, frequency_ids, products_used, other_urls, ...actionFields } = input;

  const { data, error } = await supabase
    .from("actions")
    .insert(actionFields)
    .select("id")
    .single();

  if (error || !data) return { error: error?.message ?? "Failed to create action." };

  const productsResult = await syncActionProducts(supabase, data.id, products_used);
  if (productsResult.error) return productsResult;

  const sourcesResult = await syncActionSources(supabase, data.id, other_urls);
  if (sourcesResult.error) return sourcesResult;

  const relationsResult = await syncActionRelations(supabase, data.id, input);
  if (relationsResult.error) return relationsResult;

  return {};
}

export async function updateAction(id: string, input: ActionInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { area_ids, author_ids, frequency_ids, products_used, other_urls, ...actionFields } = input;

  const { error } = await supabase
    .from("actions")
    .update({ ...actionFields, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };

  const productsResult = await syncActionProducts(supabase, id, products_used);
  if (productsResult.error) return productsResult;

  const sourcesResult = await syncActionSources(supabase, id, other_urls);
  if (sourcesResult.error) return sourcesResult;

  const relationsResult = await syncActionRelations(supabase, id, input);
  if (relationsResult.error) return relationsResult;

  return {};
}

export async function deleteAction(id: string): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("actions").delete().eq("id", id);
  return error ? { error: error.message } : {};
}

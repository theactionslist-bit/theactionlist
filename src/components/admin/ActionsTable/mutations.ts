"use server";

import { revalidatePath } from "next/cache";
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
      `${LINK_PREVIEW_API_URL}?key=${apiKey}=${encodeURIComponent(url)}`,
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

async function syncActionSlug(
  supabase: ReturnType<typeof createAdminClient>,
  actionId: string,
  slug: string,
): Promise<{ error?: string }> {
  if (!slug) return {};

  const { data: current } = await supabase
    .from("action_slugs")
    .select("slug")
    .eq("action_id", actionId)
    .eq("is_current", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (current?.slug === slug) return {};

  const { error: updateError } = await supabase
    .from("action_slugs")
    .update({ is_current: false, updated_at: new Date().toISOString() })
    .eq("action_id", actionId)
    .eq("is_current", true);
  if (updateError) return { error: updateError.message };

  const { error: insertError } = await supabase
    .from("action_slugs")
    .insert({ action_id: actionId, slug, is_current: true });
  return insertError ? { error: insertError.message } : {};
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

  if (toAdd.length > 0) {
    const previews = await Promise.all(toAdd.map((url) => fetchLinkPreview(url)));
    const failedIndex = previews.findIndex((preview) => !preview);
    if (failedIndex !== -1) {
      return {
        error: `Could not fetch details for "${toAdd[failedIndex]}". Please check it and try again.`,
      };
    }

    const rows = toAdd.map((url, index) => buildRow(url, previews[index] as LinkPreviewResult));
    const { error } = await supabase.from(table).insert(rows);
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
  const results = await Promise.all([
    syncJunctionTable(supabase, "action_areas", "area_id", actionId, input.area_ids),
    syncJunctionTable(supabase, "action_authors", "author_id", actionId, input.author_ids),
    syncJunctionTable(supabase, "action_frequencies", "frequency_id", actionId, input.frequency_ids),
  ]);

  return results.find((result) => result.error) ?? {};
}

export async function createAction(input: ActionInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { area_ids, author_ids, frequency_ids, products_used, other_urls, slug, ...actionFields } = input;

  const { data, error } = await supabase
    .from("actions")
    .insert(actionFields)
    .select("id")
    .single();

  if (error || !data) return { error: error?.message ?? "Failed to create action." };

  const results = await Promise.all([
    syncActionSlug(supabase, data.id, slug),
    syncActionProducts(supabase, data.id, products_used),
    syncActionSources(supabase, data.id, other_urls),
    syncActionRelations(supabase, data.id, input),
  ]);
  const failed = results.find((result) => result.error);
  if (failed) return failed;

  revalidatePath(`/actionlist-detail/${slug}`);

  return {};
}

export async function updateAction(id: string, input: ActionInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { area_ids, author_ids, frequency_ids, products_used, other_urls, slug, ...actionFields } = input;

  const { error } = await supabase
    .from("actions")
    .update({ ...actionFields, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };

  const results = await Promise.all([
    syncActionSlug(supabase, id, slug),
    syncActionProducts(supabase, id, products_used),
    syncActionSources(supabase, id, other_urls),
    syncActionRelations(supabase, id, input),
  ]);
  const failed = results.find((result) => result.error);
  if (failed) return failed;

  revalidatePath(`/actionlist-detail/${slug}`);

  return {};
}

export async function deleteAction(id: string): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();

  const { data: slugRows } = await supabase
    .from("action_slugs")
    .select("slug")
    .eq("action_id", id)
    .eq("is_current", true);

  // action_slugs has no ON DELETE CASCADE (unlike the other child tables), so it
  // must be cleared explicitly or the delete below fails with a FK violation.
  const { error: slugsError } = await supabase.from("action_slugs").delete().eq("action_id", id);
  if (slugsError) return { error: slugsError.message };

  const { error } = await supabase.from("actions").delete().eq("id", id);
  if (error) return { error: error.message };

  for (const row of slugRows ?? []) {
    revalidatePath(`/actionlist-detail/${row.slug}`);
  }
  revalidatePath("/");

  return {};
}

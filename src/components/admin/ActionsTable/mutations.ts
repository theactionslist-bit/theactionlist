"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/admin/auth";
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

async function saveActionProduct(
  supabase: ReturnType<typeof createAdminClient>,
  actionId: string,
  preview: LinkPreviewResult,
): Promise<{ error?: string }> {
  const { error } = await supabase.from("action_products").upsert(
    {
      action_id: actionId,
      url: preview.url,
      title: preview.title,
      description: preview.description,
      image: preview.image,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "action_id" },
  );
  return error ? { error: error.message } : {};
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
  const productsUsed = input.products_used?.trim() || null;
  const { area_ids, author_ids, frequency_ids, ...actionFields } = input;

  let preview: LinkPreviewResult | null = null;
  if (productsUsed) {
    preview = await fetchLinkPreview(productsUsed);
    if (!preview) {
      return { error: "Could not fetch product details for that URL. Please check it and try again." };
    }
  }

  const { data, error } = await supabase
    .from("actions")
    .insert({ ...actionFields, products_used: preview?.url ?? productsUsed })
    .select("id")
    .single();

  if (error || !data) return { error: error?.message ?? "Failed to create action." };

  if (preview) {
    const productResult = await saveActionProduct(supabase, data.id, preview);
    if (productResult.error) return productResult;
  }

  const relationsResult = await syncActionRelations(supabase, data.id, input);
  if (relationsResult.error) return relationsResult;

  return {};
}

export async function updateAction(id: string, input: ActionInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const productsUsed = input.products_used?.trim() || null;
  const { area_ids, author_ids, frequency_ids, ...actionFields } = input;

  const { data: existing } = await supabase
    .from("actions")
    .select("products_used")
    .eq("id", id)
    .single();
  const urlChanged = (existing?.products_used ?? null) !== productsUsed;

  let preview: LinkPreviewResult | null = null;
  if (productsUsed && urlChanged) {
    preview = await fetchLinkPreview(productsUsed);
    if (!preview) {
      return { error: "Could not fetch product details for that URL. Please check it and try again." };
    }
  }

  const { error } = await supabase
    .from("actions")
    .update({
      ...actionFields,
      products_used: preview?.url ?? productsUsed,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) return { error: error.message };

  if (!productsUsed) {
    await supabase.from("action_products").delete().eq("action_id", id);
  } else if (preview) {
    const productResult = await saveActionProduct(supabase, id, preview);
    if (productResult.error) return productResult;
  }

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

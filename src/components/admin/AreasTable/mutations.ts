"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/admin/auth";
import type { AreaInput } from "./service";

export async function createArea(input: AreaInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("areas_of_inspiration").insert(input);
  return error ? { error: error.message } : {};
}

export async function updateArea(id: string, input: AreaInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("areas_of_inspiration")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  return error ? { error: error.message } : {};
}

export async function deleteArea(id: string): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("areas_of_inspiration").delete().eq("id", id);
  return error ? { error: error.message } : {};
}

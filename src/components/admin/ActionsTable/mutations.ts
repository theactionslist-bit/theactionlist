"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/admin/auth";
import type { ActionInput } from "./service";

export async function createAction(input: ActionInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("actions").insert(input);
  return error ? { error: error.message } : {};
}

export async function updateAction(id: string, input: ActionInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("actions")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  return error ? { error: error.message } : {};
}

export async function deleteAction(id: string): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("actions").delete().eq("id", id);
  return error ? { error: error.message } : {};
}

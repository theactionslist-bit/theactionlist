"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/admin/auth";
import type { FrequencyInput } from "./service";

export async function createFrequency(input: FrequencyInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("frequencies").insert(input);
  if (error) return { error: error.message };

  revalidatePath("/actionlist-detail", "layout");
  revalidatePath("/");
  return {};
}

export async function updateFrequency(id: string, input: FrequencyInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("frequencies")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/actionlist-detail", "layout");
  revalidatePath("/");
  return {};
}

export async function deleteFrequency(id: string): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("frequencies").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/actionlist-detail", "layout");
  revalidatePath("/");
  return {};
}

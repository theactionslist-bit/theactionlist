"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/admin/auth";
import type { AreaInput } from "./service";

export async function createArea(input: AreaInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("areas_of_inspiration").insert(input);
  if (error) return { error: error.message };

  revalidatePath("/actionlist-detail", "layout");
  revalidatePath("/");
  return {};
}

export async function updateArea(id: string, input: AreaInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("areas_of_inspiration")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/actionlist-detail", "layout");
  revalidatePath("/");
  return {};
}

export async function deleteArea(id: string): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("areas_of_inspiration").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/actionlist-detail", "layout");
  revalidatePath("/");
  return {};
}

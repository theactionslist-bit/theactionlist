"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/admin/auth";
import type { AuthorInput } from "./service";

export async function createAuthor(input: AuthorInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("authors").insert(input);
  if (error) return { error: error.message };

  revalidatePath("/actionlist-detail", "layout");
  revalidatePath("/");
  return {};
}

export async function updateAuthor(id: string, input: AuthorInput): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("authors")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/actionlist-detail", "layout");
  revalidatePath("/");
  return {};
}

export async function deleteAuthor(id: string): Promise<{ error?: string }> {
  const auth = await requireAdminUser();
  if ("error" in auth) return auth;

  const supabase = createAdminClient();
  const { error } = await supabase.from("authors").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/actionlist-detail", "layout");
  revalidatePath("/");
  return {};
}

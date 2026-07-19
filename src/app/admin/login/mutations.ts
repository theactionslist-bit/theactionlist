"use server";

import { requireAdminUser } from "@/lib/admin/auth";

export async function verifyAdminAccess(): Promise<{ error?: string }> {
  const result = await requireAdminUser();
  if ("error" in result) return { error: result.error };
  return {};
}

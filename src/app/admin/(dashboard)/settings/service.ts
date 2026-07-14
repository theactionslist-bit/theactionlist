import { createClient } from "@/lib/supabase/client";

export async function fetchAdminUser() {
  const supabase = createClient();
  return supabase.auth.getUser();
}

export async function changeAdminPassword(password: string) {
  const supabase = createClient();
  return supabase.auth.updateUser({ password });
}

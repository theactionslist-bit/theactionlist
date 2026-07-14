import { createClient } from "@/lib/supabase/client";

export async function signOutAdmin() {
  const supabase = createClient();
  return supabase.auth.signOut();
}

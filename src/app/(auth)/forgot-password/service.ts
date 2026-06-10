import { createClient } from "@/lib/supabase/client";

export async function sendPasswordResetEmail(email: string, redirectTo: string) {
  const supabase = createClient();
  return supabase.auth.resetPasswordForEmail(email, { redirectTo });
}

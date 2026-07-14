import { createClient } from "@/lib/supabase/client";
import { ADMIN_LOGIN_UNAUTHORIZED_MESSAGE } from "./constant";

export async function signInAsAdmin(
  email: string,
  password: string
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  const role = data.user?.app_metadata?.role;
  if (role !== "admin") {
    await supabase.auth.signOut();
    return { error: ADMIN_LOGIN_UNAUTHORIZED_MESSAGE };
  }

  return { error: null };
}

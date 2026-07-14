import { createClient } from "@/lib/supabase/client";
import { ADMIN_LOGIN_UNAUTHORIZED_MESSAGE } from "./constant";
import { verifyAdminAccess } from "./mutations";

export async function signInAsAdmin(
  email: string,
  password: string
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  const access = await verifyAdminAccess();
  if (access.error) {
    await supabase.auth.signOut();
    return { error: ADMIN_LOGIN_UNAUTHORIZED_MESSAGE };
  }

  return { error: null };
}

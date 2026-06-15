import { createClient } from "@/lib/supabase/client";

export async function fetchUser() {
  const supabase = createClient();
  return supabase.auth.getUser();
}

export async function updateProfile(name: string, email: string) {
  const supabase = createClient();
  return supabase.auth.updateUser({ email, data: { name } });
}

export async function changePassword(password: string) {
  const supabase = createClient();
  return supabase.auth.updateUser({ password });
}

export async function logoutUser() {
  const supabase = createClient();
  return supabase.auth.signOut();
}

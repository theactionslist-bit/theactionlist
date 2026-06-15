import { createClient } from "@/lib/supabase/client";

export async function createUserWithPassword(
  email: string,
  password: string,
  name: string
) {
  const supabase = createClient();
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
}

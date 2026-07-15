import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/admin/isAdminUser";
import type { User } from "@supabase/supabase-js";

export { isAdminUser } from "@/lib/admin/isAdminUser";

export async function requireAdminSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !(await isAdminUser(user.id))) {
    redirect("/admin/login");
  }

  return user;
}

export async function requireAdminUser(): Promise<{ error: string } | { user: User }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !(await isAdminUser(user.id))) {
    return { error: "Unauthorized." };
  }

  return { user };
}

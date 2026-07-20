import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_ROLE_NAME = "admin";

export async function isAdminUser(userId: string | undefined | null): Promise<boolean> {
  if (!userId) return false;

  const supabase = createAdminClient();
  const [{ data: role }, { data: userRoles }] = await Promise.all([
    supabase.from("roles").select("id").ilike("name", ADMIN_ROLE_NAME).maybeSingle(),
    supabase.from("user_roles").select("role_id").eq("user_id", userId),
  ]);

  if (!role || !userRoles) return false;
  return userRoles.some((row) => row.role_id === role.id);
}

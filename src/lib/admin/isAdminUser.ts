import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_ROLE_NAME = "admin";

export async function isAdminUser(userId: string | undefined | null): Promise<boolean> {
  if (!userId) return false;

  const supabase = createAdminClient();
  const { data: role } = await supabase
    .from("roles")
    .select("id")
    .ilike("name", ADMIN_ROLE_NAME)
    .maybeSingle();
  if (!role) return false;

  const { data } = await supabase
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role_id", role.id)
    .maybeSingle();

  return !!data;
}

import { createClient } from "@/lib/supabase/server";

export interface DashboardStats {
  actionsCount: number;
  areasCount: number;
  authorsCount: number;
  frequenciesCount: number;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const [actions, areas, authors, frequencies] = await Promise.all([
    supabase.from("actions").select("*", { count: "exact", head: true }),
    supabase.from("areas_of_inspiration").select("*", { count: "exact", head: true }),
    supabase.from("authors").select("*", { count: "exact", head: true }),
    supabase.from("frequencies").select("*", { count: "exact", head: true }),
  ]);

  return {
    actionsCount: actions.count ?? 0,
    areasCount: areas.count ?? 0,
    authorsCount: authors.count ?? 0,
    frequenciesCount: frequencies.count ?? 0,
  };
}

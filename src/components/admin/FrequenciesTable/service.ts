import { createClient } from "@/lib/supabase/client";
import { FREQUENCIES_TABLE_ITEMS_PER_PAGE } from "./constant";

export interface AdminFrequencyRow {
  id: string;
  name: string;
  period: string | null;
  attachments: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface FrequencyInput {
  name: string;
  period: string | null;
  attachments: string | null;
}

export interface PaginatedFrequencies {
  rows: AdminFrequencyRow[];
  totalCount: number;
}

export async function fetchPaginatedFrequencies(page: number, search: string): Promise<PaginatedFrequencies> {
  const supabase = createClient();
  const from = (page - 1) * FREQUENCIES_TABLE_ITEMS_PER_PAGE;
  const to = from + FREQUENCIES_TABLE_ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("frequencies")
    .select("id, name, period, attachments, created_at, updated_at", { count: "exact" });

  if (search.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data, count, error } = await query.order("name", { ascending: true }).range(from, to);

  if (error || !data) return { rows: [], totalCount: 0 };
  return { rows: data as AdminFrequencyRow[], totalCount: count ?? 0 };
}

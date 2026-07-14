import { createClient } from "@/lib/supabase/client";
import { AREAS_TABLE_ITEMS_PER_PAGE } from "./constant";

export interface AdminAreaRow {
  id: string;
  name: string;
  attachments: string | null;
  suggestion_actions: string | null;
  symmetric_column: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface AreaInput {
  name: string;
  attachments: string | null;
  suggestion_actions: string | null;
  symmetric_column: string | null;
}

export interface PaginatedAreas {
  rows: AdminAreaRow[];
  totalCount: number;
}

export async function fetchPaginatedAreas(page: number, search: string): Promise<PaginatedAreas> {
  const supabase = createClient();
  const from = (page - 1) * AREAS_TABLE_ITEMS_PER_PAGE;
  const to = from + AREAS_TABLE_ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("areas_of_inspiration")
    .select(
      "id, name, attachments, suggestion_actions, symmetric_column, created_at, updated_at",
      { count: "exact" },
    );

  if (search.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data, count, error } = await query.order("name", { ascending: true }).range(from, to);

  if (error || !data) return { rows: [], totalCount: 0 };
  return { rows: data as AdminAreaRow[], totalCount: count ?? 0 };
}

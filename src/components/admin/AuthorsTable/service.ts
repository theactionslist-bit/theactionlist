import { createClient } from "@/lib/supabase/client";
import { AUTHORS_TABLE_ITEMS_PER_PAGE } from "./constant";

export interface AdminAuthorRow {
  id: string;
  name: string;
  social_links: string[] | null;
  created_at: string;
  updated_at: string | null;
}

export interface AuthorInput {
  name: string;
  social_links: string[] | null;
}

export interface PaginatedAuthors {
  rows: AdminAuthorRow[];
  totalCount: number;
}

export async function fetchPaginatedAuthors(page: number, search: string): Promise<PaginatedAuthors> {
  const supabase = createClient();
  const from = (page - 1) * AUTHORS_TABLE_ITEMS_PER_PAGE;
  const to = from + AUTHORS_TABLE_ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("authors")
    .select("id, name, social_links, created_at, updated_at", { count: "exact" });

  if (search.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data, count, error } = await query.order("name", { ascending: true }).range(from, to);

  if (error || !data) return { rows: [], totalCount: 0 };
  return { rows: data as AdminAuthorRow[], totalCount: count ?? 0 };
}

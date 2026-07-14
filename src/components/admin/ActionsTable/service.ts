import { createClient } from "@/lib/supabase/client";
import { ACTIONS_TABLE_ITEMS_PER_PAGE } from "./constant";

export interface AdminActionRow {
  id: string;
  slug: string;
  serial_number: number | null;
  title: string;
  more_info: string | null;
  hex_colour_code: string | null;
  status: string | null;
  products_used: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface ActionInput {
  serial_number: number | null;
  title: string;
  more_info: string | null;
  hex_colour_code: string | null;
  status: string | null;
  products_used: string | null;
}

export interface PaginatedActions {
  rows: AdminActionRow[];
  totalCount: number;
}

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function fetchPaginatedActions(page: number, search: string): Promise<PaginatedActions> {
  const supabase = createClient();
  const from = (page - 1) * ACTIONS_TABLE_ITEMS_PER_PAGE;
  const to = from + ACTIONS_TABLE_ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("actions")
    .select(
      "id, serial_number, title, more_info, hex_colour_code, status, products_used, created_at, updated_at",
      { count: "exact" },
    );

  if (search.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  const { data, count, error } = await query.order("created_at", { ascending: false }).range(from, to);

  if (error || !data) return { rows: [], totalCount: 0 };

  const rows = data.map((row) => ({
    ...row,
    slug: slugify(row.title),
  })) as AdminActionRow[];

  return { rows, totalCount: count ?? 0 };
}

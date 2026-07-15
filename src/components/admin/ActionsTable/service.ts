import { createClient } from "@/lib/supabase/client";
import { ACTIONS_TABLE_ITEMS_PER_PAGE } from "./constant";

export interface LookupOption {
  id: string;
  name: string;
}

export interface AdminActionRow {
  id: string;
  slug: string;
  title: string;
  more_info: string | null;
  hex_colour_code: string | null;
  products_used: string | null;
  created_at: string;
  updated_at: string | null;
  areas: LookupOption[];
  authors: LookupOption[];
  frequencies: LookupOption[];
}

export interface ActionInput {
  title: string;
  more_info: string | null;
  hex_colour_code: string | null;
  products_used: string | null;
  area_ids: string[];
  author_ids: string[];
  frequency_ids: string[];
}

export interface PaginatedActions {
  rows: AdminActionRow[];
  totalCount: number;
}

export type ActionFormValues = {
  title: string;
  more_info: string;
  hex_colour_code: string;
  products_used: string;
  area_ids: string[];
  author_ids: string[];
  frequency_ids: string[];
};

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function toFormValues(row: AdminActionRow): ActionFormValues {
  return {
    title: row.title,
    more_info: row.more_info ?? "",
    hex_colour_code: row.hex_colour_code ?? "",
    products_used: row.products_used ?? "",
    area_ids: row.areas.map((area) => area.id),
    author_ids: row.authors.map((author) => author.id),
    frequency_ids: row.frequencies.map((frequency) => frequency.id),
  };
}

export function toActionInput(values: ActionFormValues): ActionInput {
  return {
    title: values.title.trim(),
    more_info: values.more_info.trim() || null,
    hex_colour_code: values.hex_colour_code.trim() || null,
    products_used: values.products_used.trim() || null,
    area_ids: values.area_ids,
    author_ids: values.author_ids,
    frequency_ids: values.frequency_ids,
  };
}

async function fetchLookupOptions(table: string): Promise<LookupOption[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from(table).select("id, name").order("name", { ascending: true });
  if (error || !data) return [];
  return data as LookupOption[];
}

export function fetchAreaOptions(): Promise<LookupOption[]> {
  return fetchLookupOptions("areas_of_inspiration");
}

export function fetchAuthorOptions(): Promise<LookupOption[]> {
  return fetchLookupOptions("authors");
}

export function fetchFrequencyOptions(): Promise<LookupOption[]> {
  return fetchLookupOptions("frequencies");
}

export async function fetchActionById(id: string): Promise<AdminActionRow | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("actions")
    .select(
      `
      id, title, more_info, hex_colour_code, products_used, created_at, updated_at,
      action_areas(area:areas_of_inspiration(id, name)),
      action_authors(author:authors(id, name)),
      action_frequencies(frequency:frequencies(id, name))
      `,
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;

  const r = data as any;
  return {
    ...r,
    slug: slugify(r.title),
    areas: (r.action_areas as any[])?.map((x) => x.area).filter(Boolean) ?? [],
    authors: (r.action_authors as any[])?.map((x) => x.author).filter(Boolean) ?? [],
    frequencies: (r.action_frequencies as any[])?.map((x) => x.frequency).filter(Boolean) ?? [],
  } as AdminActionRow;
}

export async function fetchPaginatedActions(page: number, search: string): Promise<PaginatedActions> {
  const supabase = createClient();
  const from = (page - 1) * ACTIONS_TABLE_ITEMS_PER_PAGE;
  const to = from + ACTIONS_TABLE_ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("actions")
    .select(
      `
      id, title, more_info, hex_colour_code, products_used, created_at, updated_at,
      action_areas(area:areas_of_inspiration(id, name)),
      action_authors(author:authors(id, name)),
      action_frequencies(frequency:frequencies(id, name))
      `,
      { count: "exact" },
    );

  if (search.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  const { data, count, error } = await query.order("created_at", { ascending: false }).range(from, to);

  if (error || !data) return { rows: [], totalCount: 0 };

  const rows = data.map((row) => {
    const r = row as any;
    return {
      ...r,
      slug: slugify(r.title),
      areas: (r.action_areas as any[])?.map((x) => x.area).filter(Boolean) ?? [],
      authors: (r.action_authors as any[])?.map((x) => x.author).filter(Boolean) ?? [],
      frequencies: (r.action_frequencies as any[])?.map((x) => x.frequency).filter(Boolean) ?? [],
    };
  }) as AdminActionRow[];

  return { rows, totalCount: count ?? 0 };
}

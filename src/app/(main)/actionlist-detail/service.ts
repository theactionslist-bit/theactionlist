import { createClient } from "@/lib/supabase/server";

export interface AreaRow {
  id: string;
  name: string;
}

export interface AuthorRow {
  id: string;
  name: string;
  social_links: string[];
}

export interface FrequencyRow {
  id: string;
  name: string;
}

export interface ActionSourceRow {
  source_type: string;
  link_url: string;
  title: string;
  description: string;
  image: string;
}

export interface ActionProductRow {
  url: string;
  title: string;
  description: string;
  image: string;
}

export interface ActionDetail {
  id: string;
  slug: string;
  serial_number: number | null;
  title: string;
  more_info: string;
  hex_colour_code: string;
  status: string | null;
  products_used: string | null;
  created_at: string;
  updated_at: string | null;
  is_selected: boolean;
  areas: AreaRow[];
  authors: AuthorRow[];
  frequencies: FrequencyRow[];
  sources: ActionSourceRow[];
  products: ActionProductRow[];
}

export async function fetchCardBySlug(slug: string): Promise<ActionDetail | null> {
  const supabase = await createClient();

  const { data: actionId, error: idError } = await supabase.rpc("get_action_id_from_slug", { p_slug: slug });
  if (idError || !actionId) return null;

  const { data, error } = await supabase
    .from("actions")
    .select(`
      id,
      serial_number,
      title,
      more_info,
      hex_colour_code,
      status,
      products_used,
      created_at,
      updated_at,
      action_authors(author:authors(id, name, social_links)),
      action_frequencies(frequency:frequencies(id, name)),
      action_areas(area:areas_of_inspiration(id, name)),
      action_sources(source_type, link_url, title, description, image),
      action_products(url, title, description, image)
    `)
    .eq("id", actionId as string)
    .single();

  if (error || !data) return null;

  const d = data as any;

  return {
    id: d.id,
    slug,
    serial_number: d.serial_number ?? null,
    title: d.title,
    more_info: d.more_info,
    hex_colour_code: d.hex_colour_code,
    status: d.status ?? null,
    products_used: d.products_used ?? null,
    created_at: d.created_at,
    updated_at: d.updated_at ?? null,
    is_selected: false,
    areas: (d.action_areas as any[])?.map((r) => r.area).filter(Boolean) ?? [],
    authors: (d.action_authors as any[])?.map((r) => r.author).filter(Boolean) ?? [],
    frequencies: (d.action_frequencies as any[])?.map((r) => r.frequency).filter(Boolean) ?? [],
    sources: (d.action_sources as ActionSourceRow[]) ?? [],
    products: (d.action_products as ActionProductRow[]) ?? [],
  };
}

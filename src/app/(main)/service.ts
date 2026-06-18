import { createClient } from "@/lib/supabase/client";
import { HOME_ITEMS_PER_PAGE } from "./constant";

interface AreaRow {
  id: string;
  name: string;
  attachments: string | null;
}

interface AuthorRow {
  id: string;
  name: string;
  social_links: string[];
}

interface FrequencyRow {
  id: string;
  name: string;
  period: string | null;
}

export interface CardRow {
  id: string;
  slug: string;
  title: string;
  more_info: string;
  created_at: string;
  hex_colour_code: string;
  is_selected: boolean;
  current_page: number;
  total_count: number;
  has_next: boolean;
  has_prev: boolean;
  areas: AreaRow[];
  authors: AuthorRow[];
  frequencies: FrequencyRow[];
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FiltersData {
  areas: FilterOption[];
  authors: FilterOption[];
  frequencies: FilterOption[];
}

export async function fetchFilters(
  selectedAreaIds?: string[],
  selectedAuthorIds?: string[],
  selectedFrequencyIds?: string[],
): Promise<FiltersData> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_filters", {
    selected_area_ids: selectedAreaIds?.length ? selectedAreaIds : null,
    selected_author_ids: selectedAuthorIds?.length ? selectedAuthorIds : null,
    selected_frequency_ids: selectedFrequencyIds?.length ? selectedFrequencyIds : null,
  });
  if (error || !data) return { areas: [], authors: [], frequencies: [] };

  const row = Array.isArray(data) ? data[0] : data;
  const toOptions = (arr: { id: string; name: string }[] = []) =>
    arr.map((item) => ({ value: item.id, label: item.name }));

  return {
    areas: toOptions(row?.areas ?? []),
    authors: toOptions(row?.authors ?? []),
    frequencies: toOptions(row?.frequencies ?? []),
  };
}

export async function fetchCards(
  page: number = 1,
  selectedAreaIds?: string[],
  selectedAuthorIds?: string[],
  selectedFrequencyIds?: string[],
) {
  const supabase = createClient();
  return supabase.rpc("get_cards_data", {
    page_size: HOME_ITEMS_PER_PAGE,
    page_number: page,
    selected_area_ids: selectedAreaIds?.length ? selectedAreaIds : null,
    selected_author_ids: selectedAuthorIds?.length ? selectedAuthorIds : null,
    selected_frequency_ids: selectedFrequencyIds?.length ? selectedFrequencyIds : null,
  });
}

export async function fetchAllCards(
  selectedAreaIds?: string[],
  selectedAuthorIds?: string[],
  selectedFrequencyIds?: string[],
) {
  const supabase = createClient();
  const filters = {
    selected_area_ids: selectedAreaIds?.length ? selectedAreaIds : null,
    selected_author_ids: selectedAuthorIds?.length ? selectedAuthorIds : null,
    selected_frequency_ids: selectedFrequencyIds?.length ? selectedFrequencyIds : null,
  };

  const countRes = await supabase.rpc("get_cards_data", {
    page_size: 1,
    page_number: 1,
    ...filters,
  });
  if (countRes.error || !countRes.data?.length) {
    return { data: null, error: countRes.error };
  }
  const totalCount: number = (countRes.data[0] as CardRow).total_count;
  if (totalCount === 0) return { data: null, error: null };

  return supabase.rpc("get_cards_data", {
    page_size: HOME_ITEMS_PER_PAGE,
    page_number: 1,
    ...filters,
  });
}

import { createClient } from "@/lib/supabase/client";
import { MY_ACTIONS_ITEMS_PER_PAGE } from "./constant";
import type { CardRow, FiltersData } from "@/app/(main)/service";

export async function fetchFavoriteActions(
  page: number = 1,
  selectedAreaIds?: string[],
  selectedAuthorIds?: string[],
  selectedFrequencyIds?: string[],
): Promise<CardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_favorite_actions", {
    p_page: page,
    p_limit: MY_ACTIONS_ITEMS_PER_PAGE,
    p_selected_area_ids: selectedAreaIds?.length ? selectedAreaIds : null,
    p_selected_author_ids: selectedAuthorIds?.length ? selectedAuthorIds : null,
    p_selected_frequency_ids: selectedFrequencyIds?.length ? selectedFrequencyIds : null,
  });
  if (error || !data) return [];
  return data as CardRow[];
}

export async function fetchFavoriteFilters(
  selectedAreaIds?: string[],
  selectedAuthorIds?: string[],
  selectedFrequencyIds?: string[],
): Promise<FiltersData> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_favorite_actions", {
    p_page: 1,
    p_limit: 1000,
    p_selected_area_ids: selectedAreaIds?.length ? selectedAreaIds : null,
    p_selected_author_ids: selectedAuthorIds?.length ? selectedAuthorIds : null,
    p_selected_frequency_ids: selectedFrequencyIds?.length ? selectedFrequencyIds : null,
  });
  if (error || !data) return { areas: [], authors: [], frequencies: [] };

  const cards = data as CardRow[];
  const uniqueAreas = new Map<string, string>();
  const uniqueAuthors = new Map<string, string>();
  const uniqueFrequencies = new Map<string, string>();

  cards.forEach((card) => {
    card.areas.forEach((a) => uniqueAreas.set(a.id, a.name));
    card.authors.forEach((a) => uniqueAuthors.set(a.id, a.name));
    card.frequencies.forEach((f) => uniqueFrequencies.set(f.id, f.name));
  });

  return {
    areas: Array.from(uniqueAreas.entries()).map(([id, name]) => ({ value: id, label: name })),
    authors: Array.from(uniqueAuthors.entries()).map(([id, name]) => ({ value: id, label: name })),
    frequencies: Array.from(uniqueFrequencies.entries()).map(([id, name]) => ({ value: id, label: name })),
  };
}

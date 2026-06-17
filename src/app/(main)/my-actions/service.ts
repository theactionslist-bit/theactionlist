import { createClient } from "@/lib/supabase/client";
import { MY_ACTIONS_ITEMS_PER_PAGE } from "./constant";
import type { CardRow } from "@/app/(main)/service";

export async function fetchFavoriteActions(
  page: number = 1,
): Promise<CardRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_favorite_actions", {
    p_page: page,
    p_limit: MY_ACTIONS_ITEMS_PER_PAGE,
  });
  if (error || !data) return [];
  return data as CardRow[];
}

export async function fetchAllFavoriteActions(): Promise<CardRow[]> {
  const supabase = createClient();
  const { data: countData, error: countError } = await supabase.rpc("get_favorite_actions", {
    p_page: 1,
    p_limit: 1,
  });
  if (countError || !countData?.length) return [];
  const total: number = (countData[0] as CardRow).total_count;
  if (total === 0) return [];
  const { data, error } = await supabase.rpc("get_favorite_actions", {
    p_page: 1,
    p_limit: total,
  });
  if (error || !data) return [];
  return data as CardRow[];
}

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

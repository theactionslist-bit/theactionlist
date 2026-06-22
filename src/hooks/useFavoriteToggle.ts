import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useFavoriteToggle({
  actionId,
  initialLiked,
  onUnfavorite,
}: {
  actionId?: string;
  initialLiked?: boolean;
  onUnfavorite?: () => void;
}) {
  const [liked, setLiked] = useState(initialLiked ?? false);
  const [toggling, setToggling] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleHeartClick() {
    if (!actionId) {
      setLiked((v) => !v);
      return;
    }
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setModalOpen(true);
      return;
    }
    const wasLiked = liked;
    setLiked(!wasLiked);
    setToggling(true);
    await supabase.rpc("toggle_favorite_action", {
      p_action_id: actionId,
    });
    setToggling(false);
    if (wasLiked) onUnfavorite?.();
  }

  return { liked, setLiked, toggling, modalOpen, setModalOpen, handleHeartClick };
}

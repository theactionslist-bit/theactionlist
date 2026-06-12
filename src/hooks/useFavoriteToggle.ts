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
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setModalOpen(true);
      return;
    }
    if (!actionId) {
      setLiked((v) => !v);
      return;
    }
    setToggling(true);
    const { error } = await supabase.rpc("toggle_favorite_action", {
      p_action_id: actionId,
    });
    setToggling(false);
    if (!error) {
      setLiked((v) => !v);
      if (liked) onUnfavorite?.();
    }
  }

  return { liked, setLiked, toggling, modalOpen, setModalOpen, handleHeartClick };
}

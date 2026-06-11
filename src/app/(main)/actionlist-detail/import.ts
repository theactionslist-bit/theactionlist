import "swiper/css";

export { useState, useEffect, useRouter, useParams, Link, Image } from "@/common/imports";
export { createClient } from "@/lib/supabase/client";
export type { CardRow } from "@/app/(main)/service";
export type { ActionDetail, ActionSourceRow, ActionProductRow, AreaRow, AuthorRow, FrequencyRow } from "./service";
export { ActionListCard } from "@/common/components";
export { Swiper, SwiperSlide } from "swiper/react";
export { Navigation } from "swiper/modules";
export type { Swiper as SwiperType } from "swiper";
export { default as HeartIcon } from "@/assets/ActionDetailCard/heartIcon.svg";
export { default as ShareIcon } from "@/assets/ActionDetailCard/ShareNetwork.svg";
export { default as TimeIcon } from "@/assets/ActionDetailCard/TimeIcon.svg";
export { default as InstagramIcon } from "@/assets/footer/instagram.svg";
export { default as FacebookIcon } from "@/assets/footer/facebook.svg";
export { default as XIcon } from "@/assets/footer/XLogo.svg";
export { default as RelationActionVector } from "@/assets/RelationActionVector.svg";
export {
  DETAIL_BACK_BUTTON_TEXT,
  DETAIL_SECTION_DETAILS,
  DETAIL_SECTION_SOURCES,
  DETAIL_SECTION_HELPS,
  DETAIL_SECTION_BEST_TIME,
  DETAIL_SECTION_SUGGESTED,
  DETAIL_HEART_ARIA,
  DETAIL_SHARE_ARIA,
  RELATED_ACTIONS_HEADING,
} from "./constant";

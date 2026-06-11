import AboutYouIcon from "@/assets/Header/Aboutyou.svg";
import MyActionsIcon from "@/assets/Header/Myactions.svg";
import NewsletterIcon from "@/assets/Header/Newsletter.svg";
import SuggestActionIcon from "@/assets/Header/SuggestAction.svg";

export { useState, useEffect, useRouter, usePathname, Link } from "@/common/imports";
export { Button } from "@/common/components";
export { default as Logo } from "@/assets/Logo.svg";
export { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
export { createClient } from "@/lib/supabase/client";
export { Modal } from "@/components/Modal/page";
export {
  LOGO_ARIA_LABEL,
  MENU_OPEN_ARIA_LABEL,
  MENU_CLOSE_ARIA_LABEL,
  LOGIN_BUTTON_TEXT,
  PROFILE_BUTTON_TEXT,
  MY_PROFILE_HREF,
  LOGIN_HREF,
  MY_ACTIONS_HREF,
  MY_ACTIONS_MODAL_TITLE,
  MY_ACTIONS_MODAL_DESCRIPTION,
} from "./constant";

export const NAV_ITEMS = [
  { label: "About You", Icon: AboutYouIcon, href: "/about-us" },
  { label: "My Actions", Icon: MyActionsIcon, href: "/my-actions" },
  { label: "Subscribe to Newsletter", Icon: NewsletterIcon, href: "#newsletter" },
  { label: "Suggest an Action", Icon: SuggestActionIcon, href: "/submit-an-action" },
];

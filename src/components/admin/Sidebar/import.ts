import {
  IoGridOutline,
  IoListOutline,
  IoCompassOutline,
  IoPeopleOutline,
  IoRepeatOutline,
  IoSettingsOutline,
} from "react-icons/io5";

export { useState, useRef, useEffect, usePathname, useRouter, Link } from "@/common/imports";
export { IoMenuOutline, IoCloseOutline, IoLogOutOutline } from "react-icons/io5";
export {
  SIDEBAR_MENU_OPEN_ARIA_LABEL,
  SIDEBAR_MENU_CLOSE_ARIA_LABEL,
  LOGOUT_BUTTON_TEXT,
} from "./constant";
export { handleAdminLogout } from "./action";

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", Icon: IoGridOutline },
  { label: "Actions", href: "/admin/actions", Icon: IoListOutline },
  { label: "Areas of Inspiration", href: "/admin/areas", Icon: IoCompassOutline },
  { label: "Authors", href: "/admin/authors", Icon: IoPeopleOutline },
  { label: "Frequencies", href: "/admin/frequencies", Icon: IoRepeatOutline },
  { label: "Settings", href: "/admin/settings", Icon: IoSettingsOutline },
];

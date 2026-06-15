"use client";

import { usePathname } from "next/navigation";
import NewsletterSection from "./page";

export default function ConditionalNewsletter() {
  const pathname = usePathname();
  if (pathname === "/my-profile") return null;
  return <NewsletterSection />;
}

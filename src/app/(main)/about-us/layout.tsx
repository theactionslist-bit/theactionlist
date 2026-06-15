import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ABOUT_US_SEO_TITLE, ABOUT_US_SEO_DESCRIPTION } from "./constant";

export const metadata: Metadata = buildMetadata({
  title: ABOUT_US_SEO_TITLE,
  description: ABOUT_US_SEO_DESCRIPTION,
});

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

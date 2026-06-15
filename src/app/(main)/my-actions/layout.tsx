import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { MY_ACTIONS_SEO_TITLE, MY_ACTIONS_SEO_DESCRIPTION } from "./constant";

export const metadata: Metadata = buildMetadata({
  title: MY_ACTIONS_SEO_TITLE,
  description: MY_ACTIONS_SEO_DESCRIPTION,
});

export default function MyActionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

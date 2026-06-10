import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { MY_PROFILE_SEO_TITLE, MY_PROFILE_SEO_DESCRIPTION } from "./constant";

export const metadata: Metadata = buildMetadata({
  title: MY_PROFILE_SEO_TITLE,
  description: MY_PROFILE_SEO_DESCRIPTION,
});

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

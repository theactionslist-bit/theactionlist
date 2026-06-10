import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  SUBMIT_AN_ACTION_SEO_TITLE,
  SUBMIT_AN_ACTION_SEO_DESCRIPTION,
} from "./constant";

export const metadata: Metadata = buildMetadata({
  title: SUBMIT_AN_ACTION_SEO_TITLE,
  description: SUBMIT_AN_ACTION_SEO_DESCRIPTION,
});

export default function SubmitAnActionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

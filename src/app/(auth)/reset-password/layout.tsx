import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  RESET_PASSWORD_SEO_TITLE,
  RESET_PASSWORD_SEO_DESCRIPTION,
} from "./constant";

export const metadata: Metadata = buildMetadata({
  title: RESET_PASSWORD_SEO_TITLE,
  description: RESET_PASSWORD_SEO_DESCRIPTION,
});

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  FORGOT_PASSWORD_SEO_TITLE,
  FORGOT_PASSWORD_SEO_DESCRIPTION,
} from "./constant";

export const metadata: Metadata = buildMetadata({
  title: FORGOT_PASSWORD_SEO_TITLE,
  description: FORGOT_PASSWORD_SEO_DESCRIPTION,
});

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

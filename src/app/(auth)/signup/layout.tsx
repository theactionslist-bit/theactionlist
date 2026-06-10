import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SIGNUP_SEO_TITLE, SIGNUP_SEO_DESCRIPTION } from "./constant";

export const metadata: Metadata = buildMetadata({
  title: SIGNUP_SEO_TITLE,
  description: SIGNUP_SEO_DESCRIPTION,
});

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

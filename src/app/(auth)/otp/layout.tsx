import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { OTP_SEO_TITLE, OTP_SEO_DESCRIPTION } from "./constant";

export const metadata: Metadata = buildMetadata({
  title: OTP_SEO_TITLE,
  description: OTP_SEO_DESCRIPTION,
});

export default function OtpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

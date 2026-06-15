import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LOGIN_SEO_TITLE, LOGIN_SEO_DESCRIPTION } from "./constant";

export const metadata: Metadata = buildMetadata({
  title: LOGIN_SEO_TITLE,
  description: LOGIN_SEO_DESCRIPTION,
});

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return children;
}

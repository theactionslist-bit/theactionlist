import type { Metadata } from "next";

const SITE_NAME = "The Action List";
const DEFAULT_OG_IMAGE = "/og-default.jpg";

export interface PageSeoInput {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

export function buildMetadata({
  title,
  description,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
}: PageSeoInput): Metadata {
  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: ogType,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
  if (canonicalUrl) metadata.alternates = { canonical: canonicalUrl };
  return metadata;
}

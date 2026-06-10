import { notFound } from "next/navigation";
import {
  buildMetadata,
  ACTIONLIST_DETAIL_MOCK_SEO,
  ACTIONLIST_DETAIL_SEO_FALLBACK_DESCRIPTION,
  ActionlistDetailContent,
} from "./import";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = ACTIONLIST_DETAIL_MOCK_SEO[slug];
  return buildMetadata({
    title: data?.title ?? "Action Detail",
    description:
      data?.description ?? ACTIONLIST_DETAIL_SEO_FALLBACK_DESCRIPTION,
    canonicalUrl: `https://theactionlist.com/actionlist-detail/${slug}`,
    ogType: "article",
  });
}

export default async function ActionlistDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!ACTIONLIST_DETAIL_MOCK_SEO[slug]) notFound();
  return <ActionlistDetailContent />;
}

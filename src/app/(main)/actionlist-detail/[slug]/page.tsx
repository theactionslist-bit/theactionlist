import { notFound } from "next/navigation";
import {
  buildMetadata,
  ACTIONLIST_DETAIL_SEO_FALLBACK_DESCRIPTION,
  ActionlistDetailContent,
  fetchPageDataCached,
} from "./import";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchPageDataCached(slug);
  return buildMetadata({
    title: data?.card.title ?? "Action Detail",
    description: ACTIONLIST_DETAIL_SEO_FALLBACK_DESCRIPTION,
    canonicalUrl: `https://theactionslist.com/actionlist-detail/${slug}`,
    ogType: "article",
  });
}

export default async function ActionlistDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchPageDataCached(slug);
  if (!data) notFound();
  return <ActionlistDetailContent card={data.card} relatedCards={data.relatedCards} />;
}

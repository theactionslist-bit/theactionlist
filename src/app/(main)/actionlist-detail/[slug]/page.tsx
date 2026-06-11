import {
  buildMetadata,
  ACTIONLIST_DETAIL_SEO_FALLBACK_DESCRIPTION,
  ActionlistDetailContent,
  fetchCardBySlug,
} from "./import";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const card = await fetchCardBySlug(slug);
  return buildMetadata({
    title: card?.title ?? "Action Detail",
    description: ACTIONLIST_DETAIL_SEO_FALLBACK_DESCRIPTION,
    canonicalUrl: `https://theactionlist.com/actionlist-detail/${slug}`,
    ogType: "article",
  });
}

export default async function ActionlistDetailPage() {
  return <ActionlistDetailContent />;
}

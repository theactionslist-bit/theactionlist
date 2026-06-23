import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://theactionlist.com";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface SitemapEntryRow {
  url: string;
  change_frequency: ChangeFrequency;
  priority: number;
  updated_at: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/actionlist-detail`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  let clientManagedRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = await createClient();

    // Fetch all action slugs
    const { data: firstPage, error } = await supabase.rpc("get_cards_data", {
      page_size: 100,
      page_number: 1,
    });
    if (!error && firstPage?.length) {
      const totalCount: number = firstPage[0].total_count;
      const totalPages = Math.ceil(totalCount / 100);

      const remaining =
        totalPages > 1
          ? await Promise.all(
              Array.from({ length: totalPages - 1 }, (_, i) =>
                supabase.rpc("get_cards_data", {
                  page_size: 100,
                  page_number: i + 2,
                }),
              ),
            )
          : [];

      const allCards = [
        ...firstPage,
        ...remaining.flatMap((r) => r.data ?? []),
      ] as { slug: string; created_at: string }[];

      dynamicRoutes = allCards
        .filter((c) => c.slug)
        .map((card) => ({
          url: `${BASE_URL}/actionlist-detail/${card.slug}`,
          lastModified: card.created_at ? new Date(card.created_at) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }));
    }

    // Fetch client-managed sitemap entries from Supabase
    const { data: extraEntries } = await supabase
      .from("sitemap_entries")
      .select("url, change_frequency, priority, updated_at")
      .eq("is_active", true)
      .order("priority", { ascending: false });

    if (extraEntries) {
      clientManagedRoutes = (extraEntries as SitemapEntryRow[]).map((entry) => ({
        url: entry.url,
        lastModified: entry.updated_at ? new Date(entry.updated_at) : new Date(),
        changeFrequency: entry.change_frequency,
        priority: entry.priority,
      }));
    }
  } catch {
    // Return static routes only if DB is unreachable at build time
  }

  return [...staticRoutes, ...dynamicRoutes, ...clientManagedRoutes];
}

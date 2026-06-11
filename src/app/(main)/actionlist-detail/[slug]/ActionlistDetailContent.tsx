"use client";

import {
  useState,
  useRouter,
  useParams,
  useEffect,
  Link,
  Image,
  createClient,
  HeartIcon,
  ShareIcon,
  TimeIcon,
  InstagramIcon,
  XIcon,
  FacebookIcon,
  Swiper,
  SwiperType,
  SwiperSlide,
  Navigation,
  RelationActionVector,
  ActionListCard,
  DETAIL_BACK_BUTTON_TEXT,
  DETAIL_SECTION_DETAILS,
  DETAIL_SECTION_SOURCES,
  DETAIL_SECTION_HELPS,
  DETAIL_SECTION_BEST_TIME,
  DETAIL_SECTION_SUGGESTED,
  DETAIL_HEART_ARIA,
  DETAIL_SHARE_ARIA,
  RELATED_ACTIONS_HEADING,
} from "../import";
import type { CardRow, AreaRow, AuthorRow, FrequencyRow, ActionDetail, ActionSourceRow, ActionProductRow } from "../import";

const BACK_BUTTON_CLASS =
  "inline-flex items-center px-4 py-2 border-2 border-[#999999] rounded-full font-sans text-lg font-medium text-[#999999] hover:bg-gray-50 transition-colors";

const LABEL_CLASS = "font-display text-3xl text-black whitespace-nowrap";

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getSocialIcon(url: string) {
  if (url.includes("instagram.com")) return <InstagramIcon />;
  if (url.includes("twitter.com") || url.includes("x.com")) return <XIcon className="[&_path]:fill-[#10101099]" />;
  if (url.includes("facebook.com")) return <FacebookIcon />;
  return null;
}

export default function ActionlistDetailContent() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  const router = useRouter();
  const [card, setCard] = useState<ActionDetail | null>(null);
  const [relatedCards, setRelatedCards] = useState<CardRow[]>([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    setFetchError(false);

    (async () => {
      const supabase = createClient();

      const { data: actionId, error: idErr } = await supabase.rpc("get_action_id_from_slug", { p_slug: slug });
      if (idErr) { setFetchError(true); setLoading(false); return; }
      if (!actionId) { setNotFound(true); setLoading(false); return; }

      const aid = actionId as string;

      const { data, error: detailErr } = await supabase
        .from("actions")
        .select(`
          id,
          serial_number,
          title,
          more_info,
          hex_colour_code,
          status,
          products_used,
          created_at,
          updated_at,
          action_authors(author:authors(id, name, social_links)),
          action_frequencies(frequency:frequencies(id, name)),
          action_areas(area:areas_of_inspiration(id, name)),
          action_sources(source_type, link_url, title, description, image),
          action_products(url, title, description, image)
        `)
        .eq("id", aid)
        .single();

      if (detailErr || !data) { setFetchError(true); setLoading(false); return; }

      const d = data as any;
      const areas: AreaRow[] = (d.action_areas as any[])?.map((r: any) => r.area).filter(Boolean) ?? [];
      const authors: AuthorRow[] = (d.action_authors as any[])?.map((r: any) => r.author).filter(Boolean) ?? [];
      const frequencies: FrequencyRow[] = (d.action_frequencies as any[])?.map((r: any) => r.frequency).filter(Boolean) ?? [];
      const sources: ActionSourceRow[] = (d.action_sources as ActionSourceRow[]) ?? [];
      const products: ActionProductRow[] = (d.action_products as ActionProductRow[]) ?? [];

      setCard({
        id: d.id, slug,
        serial_number: d.serial_number ?? null,
        title: d.title, more_info: d.more_info,
        hex_colour_code: d.hex_colour_code,
        status: d.status ?? null,
        products_used: d.products_used ?? null,
        created_at: d.created_at,
        updated_at: d.updated_at ?? null,
        is_selected: false, areas, authors, frequencies, sources, products,
      });

      const { data: relData } = await supabase.rpc("get_related_actions", {
        area_ids: areas.map((a) => a.id),
        author_ids: authors.map((a) => a.id),
        exclude_id: aid,
        limit_count: 10,
      });

      if (relData) {
        setRelatedCards((relData as any[]).map((r) => ({
          id: r.action.id,
          slug: r.action.slug ?? (r.action.title ? slugify(r.action.title) : ""),
          title: r.action.title,
          hex_colour_code: r.action.hex_colour_code,
          more_info: r.action.more_info ?? "",
          created_at: r.action.created_at ?? "",
          is_selected: false,
          current_page: 0, total_count: 0, has_next: false, has_prev: false,
          areas: r.areas_of_inspiration ?? [],
          authors: r.authors ?? [],
          frequencies: r.frequencies ?? [],
        }) as CardRow));
      }

      setLoading(false);
    })();
  }, [slug]);

  useEffect(() => {
    if (card) setLiked(card.is_selected);
  }, [card]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <svg className="animate-spin w-10 h-10 text-[#D89593]" viewBox="0 0 24 24" fill="none" aria-label="Loading">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <p className="font-sans text-xl text-[#101010]">Something went wrong. Please try again.</p>
        <Link href="/" className={BACK_BUTTON_CLASS}>{DETAIL_BACK_BUTTON_TEXT}</Link>
      </div>
    );
  }

  if (notFound || !card) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <p className="font-sans text-xl text-[#101010]">Action not found.</p>
        <Link href="/" className={BACK_BUTTON_CLASS}>{DETAIL_BACK_BUTTON_TEXT}</Link>
      </div>
    );
  }

  const author = card.authors[0];
  const socialLinks = author?.social_links ?? [];

  return (
    <div className="px-4 py-6 md:px-8 lg:px-15">
      {/* Top navigation */}
      <div className="flex items-center justify-between mb-10">
        <Link href="/" className={BACK_BUTTON_CLASS}>
          {DETAIL_BACK_BUTTON_TEXT}
        </Link>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={DETAIL_HEART_ARIA}
            onClick={() => setLiked((v) => !v)}
            className="hover:opacity-70 transition-opacity"
          >
            <HeartIcon
              className={`transition-colors ${
                liked ? "fill-[#D89593] stroke-[#D89593]" : "fill-none stroke-black"
              }`}
            />
          </button>
          <button
            type="button"
            aria-label={DETAIL_SHARE_ARIA}
            className="hover:opacity-70 transition-opacity"
          >
            <ShareIcon className="stroke-black" />
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="flex items-start gap-6 mb-16">
        <div
          className="w-16 h-16 rounded-full shrink-0 mt-1"
          style={{ backgroundColor: card.hex_colour_code }}
        />
        <h1 className="font-display text-4xl lg:text-5xl leading-tight text-black">
          {card.title}
        </h1>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[max-content_1fr] lg:items-start lg:gap-x-16 lg:gap-y-16">
        {/* Details */}
        <section className="contents">
          <h3 className={LABEL_CLASS}>{DETAIL_SECTION_DETAILS}</h3>
          <div className="flex flex-col gap-6">
            <p className="font-sans text-xl font-medium text-black leading-relaxed">
              {card.more_info}
            </p>
          </div>
        </section>

        {/* Sources */}
        {card.sources.length > 0 && (
          <section className="contents">
            <h3 className={LABEL_CLASS}>{DETAIL_SECTION_SOURCES}</h3>
            <div className="flex flex-wrap gap-4">
              {card.sources.map((source, i) => (
                <a
                  key={i}
                  href={source.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-83.5 border border-[#DBDBDB] rounded-xl overflow-hidden flex flex-col hover:opacity-80 transition-opacity"
                >
                  {source.image && (
                    <div className="relative w-full h-48 shrink-0">
                      <Image src={source.image} alt={source.title} fill className="object-cover p-4" />
                    </div>
                  )}
                  <div className="p-4 flex flex-col gap-2">
                    <p className="font-sans font-semibold text-xl text-black">{source.title}</p>
                    <p className="font-sans text-base text-[#363636] leading-7">{source.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Can help with */}
        {card.areas.length > 0 && (
          <section className="contents">
            <h3 className={LABEL_CLASS}>{DETAIL_SECTION_HELPS}</h3>
            <div className="flex flex-wrap gap-3">
              {card.areas.map((area) => (
                <span
                  key={area.id}
                  className="border-[#DBDBDB] border-2 rounded-xl px-5 py-2.5 font-sans text-xl text-[#101010]"
                >
                  {area.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Best time to try */}
        {card.frequencies.length > 0 && (
          <section className="contents">
            <h3 className={LABEL_CLASS}>{DETAIL_SECTION_BEST_TIME}</h3>
            <div className="flex flex-wrap gap-6">
              {card.frequencies.map((freq) => (
                <div
                  key={freq.id}
                  className="flex items-center gap-2 border border-[#DBDBDB] px-4 py-2.5 rounded-lg"
                >
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <TimeIcon />
                  </div>
                  <span className="font-sans text-xl font-semibold text-black">{freq.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Suggested by */}
        {author && (
          <section className="contents">
            <h3 className={LABEL_CLASS}>{DETAIL_SECTION_SUGGESTED}</h3>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="inline-flex items-center gap-2 bg-[#EFEFEF] rounded-md px-4 py-2">
                <div className="w-7.5 h-7.5 rounded-full bg-[#8B9BA8] shrink-0" />
                <span className="font-sans text-base font-semibold text-[#4B5563]">
                  {author.name}
                </span>
              </div>
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-5">
                  {socialLinks.map((url: string) => {
                    const icon = getSocialIcon(url);
                    if (!icon) return null;
                    return (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-70 transition-opacity"
                      >
                        {icon}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="mt-16">
        <Link href="/" className={BACK_BUTTON_CLASS}>
          {DETAIL_BACK_BUTTON_TEXT}
        </Link>
      </div>

      {/* Related Actions */}
      <div className="mt-20">
        <h2 className="font-display text-4xl lg:text-5xl text-[#101010] text-center mb-10">
          {RELATED_ACTIONS_HEADING}
        </h2>
        <div className="relative lg:px-14">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => swiperInstance?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#DBDBDB] bg-white hover:bg-gray-50 transition-colors"
          >
            <RelationActionVector className="rotate-180" />
          </button>

          <div className="overflow-hidden">
            <Swiper
              className="related-actions-swiper"
              modules={[Navigation]}
              onSwiper={setSwiperInstance}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
              }}
            >
              {relatedCards.map((item, i) => (
                <SwiperSlide key={i}>
                  <ActionListCard
                    avatarColor={item.hex_colour_code}
                    text={item.title}
                    authorName={item.authors[0]?.name}
                    frequency={item.frequencies[0]?.name}
                    frequencyCount={item.frequencies.length}
                    category={item.areas[0]?.name}
                    categories={item.areas.map((a) => a.name)}
                    actionId={item.id}
                    onNext={() => router.push(`/actionlist-detail/${item.slug}`)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            type="button"
            aria-label="Next"
            onClick={() => swiperInstance?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#DBDBDB] bg-white hover:bg-gray-50 transition-colors"
          >
            <RelationActionVector />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  useState,
  useRouter,
  useEffect,
  createClient,
  Link,
  Image,
  HeartIcon,
  HeartPinkIcon,
  ShareIcon,
  TimeIcon,
  InstagramIcon,
  XIcon,
  FacebookIcon,
  Swiper,
  SwiperType,
  SwiperSlide,
  Navigation,
  Pagination,
  RelationActionVector,
  IoGlobeOutline,
  ActionListCard,
  Modal,
  useFavoriteToggle,
  useToast,
  DETAIL_AUTH_MODAL_TITLE,
  DETAIL_AUTH_MODAL_DESCRIPTION,
  DETAIL_SHARE_TOAST_SUCCESS,
  DETAIL_SHARE_TOAST_ERROR,
  DETAIL_BACK_BUTTON_TEXT,
  DETAIL_SECTION_DETAILS,
  DETAIL_SECTION_SOURCES,
  DETAIL_SECTION_HELPS,
  DETAIL_SECTION_BEST_TIME,
  DETAIL_SECTION_SUGGESTED,
  DETAIL_SECTION_PRODUCTS,
  DETAIL_HEART_ARIA,
  DETAIL_SHARE_ARIA,
  RELATED_ACTIONS_HEADING,
} from "../import";
import type { CardRow, ActionDetail } from "../import";

interface ActionlistDetailContentProps {
  card: ActionDetail;
  relatedCards: CardRow[];
}

const BACK_BUTTON_CLASS =
  "inline-flex items-center px-4 py-3 border-2 border-[#999999] rounded-full font-sans text-lg line font-medium text-[#999999] hover:bg-gray-50 transition-colors leading-[13px]";

const LABEL_CLASS = "font-display text-[30px] leading-[20px] text-black whitespace-nowrap mt-2";

interface VideoInfo {
  type: "youtube" | "vimeo" | "direct";
  embedUrl: string;
  thumbnailUrl?: string;
  timestampSeconds?: number;
}

function parseTimestamp(url: string): number | undefined {
  const match = url.match(/[?&](?:t|start)=(\d+)s?/);
  if (!match) return undefined;
  return parseInt(match[1], 10);
}

function formatTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getVideoInfo(url: string): VideoInfo | null {
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (ytMatch) {
    const videoId = ytMatch[1];
    const timestampSeconds = parseTimestamp(url);
    const startParam = timestampSeconds ? `&start=${timestampSeconds}` : "";
    return {
      type: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1${startParam}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      timestampSeconds,
    };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) {
    return { type: "direct", embedUrl: url };
  }

  return null;
}

function VideoEmbed({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const info = getVideoInfo(url);
  if (!info) return null;

  if (info.type === "direct") {
    return (
      <video src={info.embedUrl} controls className="w-full h-48 bg-black" />
    );
  }

  if (playing) {
    return (
      <iframe
        src={info.embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-48 border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className="relative w-full h-48 overflow-hidden group block"
    >
      {info.thumbnailUrl ? (
        <Image src={info.thumbnailUrl} alt={title} fill className="object-cover" />
      ) : (
        <div className="w-full h-full bg-[#1a1a1a]" />
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors cursor-pointer">
        <svg
          viewBox="0 0 68 48"
          className="w-16 h-11 drop-shadow-md group-hover:scale-105 transition-transform"
          aria-hidden="true"
        >
          <path
            d="M66.5 7.5a8.5 8.5 0 0 0-6-6C55.8 0 34 0 34 0S12.2 0 7.5 1.5a8.5 8.5 0 0 0-6 6C0 12.2 0 24 0 24s0 11.8 1.5 16.5a8.5 8.5 0 0 0 6 6C12.2 48 34 48 34 48s21.8 0 26.5-1.5a8.5 8.5 0 0 0 6-6C68 35.8 68 24 68 24s0-11.8-1.5-16.5z"
            fill="#FF0000"
          />
          <path d="M27 34l18-10-18-10v20z" fill="#fff" />
        </svg>
      </div>
      {info.timestampSeconds !== undefined && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white font-sans text-xs font-semibold px-1.5 py-0.5 rounded pointer-events-none">
          {formatTimestamp(info.timestampSeconds)}
        </div>
      )}
    </button>
  );
}

function getSocialIcon(url: string) {
  try {
    const { hostname } = new URL(url);
    if (hostname.includes("instagram.com")) return <InstagramIcon />;
    if (hostname.includes("twitter.com") || hostname === "x.com" || hostname === "www.x.com") return <XIcon className="[&_path]:fill-[#10101099]" />;
    if (hostname.includes("facebook.com")) return <FacebookIcon />;
  } catch {
    // malformed URL — fall through to globe
  }
  return null;
  // return <IoGlobeOutline size={24} color="#6B6A69" />;
}

export default function ActionlistDetailContent({ card: initialCard, relatedCards: initialRelatedCards }: ActionlistDetailContentProps) {
  const router = useRouter();
  const [card] = useState<ActionDetail>(initialCard);
  const [relatedCards] = useState<CardRow[]>(initialRelatedCards);
  const { liked, setLiked, toggling, modalOpen, setModalOpen, handleHeartClick } =
    useFavoriteToggle({ actionId: card.id, initialLiked: card.is_selected });
  const { addToast } = useToast();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  async function handleShareClick() {
    const actionUrl = `${window.location.origin}/actionlist-detail/${card.slug}`;
    try {
      await navigator.clipboard.writeText(actionUrl);
      addToast(DETAIL_SHARE_TOAST_SUCCESS);
    } catch {
      addToast(DETAIL_SHARE_TOAST_ERROR);
    }
  }

  useEffect(() => {
    async function syncLiked() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.rpc("get_favorite_actions", {
        p_page: 1,
        p_limit: 1000,
        p_selected_area_ids: null,
        p_selected_author_ids: null,
        p_selected_frequency_ids: null,
      });
      if (!data) return;
      setLiked((data as CardRow[]).some((c) => c.id === card.id));
    }
    syncLiked();
  }, [card.id, setLiked]);

  const author = card.authors[0];
  const socialLinks = author?.social_links ?? [];

  return (
    <div className="px-4 py-6 md:px-8 lg:px-15">
      {/* Top navigation */}
      <div className="flex items-center justify-between mb-10 lg:mb-15">
        <Link href="/" className={BACK_BUTTON_CLASS} style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}>
          {DETAIL_BACK_BUTTON_TEXT}
        </Link>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={DETAIL_HEART_ARIA}
            onClick={handleHeartClick}
            disabled={toggling}
            className={`bg-[#F3F1EF] p-2 rounded-full hover:opacity-70 transition-opacity cursor-pointer ${toggling ? " opacity-50 cursor-not-allowed" : ""}`}
          >
            {liked ? <HeartPinkIcon /> : <HeartIcon />}
          </button>
          <button
            type="button"
            aria-label={DETAIL_SHARE_ARIA}
            onClick={handleShareClick}
            className="bg-[#F3F1EF] p-2 rounded-full hover:opacity-70 transition-opacity cursor-pointer"
          >
            <ShareIcon className="stroke-black" />
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[max-content_1fr] lg:items-start lg:gap-x-25 lg:gap-y-16">
        {/* Hero */}
        <section className="contents">
          <div
            className="w-20 h-20 rounded-full shrink-0 mt-1"
            style={{ backgroundColor: card.hex_colour_code }}
          />
          <h1 className="font-display text-4xl lg:text-5xl leading-tight text-black">
            {card.title}
          </h1>

        </section>

        {/* Details */}
        {card.more_info.length > 0 && <section className="contents">
          <h3 className={LABEL_CLASS}>{DETAIL_SECTION_DETAILS}</h3>
          <div className="flex flex-col gap-4">
            {card.more_info.split("\n").map((line, i) =>
              line.trim() ? (
                <p key={i} className="font-sans text-lg lg:text-xl font-medium text-black leading-relaxed">
                  {line}
                </p>
              ) : null
            )}
          </div>
        </section>}

        {/* Sources */}
        {card.sources.length > 0 && (
          <section className="contents">
            <h3 className={LABEL_CLASS}>{DETAIL_SECTION_SOURCES}</h3>
            <div className="flex flex-wrap gap-4">
              {card.sources.map((source, i) => {
                const videoInfo = getVideoInfo(source.link_url);
                if (videoInfo) {
                  return (
                    <div
                      key={i}
                      className="w-83.5 border border-[#DBDBDB] rounded-xl overflow-hidden flex flex-col p-4"
                    >
                      <VideoEmbed url={source.link_url} title={source.title} />
                      <div className="py-4 flex flex-col gap-2">
                        <a
                          href={source.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-80 transition-opacity"
                        >
                          <p className="font-sans font-semibold text-xl text-black">{source.title}</p>
                        </a>
                        <p className="font-sans text-base text-[#363636] leading-7">{source.description}</p>
                      </div>
                    </div>
                  );
                }
                return (
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
                );
              })}
            </div>
          </section>
        )}

        {/* Products */}
        {card.products.length > 0 && (
          <section className="contents">
            <h3 className={LABEL_CLASS}>{DETAIL_SECTION_PRODUCTS}</h3>
            <div className="flex flex-wrap gap-4">
              {card.products.map((product, i) => (
                <a
                  key={i}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-83.5 border border-[#DBDBDB] rounded-xl overflow-hidden flex flex-col hover:opacity-80 transition-opacity"
                >
                  {product.image && (
                    <div className="relative w-full h-48 shrink-0">
                      <Image src={product.image} alt={product.title} fill className="object-contain p-4" />
                    </div>
                  )}
                  <div className="p-4 flex flex-col gap-2">
                    <p className="font-sans font-semibold text-xl text-black">{product.title}</p>
                    <p className="font-sans text-base text-[#363636] leading-7">{product.description}</p>
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
                <Link
                  key={area.id}
                  href={`/?area_of_inspiration=${encodeURIComponent(area.name)}`}
                  className="border-[#DBDBDB] border-2 rounded-xl px-5 py-2.5 font-sans text-[20px] leading-3.5 text-[#101010] hover:opacity-70 transition-opacity font-medium h-12 flex items-center justify-center"
                >
                  {area.name}
                </Link>
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
                <Link
                  key={freq.id}
                  href={`/?best_time_to_try=${encodeURIComponent(freq.name)}`}
                  className="flex items-center gap-2 border border-[#DBDBDB] px-4 py-2.5 rounded-lg hover:opacity-70 transition-opacity"
                >
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <TimeIcon />
                  </div>
                  <span className="font-sans text-xl font-semibold text-black text-[20px] leading-3.5">{freq.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Suggested by */}
        {author && (
          <section className="contents">
            <h3 className={LABEL_CLASS}>{DETAIL_SECTION_SUGGESTED}</h3>
            <div className="flex items-center gap-6 flex-wrap">
              <Link
                href={`/?author_name=${encodeURIComponent(author.name)}`}
                className="inline-flex items-center gap-2 border border-[#DBDBDB] rounded-lg px-4 py-2 hover:opacity-70 transition-opacity"
              >
                <div className="w-6 h-6 rounded-full bg-[#101010] shrink-0 flex items-center justify-center">
                  <span className="font-sans text-xs font-semibold text-white leading-none">
                    {author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-sans text-base font-semibold text-[#4B5563]">
                  {author.name}
                </span>
              </Link>
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-5">
                  {socialLinks.map((url: string) => (
                    getSocialIcon(url) && <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      {getSocialIcon(url)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="mt-16">
        <Link href="/" className={BACK_BUTTON_CLASS} style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}>
          {DETAIL_BACK_BUTTON_TEXT}
        </Link>
      </div>

      {/* Related Actions */}
      <div className="mt-20">
        <h2 className="font-display text-4xl lg:text-5xl text-[#101010] text-center mb-10">
          {RELATED_ACTIONS_HEADING}
        </h2>
        <div className="relative">
          <button
            type="button"
            aria-label="Previous"
            disabled={isBeginning}
            onClick={() => swiperInstance?.slidePrev()}
            className={`absolute -left-7.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 hidden md:flex items-center justify-center rounded-full border-2 border-[#DBDBDB] bg-white transition-colors${isBeginning ? " opacity-40 cursor-not-allowed" : " cursor-pointer hover:bg-gray-50"}`}
          >
            <RelationActionVector className="rotate-180" />
          </button>

          <div className="overflow-x-hidden">
            <Swiper
              className="related-actions-swiper md:px-4! px-2!"
              modules={[Navigation, Pagination]}
              onSwiper={(swiper) => { setSwiperInstance(swiper); setIsBeginning(swiper.isBeginning); setIsEnd(swiper.isEnd); }}
              onSlideChange={(swiper) => { setIsBeginning(swiper.isBeginning); setIsEnd(swiper.isEnd); }}
              spaceBetween={24}
              pagination={{ clickable: true }}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2, pagination: { enabled: false } },
                1024: { slidesPerView: 3, pagination: { enabled: false } },
                1280: { slidesPerView: 4, pagination: { enabled: false } },
                1536: { slidesPerView: 4, pagination: { enabled: false } },
              }}
            >
              {relatedCards.map((item, i) => (
                <SwiperSlide key={i} >
                  <ActionListCard
                    avatarColor={item.hex_colour_code}
                    text={item.title}
                    authorName={item.authors[0]?.name}
                    frequency={item.frequencies[0]?.name}
                    frequencyCount={item.frequencies.length}
                    frequencies={item.frequencies.map((f) => f.name)}
                    category={item.areas[0]?.name}
                    categories={item.areas.map((a) => a.name)}
                    actionId={item.id}
                    slug={item.slug}
                    onNext={() => router.push(`/actionlist-detail/${item.slug}`)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            type="button"
            aria-label="Next"
            disabled={isEnd}
            onClick={() => swiperInstance?.slideNext()}
            className={`absolute -right-7.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 hidden md:flex items-center justify-center rounded-full border-2 border-[#DBDBDB] bg-white transition-colors${isEnd ? " opacity-40 cursor-not-allowed" : " cursor-pointer hover:bg-gray-50"}`}
          >
            <RelationActionVector />
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={DETAIL_AUTH_MODAL_TITLE}
        description={DETAIL_AUTH_MODAL_DESCRIPTION}
        onPrimaryAction={() => router.push("/login")}
      />
    </div>
  );
}

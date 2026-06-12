"use client";

import {
  useState,
  useRouter,
  useEffect,
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
  "inline-flex items-center px-4 py-2 border-2 border-[#999999] rounded-full font-sans text-lg font-medium text-[#999999] hover:bg-gray-50 transition-colors";

const LABEL_CLASS = "font-display text-3xl text-black whitespace-nowrap";

function getSocialIcon(url: string) {
  if (url.includes("instagram.com")) return <InstagramIcon />;
  if (url.includes("twitter.com") || url.includes("x.com")) return <XIcon className="[&_path]:fill-[#10101099]" />;
  if (url.includes("facebook.com")) return <FacebookIcon />;
  return null;
}

export default function ActionlistDetailContent({ card: initialCard, relatedCards: initialRelatedCards }: ActionlistDetailContentProps) {
  const router = useRouter();
  const [card] = useState<ActionDetail>(initialCard);
  const [relatedCards] = useState<CardRow[]>(initialRelatedCards);
  const { liked, setLiked, toggling, modalOpen, setModalOpen, handleHeartClick } =
    useFavoriteToggle({ actionId: card.id, initialLiked: false });
  const { addToast } = useToast();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

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
    if (card) setLiked(card.is_selected);
  }, [card, setLiked]);

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
            onClick={handleHeartClick}
            disabled={toggling}
            className={`hover:opacity-70 transition-opacity cursor-pointer ${toggling ? " opacity-50 cursor-not-allowed" : ""}`}
          >
            {liked ? <HeartPinkIcon /> : <HeartIcon />}
          </button>
          <button
            type="button"
            aria-label={DETAIL_SHARE_ARIA}
            onClick={handleShareClick}
            className="hover:opacity-70 transition-opacity cursor-pointer"
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
                <Link
                  key={area.id}
                  href={`/?area_of_inspiration=${encodeURIComponent(area.name)}`}
                  className="border-[#DBDBDB] border-2 rounded-xl px-5 py-2.5 font-sans text-xl text-[#101010] hover:opacity-70 transition-opacity"
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
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <TimeIcon />
                  </div>
                  <span className="font-sans text-xl font-semibold text-black">{freq.name}</span>
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
                className="inline-flex items-center gap-2 bg-[#EFEFEF] rounded-md px-4 py-2 hover:opacity-70 transition-opacity"
              >
                <div className="w-7.5 h-7.5 rounded-full bg-[#8B9BA8] shrink-0" />
                <span className="font-sans text-base font-semibold text-[#4B5563]">
                  {author.name}
                </span>
              </Link>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 hidden md:flex items-center justify-center rounded-full border-2 border-[#DBDBDB] bg-white hover:bg-gray-50 transition-colors"
          >
            <RelationActionVector className="rotate-180" />
          </button>

          <div className="overflow-hidden">
            <Swiper
              className="related-actions-swiper"
              modules={[Navigation, Pagination]}
              onSwiper={setSwiperInstance}
              spaceBetween={24}
              pagination={{ clickable: true }}
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
            onClick={() => swiperInstance?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 hidden md:flex items-center justify-center rounded-full border-2 border-[#DBDBDB] bg-white hover:bg-gray-50 transition-colors"
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

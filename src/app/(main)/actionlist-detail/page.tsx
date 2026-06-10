"use client";

import {
  useState,
  Link,
  Image,
  HeartIcon,
  ShareIcon,
  TimeIcon,
  InstagramIcon,
  XIcon,
  FacebookIcon,
  ActionDetailSource,
  SuggestedByIcon,
  Swiper,
  SwiperType,
  SwiperSlide,
  Navigation,
  RelationActionVector,
  ActionListCard,
  DETAIL_BACK_BUTTON_TEXT,
  DETAIL_HERO_AVATAR_COLOR,
  DETAIL_HERO_TITLE,
  DETAIL_HERO_SUBTITLE,
  DETAIL_SECTION_DETAILS,
  DETAIL_SECTION_SOURCES,
  DETAIL_SECTION_HELPS,
  DETAIL_SECTION_BEST_TIME,
  DETAIL_SECTION_SUGGESTED,
  DETAIL_PARAGRAPHS,
  DETAIL_SOURCES,
  DETAIL_TAGS,
  DETAIL_FREQUENCIES,
  DETAIL_AUTHOR_NAME,
  DETAIL_HEART_ARIA,
  DETAIL_SHARE_ARIA,
  DETAIL_STAR_CHAR,
  RELATED_ACTIONS_HEADING,
  RELATED_ACTIONS,
} from "./import";

const BACK_BUTTON_CLASS =
  "inline-flex items-center px-4 py-2 border-2 border-[#999999] rounded-full font-sans text-lg font-medium text-[#999999] hover:bg-gray-50 transition-colors";

const LABEL_CLASS = "font-display text-3xl text-black whitespace-nowrap";

export default function ActionListDetail() {
  const [liked, setLiked] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

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
                liked
                  ? "fill-[#D89593] stroke-[#D89593]"
                  : "fill-none stroke-black"
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
          style={{ backgroundColor: DETAIL_HERO_AVATAR_COLOR }}
        />
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl lg:text-5xl leading-tight text-black">
            {DETAIL_HERO_TITLE}
          </h1>
          <p className="font-display text-3xl lg:text-4xl leading-tight text-black">
            {DETAIL_HERO_SUBTITLE}
          </p>
        </div>
      </div>

      {/* Sections — single grid so all label columns share max-content width */}
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[max-content_1fr] lg:items-start lg:gap-x-16 lg:gap-y-16">
        {/* Details */}
        <section className="contents">
          <h3 className={LABEL_CLASS}>{DETAIL_SECTION_DETAILS}</h3>
          <div className="flex flex-col gap-6">
            {DETAIL_PARAGRAPHS.map((para, i) => (
              <p
                key={i}
                className="font-sans text-xl font-medium text-black leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="contents">
          <h3 className={LABEL_CLASS}>{DETAIL_SECTION_SOURCES}</h3>
          <div className="flex flex-wrap gap-4">
            {DETAIL_SOURCES.map((source, i) => (
              <div
                key={i}
                className="w-83.5 border border-[#DBDBDB] rounded-xl overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-48 shrink-0">
                  <Image
                    src={ActionDetailSource}
                    alt={source.title}
                    fill
                    className="object-cover p-4 "
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <p className="font-sans font-semibold text-xl text-black">
                    {source.title}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="font-sans text-xl font-medium text-black">
                      {source.rating}
                    </span>
                    {Array.from({ length: source.rating }).map((_, j) => (
                      <span key={j} className="text-[#D96E1E] text-base">
                        {DETAIL_STAR_CHAR}
                      </span>
                    ))}
                  </div>
                  <p className="font-sans text-base text-[#363636] leading-7">
                    {source.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Can help with */}
        <section className="contents">
          <h3 className={LABEL_CLASS}>{DETAIL_SECTION_HELPS}</h3>
          <div className="flex flex-wrap gap-3">
            {DETAIL_TAGS.map((tag, i) => (
              <span
                key={i}
                className="border-[#DBDBDB] border-2 rounded-[12px] px-5 py-3 font-sans text-xl text-[#101010]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Best time to try */}
        <section className="contents">
          <h3 className={LABEL_CLASS}>{DETAIL_SECTION_BEST_TIME}</h3>
          <div className="flex flex-wrap gap-6">
            {DETAIL_FREQUENCIES.map((freq, i) => (
              <div
                key={i}
                className="flex items-center gap-2 border border-[#DBDBDB] px-4 py-2.5 rounded-lg"
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <TimeIcon />
                </div>
                <span className="font-sans text-xl font-semibold text-black">
                  {freq}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Suggested by */}
        <section className="contents">
          <h3 className={LABEL_CLASS}>{DETAIL_SECTION_SUGGESTED}</h3>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="inline-flex items-center gap-2 bg-[#EFEFEF] rounded-md px-4 py-2">
              <Image
                src={SuggestedByIcon}
                alt={DETAIL_AUTHOR_NAME}
                width={30}
                height={30}
                className="shrink-0 rounded-full object-cover"
              />
              <span className="font-sans text-base font-semibold text-[#4B5563]">
                {DETAIL_AUTHOR_NAME}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <button
                type="button"
                className="hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </button>
              <button
                type="button"
                className="hover:opacity-70 transition-opacity"
                aria-label="Twitter"
              >
                <XIcon className="[&_path]:fill-[#10101099]" />
              </button>
              <button
                type="button"
                className="hover:opacity-70 transition-opacity"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom navigation */}
      <div className="mt-16">
        <Link href="/" className={BACK_BUTTON_CLASS}>
          {DETAIL_BACK_BUTTON_TEXT}
        </Link>
      </div>

      {/* Related Action */}
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
              {RELATED_ACTIONS.map((item, i) => (
                <SwiperSlide key={i}>
                  <ActionListCard
                    avatarColor={item.avatarColor}
                    text={item.text}
                    authorName={item.authorName}
                    authorAvatarSrc={item.authorAvatarSrc || undefined}
                    frequency={item.frequency}
                    frequencyCount={item.frequencyCount}
                    category={item.category}
                    categories={item.categories}
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

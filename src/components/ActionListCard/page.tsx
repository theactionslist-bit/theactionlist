"use client";

import {
  useState,
  useRef,
  useEffect,
  Image,
  TimeIcon,
  HeartIcon,
  ShareNetwork,
  RightArrow,
  CARD_DEFAULT_FREQUENCY,
  CARD_DEFAULT_FREQUENCY_COUNT,
  CARD_DEFAULT_CATEGORY,
  CARD_DEFAULT_CATEGORIES,
  CARD_FAVORITE_ARIA,
  CARD_SHARE_ARIA,
  CARD_NEXT_ARIA,
} from "./import";

interface ActionListCardProps {
  avatarColor?: string;
  avatarSrc?: string;
  frequency?: string;
  frequencyCount?: number;
  text: string;
  authorName?: string;
  authorAvatarSrc?: string;
  category?: string;
  categories?: string[];
  onNext?: () => void;
}

const ActionListCard = ({
  avatarColor = "#8B9BA8",
  avatarSrc,
  frequency = CARD_DEFAULT_FREQUENCY,
  frequencyCount = CARD_DEFAULT_FREQUENCY_COUNT,
  text,
  authorName,
  authorAvatarSrc,
  category = CARD_DEFAULT_CATEGORY,
  categories = CARD_DEFAULT_CATEGORIES,
  onNext,
}: ActionListCardProps) => {
  const [liked, setLiked] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!categoriesOpen) return;
    function handle(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [categoriesOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative rounded-xl bg-white px-4 py-5.5 flex flex-col gap-5 justify-between"
      style={{ boxShadow: "0px 3px 8px 0px #0000003D" }}
    >
      {/* Top-right actions */}
      <div className="relative flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label={CARD_FAVORITE_ARIA}
          onClick={() => setLiked((v) => !v)}
          className="text-[#101010] hover:opacity-60 transition-opacity"
        >
          <HeartIcon
            className={`transition-colors ${liked ? "fill-[#D89593] stroke-[#D89593]" : "fill-none stroke-[#101010]"}`}
          />
        </button>
        <button
          type="button"
          aria-label={CARD_SHARE_ARIA}
          className="text-[#101010] hover:opacity-60 transition-opacity"
        >
          <ShareNetwork />
        </button>
      </div>

      {/* Header row: avatar + frequency badges */}
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-16 h-16 rounded-full overflow-hidden shrink-0"
          style={{ backgroundColor: avatarSrc ? undefined : avatarColor }}
        >
          {avatarSrc && (
            <Image
              src={avatarSrc}
              alt="Avatar"
              width={62}
              height={62}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 border border-[#DBDBDB] rounded-lg px-4 py-2.5 font-sans text-base md:text-xl font-semibold text-[#101010]">
            <TimeIcon className="shrink-0" />
            {frequency}
          </span>
          <span className="border border-[#DBDBDB] rounded-lg px-4 py-3.5 font-sans text-sm font-semibold text-[#101010]">
            +{frequencyCount}
          </span>
        </div>
      </div>

      {/* Main content text */}
      <p className="font-display text-xl md:text-2xl lg:text-[28px] leading-snug text-[#101010]">
        {text}
      </p>

      {/* Author chip */}
      {authorName && (
        <div className="flex items-center gap-2 border border-[#DBDBDB] rounded-lg px-4 py-3.5 w-fit mt-4">
          {authorAvatarSrc ? (
            <Image
              src={authorAvatarSrc}
              alt={authorName}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-7.5 h-7.5 rounded-full bg-[#8B9BA8] shrink-0" />
          )}
          <span className="font-sans text-base md:text-xl font-semibold text-[#101010] whitespace-nowrap">
            {authorName}
          </span>
          <span className="font-sans text-base md:text-xl text-[#101010] select-none">
            ·
          </span>
          <span className="font-sans text-base md:text-xl font-semibold text-[#101010]">
            X
          </span>
        </div>
      )}

      {/* Bottom row: category + dropdown trigger + next */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="border border-[#DBDBDB] rounded-lg px-4 py-3.5 font-sans text-base md:text-xl font-semibold text-[#101010] hover:bg-gray-50 transition-colors"
          >
            {category}
          </button>

          <button
            type="button"
            onClick={() => setCategoriesOpen((v) => !v)}
            className="border border-[#DBDBDB] rounded-lg px-4 py-3.5 font-sans text-base md:text-xl font-semibold text-[#101010] hover:bg-gray-50 transition-colors"
          >
            +{categories.length}
          </button>
        </div>

        {categoriesOpen && (
          <div
            className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-white z-10 p-4 flex flex-wrap gap-2 content-start overflow-y-auto"
            style={{ boxShadow: "0px 3px 8px 0px #0000003D", animation: "slide-up-fade 200ms ease-out" }}
          >
            {categories.map((cat) => (
              <span
                key={cat}
                className="border border-[#DBDBDB] rounded-lg px-3 py-1.5 font-sans text-sm font-semibold text-[#101010] whitespace-nowrap"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label={CARD_NEXT_ARIA}
          onClick={onNext}
          className="flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0"
        >
          <RightArrow />
        </button>
      </div>
    </div>
  );
};

export default ActionListCard;

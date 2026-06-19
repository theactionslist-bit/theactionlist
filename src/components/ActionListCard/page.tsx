"use client";

import {
  useState,
  useRef,
  useEffect,
  useRouter,
  Image,
  Modal,
  useFavoriteToggle,
  TimeIcon,
  HeartIcon,
  HeartPinkIcon,
  ShareNetwork,
  RightArrow,
  CARD_DEFAULT_FREQUENCY,
  CARD_DEFAULT_FREQUENCY_COUNT,
  CARD_DEFAULT_FREQUENCIES,
  CARD_DEFAULT_CATEGORY,
  CARD_DEFAULT_CATEGORIES,
  useToast,
  CARD_FAVORITE_ARIA,
  CARD_SHARE_ARIA,
  CARD_NEXT_ARIA,
  CARD_AUTH_MODAL_TITLE,
  CARD_AUTH_MODAL_DESCRIPTION,
  CARD_SHARE_TOAST_SUCCESS,
  CARD_SHARE_TOAST_ERROR,
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
  frequencies?: string[];
  onNext?: () => void;
  actionId?: string;
  slug?: string;
  initialLiked?: boolean;
  onUnfavorite?: () => void;
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
  frequencies = CARD_DEFAULT_FREQUENCIES,
  onNext,
  actionId,
  slug,
  initialLiked,
  onUnfavorite,
}: ActionListCardProps) => {
  const { liked, toggling, modalOpen, setModalOpen, handleHeartClick } = useFavoriteToggle({
    actionId,
    initialLiked,
    onUnfavorite,
  });
  const { addToast } = useToast();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [frequencyOpen, setFrequencyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  async function handleShareClick() {
    const actionUrl = `${window.location.origin}/actionlist-detail/${slug}`;
    try {
      await navigator.clipboard.writeText(actionUrl);
      addToast(CARD_SHARE_TOAST_SUCCESS);
    } catch {
      addToast(CARD_SHARE_TOAST_ERROR);
    }
  }

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

  useEffect(() => {
    if (!frequencyOpen) return;
    function handle(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setFrequencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [frequencyOpen]);

  return (
    <div
      ref={dropdownRef}
      onClick={onNext}
      onMouseEnter={() => { if (slug) router.prefetch(`/actionlist-detail/${slug}`); }}
      className={`relative rounded-xl bg-white px-4 py-5.5 flex flex-col gap-5 h-full cursor-pointer${(categoriesOpen || frequencyOpen) ? " z-2" : ""}`}
      style={{ boxShadow: "0px 3px 8px 0px #0000003D" }}
    >
      {/* Top-right actions */}
      <div className="relative flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label={CARD_FAVORITE_ARIA}
          onClick={(e) => { e.stopPropagation(); handleHeartClick(); }}
          disabled={toggling}
          className={`text-[#101010] hover:opacity-60 transition-opacity cursor-pointer ${toggling ? " opacity-50 cursor-not-allowed" : ""}`}
        >
          {liked ? <HeartPinkIcon /> : <HeartIcon />}
        </button>
        <button
          type="button"
          aria-label={CARD_SHARE_ARIA}
          onClick={(e) => { e.stopPropagation(); handleShareClick(); }}
          className="text-[#101010] hover:opacity-60 transition-opacity cursor-pointer"
        >
          <ShareNetwork />
        </button>
      </div>

      {/* Header row: avatar + frequency badges */}
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-15.5 h-15.5 rounded-full overflow-hidden shrink-0"
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
          <span className="flex items-center gap-1.5 border border-[#DBDBDB] rounded-lg px-4 py-2.5 font-sans text-base md:text-xl font-medium text-[#101010]">
            <TimeIcon className="shrink-0" />
            {frequency}
          </span>
          {(frequencyCount-1 > 0) && <button
            type="button"
            className="border border-[#DBDBDB] rounded-lg px-4 py-2.5 font-sans text-base md:text-xl font-medium text-[#101010] hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setCategoriesOpen(false); setFrequencyOpen((v) => !v); }}
          >
            +{frequencyCount - 1}
          </button>}
        </div>
      </div>

      {/* Main content text */}
      <p className="flex-1 font-display text-xl md:text-2xl lg:text-[28px] leading-snug text-[#101010] mb-4 mt-4">
        {text}
      </p>

      {/* Author chip */}
      {authorName && (
        <div className="flex items-center gap-2 border border-[#DBDBDB] rounded-lg px-4 py-2.5 w-fit mb-1">
          {authorAvatarSrc ? (
            <Image
              src={authorAvatarSrc}
              alt={authorName}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-7.5 h-7.5 rounded-full bg-[#101010] shrink-0 flex items-center justify-center">
              <span className="font-sans font-semibold text-white leading-none text-base">
                {authorName?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className="font-sans text-base md:text-xl font-medium text-[#101010] whitespace-nowrap">
            {authorName}
          </span>
          <span className="font-sans text-base md:text-xl text-[#101010] select-none">
            ·
          </span>
          <span className="font-sans text-base md:text-xl font-medium text-[#101010]">
            X
          </span>
        </div>
      )}

      {/* Bottom row: category + dropdown trigger + next */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="border border-[#DBDBDB] rounded-lg px-4 py-2.5 font-sans text-base md:text-xl font-medium text-[#101010] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {category}
          </button>

          { (categories.length - 1 > 0) &&<button
            type="button"
            className="border border-[#DBDBDB] rounded-lg px-4 py-2.5 font-sans text-base md:text-xl font-medium text-[#101010] hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setFrequencyOpen(false); setCategoriesOpen((v) => !v); }}
          >
            +{categories.length - 1}
          </button>}
        </div>

        {categoriesOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-white z-10 p-4 flex flex-wrap gap-2 content-start overflow-y-auto"
            style={{
              boxShadow: "0px 3px 8px 0px #0000003D",
              animation: "slide-up-fade 200ms ease-out",
            }}
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

        {frequencyOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-white z-10 p-4 flex flex-wrap gap-2 content-start overflow-y-auto"
            style={{
              boxShadow: "0px 3px 8px 0px #0000003D",
              animation: "slide-up-fade 200ms ease-out",
            }}
          >
            {frequencies.map((freq) => (
              <span
                key={freq}
                className="border border-[#DBDBDB] rounded-lg px-3 py-1.5 font-sans text-sm font-semibold text-[#101010] whitespace-nowrap"
              >
                {freq}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label={CARD_NEXT_ARIA}
          className="flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0 cursor-pointer"
        >
          <RightArrow />
        </button>
      </div>
      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={CARD_AUTH_MODAL_TITLE}
        description={CARD_AUTH_MODAL_DESCRIPTION}
        onPrimaryAction={() => router.push("/login")}
      />
    </div>
  );
};

export default ActionListCard;

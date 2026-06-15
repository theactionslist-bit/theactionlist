import { Image } from "./import";
import type { StaticImageData } from "./import";

type BannerSectionProps = {
  heading: string;
  image: StaticImageData | string;
  imageAlt?: string;
  strikethroughWord?: string;
};

function renderHeading(text: string, word: string) {
  const parts = text.split(word);
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <span style={{ position: "relative", display: "inline-block" }}>
          {word}
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "57%",
              transform: "translateY(-50%)",
              height: "4px",
              backgroundColor: "#D89593",
              display: "block",
            }}
          />
        </span>
      )}
    </span>
  ));
}

export function BannerSection({
  heading,
  image,
  imageAlt = "Banner",
  strikethroughWord,
}: BannerSectionProps) {
  return (
    <div
      className="relative h-120 md:h-140 lg:h-160"
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0" />
      <div className="absolute bottom-0 w-full left-1/2 -translate-x-1/2 max-w-360 px-5 pb-10 lg:px-15 lg:pb-15">
        <h2 className="font-display text-4xl md:text-5xl lg:text-[70px] text-white leading-tight max-w-4xl whitespace-pre-line">
          {strikethroughWord ? renderHeading(heading, strikethroughWord) : heading}
        </h2>
      </div>
    </div>
  );
}

export default BannerSection;

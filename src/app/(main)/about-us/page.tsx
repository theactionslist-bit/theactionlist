"use client";

import {
  useRouter,
  BannerImage,
  BannerSection,
  Button,
  ABOUT_US_BANNER_HEADING,
  ABOUT_US_PARAGRAPHS,
  ABOUT_US_EXPLORE_TEXT,
} from "./import";

const AboutUs = () => {
  const router = useRouter();

  return (
    <>
      <BannerSection heading={ABOUT_US_BANNER_HEADING} image={BannerImage} />
      <section className="flex flex-col gap-5 py-25 px-15">
        {ABOUT_US_PARAGRAPHS.map((text) => (
          <p
            key={text}
            className="text-lg leading-8 md:text-xl md:leading-9 lg:text-2xl lg:leading-10 font-medium text-[#101010]"
          >
            {text}
          </p>
        ))}
        <div className="mt-4">
          <Button
            variant="secondary"
            padding="14px 20px"
            borderRadius="200px"
            className="border-black! text-[#101010]! hover:bg-black/5!"
            onClick={() => router.push("/")}
          >
            {ABOUT_US_EXPLORE_TEXT}
          </Button>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

import {
  BannerImage,
  BannerSection,
  ABOUT_US_BANNER_HEADING,
  ABOUT_US_PARAGRAPHS,
} from "./import";

const AboutUs = () => {
  return (
    <>
      <BannerSection heading={ABOUT_US_BANNER_HEADING} image={BannerImage} />
      <section className="flex flex-col gap-5 py-[100px] px-15">
        {ABOUT_US_PARAGRAPHS.map((text) => (
          <p
            key={text}
            className="text-lg leading-8 md:text-xl md:leading-9 lg:text-2xl lg:leading-10 font-medium text-[#101010]"
          >
            {text}
          </p>
        ))}
      </section>
    </>
  );
};

export default AboutUs;

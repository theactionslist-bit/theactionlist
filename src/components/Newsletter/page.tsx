import {
  NEWSLETTER_HEADING,
  NEWSLETTER_BODY,
  NEWSLETTER_PLACEHOLDER,
  NEWSLETTER_BUTTON_TEXT,
  NEWSLETTER_CONSENT_TEXT,
  NEWSLETTER_TERMS_TEXT,
  NEWSLETTER_TERMS_HREF,
  NEWSLETTER_PRIVACY_TEXT,
  NEWSLETTER_PRIVACY_HREF,
} from "./constant";

const NewsletterSection = () => {
  return (
    <div id="newsletter" className="scroll-mt-(--header-height) px-5 pt-7 pb-12 md:px-10 md:pb-12 lg:px-15 lg:pt-8 lg:pb-14">
      <h1 className="font-display text-3xl md:text-4xl lg:text-[46px] pb-4 text-[#101010]">
        {NEWSLETTER_HEADING}
      </h1>
      <p className="text-lg leading-8 md:text-xl md:leading-9 lg:text-2xl lg:leading-10 font-medium text-[#101010]">
        {NEWSLETTER_BODY}
      </p>

      {/* Email subscribe form */}
      <div className="my-7.5 flex items-center w-full max-w-xl bg-[#F3F1EF] rounded-xl p-2 gap-2">
        <input
          type="email"
          placeholder={NEWSLETTER_PLACEHOLDER}
          className="flex-1 min-w-0 px-4 py-1.5 bg-transparent text-base md:text-xl lg:text-2xl text-[#101010] placeholder:text-gray-400 outline-none"
        />
        <button
          type="button"
          className="px-5 md:px-7 py-2.5 md:py-3 rounded-lg bg-[#101010] text-white text-base md:text-xl lg:text-2xl font-medium whitespace-nowrap hover:bg-[#2a2a2a] transition-colors duration-200"
        >
          {NEWSLETTER_BUTTON_TEXT}
        </button>
      </div>

      {/* Consent checkbox */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 w-4 h-4 shrink-0 accent-[#101010] cursor-pointer"
        />
        <span className="text-base md:text-lg leading-6 md:leading-7 text-[#101010]">
          {NEWSLETTER_CONSENT_TEXT}{" "}
          <a
            href={NEWSLETTER_TERMS_HREF}
            className="font-bold underline text-[#101010] hover:opacity-70 transition-opacity"
          >
            {NEWSLETTER_TERMS_TEXT}
          </a>{" "}
          and{" "}
          <a
            href={NEWSLETTER_PRIVACY_HREF}
            className="font-bold underline text-[#101010] hover:opacity-70 transition-opacity"
          >
            {NEWSLETTER_PRIVACY_TEXT}
          </a>
        </span>
      </label>
    </div>
  );
};

export default NewsletterSection;

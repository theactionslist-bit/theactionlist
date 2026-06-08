import {
  Logo,
  Link,
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  LOGO_ARIA_LABEL,
  PRIVACY_POLICY_TEXT,
  PRIVACY_POLICY_HREF,
  COPYRIGHT_TEXT,
} from "./import";

const FooterSection = () => {
  return (
    <footer className="w-full flex flex-col items-center gap-6 px-5 py-8 border-t border-[#101010] md:flex-row md:justify-between md:items-center md:px-10 md:py-11.25 lg:px-15">
      <div className="shrink-0">
        <Logo aria-label={LOGO_ARIA_LABEL} role="img" />
      </div>
      <div className="flex flex-col items-center gap-5 md:flex-row md:gap-10">
        <div className="text-[#10101099] text-xl flex flex-col md:items-end items-start">
          <Link href={PRIVACY_POLICY_HREF}>{PRIVACY_POLICY_TEXT}</Link>
          <p>{COPYRIGHT_TEXT}</p>
        </div>
        <div className="flex gap-4 items-center">
          <InstagramIcon />
          <TwitterIcon />
          <FacebookIcon />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

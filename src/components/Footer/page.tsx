import {
  Logo,
  Link,
  InstagramIcon,
  FacebookIcon,
  XIcon,
  LOGO_ARIA_LABEL,
  PRIVACY_POLICY_TEXT,
  PRIVACY_POLICY_HREF,
  COPYRIGHT_TEXT,
  INSTAGRAM_HREF,
  X_HREF,
  INSTAGRAM_ARIA,
  X_ARIA,
} from "./import";

const FooterSection = () => {
  return (
    <footer
      className="border-t border-[#101010] bg-white"
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      <div className="max-w-360 mx-auto flex flex-col items-center gap-6 px-5 py-8 md:flex-row md:justify-between md:items-center md:px-10 md:py-11.25 lg:px-15">
        <Link href="/" className="shrink-0">
          <Logo aria-label={LOGO_ARIA_LABEL} role="img" />
        </Link>
        <div className="flex flex-col items-center gap-5 md:flex-row md:gap-10">
          <div className="text-[#10101099] text-base md:text-lg lg:text-xl flex flex-col md:items-end items-start">
            <Link href={PRIVACY_POLICY_HREF}>{PRIVACY_POLICY_TEXT}</Link>
            <p>{COPYRIGHT_TEXT}</p>
          </div>
          <div className="flex gap-4 items-center">
            <Link href={INSTAGRAM_HREF} target="_blank" rel="noopener noreferrer" aria-label={INSTAGRAM_ARIA}>
              <InstagramIcon />
            </Link>
            <Link href={X_HREF} target="_blank" rel="noopener noreferrer" aria-label={X_ARIA}>
              <XIcon className="[&_path]:fill-[#10101099]" />
            </Link>
            <FacebookIcon />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

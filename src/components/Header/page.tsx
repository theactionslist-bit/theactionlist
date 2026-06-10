"use client";

import {
  useState,
  useRouter,
  usePathname,
  Link,
  Logo,
  RxHamburgerMenu,
  RxCross2,
  Button,
  NAV_ITEMS,
  LOGO_ARIA_LABEL,
  MENU_OPEN_ARIA_LABEL,
  MENU_CLOSE_ARIA_LABEL,
  LOGIN_BUTTON_TEXT,
  MY_PROFILE_HREF,
} from "./import";

const HeaderSection = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="sticky top-0 z-20 bg-white"
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      <header className="w-full py-5 flex items-center px-5 lg:px-8 xl:px-15">
        <Link href="/" className="shrink-0">
          <Logo aria-label={LOGO_ARIA_LABEL} role="img" />
        </Link>

        <nav className="hidden lg:flex flex-wrap flex-1 items-center justify-end">
          {NAV_ITEMS.map((item, index) => (
            <span key={item.label} className="flex items-center">
              {index > 0 && <div className="h-4 w-px bg-[#DBDBDB] shrink-0" />}
              <a
                href={item.href}
                className={`flex items-center gap-2 px-3 xl:px-5 text-[16px] text-[#101010] whitespace-nowrap ${pathname === item.href ? "font-bold" : "font-semibold"}`}
              >
                <item.Icon className="shrink-0" />
                {item.label}
              </a>
            </span>
          ))}
        </nav>

        <div className="hidden lg:block shrink-0">
          <Button
            variant="primary"
            className="ml-3.75 text-[18px]!"
            onClick={() => router.push(MY_PROFILE_HREF)}
          >
            {LOGIN_BUTTON_TEXT}
          </Button>
        </div>

        <div className="flex-1 flex justify-end items-center lg:hidden">
          <button
            className="p-2 text-[#101010]"
            onClick={() => setMobileOpen(true)}
            aria-label={MENU_OPEN_ARIA_LABEL}
          >
            <RxHamburgerMenu size={24} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col px-5 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Logo aria-label={LOGO_ARIA_LABEL} role="img" />
            </Link>
            <button
              className="p-2 text-[#101010]"
              onClick={() => setMobileOpen(false)}
              aria-label={MENU_CLOSE_ARIA_LABEL}
            >
              <RxCross2 size={24} />
            </button>
          </div>

          <nav className="mt-6 flex-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 py-4 text-[16px] text-[#101010] border-b border-gray-100 last:border-b-0 ${pathname === item.href ? "font-bold" : "font-semibold"}`}
              >
                <item.Icon className="shrink-0" />
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pb-6">
            <Button
              variant="primary"
              className="w-full text-[18px]!"
              onClick={() => router.push(MY_PROFILE_HREF)}
            >
              {LOGIN_BUTTON_TEXT}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSection;

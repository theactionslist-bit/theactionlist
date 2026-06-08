"use client";

import {
  useState,
  Logo,
  RxHamburgerMenu,
  RxCross2,
  NAV_ITEMS,
  LOGO_ARIA_LABEL,
  MENU_OPEN_ARIA_LABEL,
  MENU_CLOSE_ARIA_LABEL,
  LOGIN_BUTTON_TEXT,
} from "./import";

const HeaderSection = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative">
      <header className="w-full py-5 flex items-center px-5 lg:px-8 xl:px-15">
        <div className="shrink-0">
          <Logo aria-label={LOGO_ARIA_LABEL} role="img" />
        </div>

        <nav className="hidden lg:flex flex-wrap flex-1 items-center justify-end">
          {NAV_ITEMS.map((item, index) => (
            <span key={item.label} className="flex items-center">
              {index > 0 && <div className="h-4 w-px bg-[#DBDBDB] shrink-0" />}
              <a
                href={item.href}
                className="flex items-center gap-2 px-3 xl:px-5 text-[16px] font-semibold text-[#101010] whitespace-nowrap"
              >
                <item.Icon className="shrink-0" />
                {item.label}
              </a>
            </span>
          ))}
        </nav>

        <div className="hidden lg:block shrink-0">
          <button className="px-5 py-2.5 ml-3.75 rounded-full bg-[#D89593] text-white font-medium text-[18px] transition-colors duration-200">
            {LOGIN_BUTTON_TEXT}
          </button>
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
            <Logo aria-label={LOGO_ARIA_LABEL} role="img" />
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
                className="flex items-center gap-3 py-4 text-[16px] font-semibold text-[#101010] border-b border-gray-100 last:border-b-0"
              >
                <item.Icon className="shrink-0" />
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pb-6">
            <button className="w-full px-5 py-3 rounded-full bg-[#D89593] text-white font-medium text-[18px] transition-colors duration-200">
              {LOGIN_BUTTON_TEXT}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSection;

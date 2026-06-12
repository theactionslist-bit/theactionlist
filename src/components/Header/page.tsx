"use client";

import {
  useState,
  useEffect,
  useRouter,
  usePathname,
  Link,
  Logo,
  RxHamburgerMenu,
  RxCross2,
  Button,
  createClient,
  Modal,
  NAV_ITEMS,
  LOGO_ARIA_LABEL,
  MENU_OPEN_ARIA_LABEL,
  MENU_CLOSE_ARIA_LABEL,
  LOGIN_BUTTON_TEXT,
  PROFILE_BUTTON_TEXT,
  MY_PROFILE_HREF,
  LOGIN_HREF,
  MY_ACTIONS_HREF,
  MY_ACTIONS_MODAL_TITLE,
  MY_ACTIONS_MODAL_DESCRIPTION,
} from "./import";

import type { User } from "@supabase/supabase-js";

const HeaderSection = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const buttonText = user ? PROFILE_BUTTON_TEXT : LOGIN_BUTTON_TEXT;
  const buttonHref = user ? MY_PROFILE_HREF : LOGIN_HREF;

  return (
    <div
      className="sticky top-0 z-20 bg-white"
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      <header className="max-w-360 mx-auto py-5 flex items-center px-5 lg:px-8 xl:px-15">
        <Link href="/" className="shrink-0">
          <Logo aria-label={LOGO_ARIA_LABEL} role="img" />
        </Link>

        <nav className="hidden lg:flex flex-nowrap flex-1 items-center justify-end">
          {NAV_ITEMS.map((item, index) => (
            <span key={item.label} className="flex items-center">
              {index > 0 && <div className="h-4 w-px bg-[#DBDBDB] shrink-0" />}
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.href === MY_ACTIONS_HREF && !user) {
                    e.preventDefault();
                    setModalOpen(true);
                  }
                }}
                className={`flex items-center gap-2 px-2 xl:px-5 text-sm xl:text-base text-[#101010] whitespace-nowrap ${pathname === item.href ? "font-bold" : "font-semibold"}`}
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
            className="xl:ml-3.75 xl:text-[18px]!"
            onClick={() => router.push(buttonHref)}
          >
            {buttonText}
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={MY_ACTIONS_MODAL_TITLE}
        description={MY_ACTIONS_MODAL_DESCRIPTION}
        onPrimaryAction={() => router.push(LOGIN_HREF)}
      />

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
                onClick={(e) => {
                  if (item.href === MY_ACTIONS_HREF && !user) {
                    e.preventDefault();
                    setModalOpen(true);
                  }
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 py-4 text-base text-[#101010] border-b border-gray-100 last:border-b-0 ${pathname === item.href ? "font-bold" : "font-semibold"}`}
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
              onClick={() => router.push(buttonHref)}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSection;

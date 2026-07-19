"use client";

import {
  useRef,
  useEffect,
  usePathname,
  useRouter,
  Link,
  IoMenuOutline,
  IoCloseOutline,
  IoLogOutOutline,
  ADMIN_NAV_ITEMS,
  SIDEBAR_MENU_OPEN_ARIA_LABEL,
  SIDEBAR_MENU_CLOSE_ARIA_LABEL,
  LOGOUT_BUTTON_TEXT,
  handleAdminLogout,
} from "./import";

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {ADMIN_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 font-sans text-sm transition-colors ${
              isActive
                ? "bg-[#D89593]/10 font-semibold text-[#D89593]"
                : "text-[#101010] hover:bg-[#F3F1EF]"
            }`}
          >
            <item.Icon size={20} className="shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutButton({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();

  return (
    <div className="p-4 border-t border-[#DBDBDB]">
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          handleAdminLogout(router);
        }}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-sans text-sm text-[#101010] transition-colors hover:bg-[#F3F1EF] cursor-pointer"
      >
        <IoLogOutOutline size={20} className="shrink-0" />
        {LOGOUT_BUTTON_TEXT}
      </button>
    </div>
  );
}

export function AdminSidebarToggleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={SIDEBAR_MENU_OPEN_ARIA_LABEL}
      className="lg:hidden p-2 text-[#101010] cursor-pointer"
    >
      <IoMenuOutline size={24} />
    </button>
  );
}

interface AdminSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function AdminSidebar({ mobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onCloseMobile();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen, onCloseMobile]);

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col lg:justify-between w-64 shrink-0 border-r border-[#DBDBDB] bg-white">
        <NavLinks pathname={pathname} />
        <LogoutButton />
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1010104D]">
          <div ref={drawerRef} className="h-full w-64 bg-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-end p-4">
                <button
                  type="button"
                  onClick={onCloseMobile}
                  aria-label={SIDEBAR_MENU_CLOSE_ARIA_LABEL}
                  className="p-2 text-[#101010] cursor-pointer"
                >
                  <IoCloseOutline size={24} />
                </button>
              </div>
              <NavLinks pathname={pathname} onNavigate={onCloseMobile} />
            </div>
            <LogoutButton onNavigate={onCloseMobile} />
          </div>
        </div>
      )}
    </>
  );
}

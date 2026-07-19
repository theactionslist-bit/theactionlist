"use client";

import {
  useState,
  useRef,
  useEffect,
  createPortal,
  IoEllipsisVertical,
  ROW_ACTIONS_MENU_TRIGGER_ARIA,
} from "./import";

export interface RowAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

const ESTIMATED_MENU_HEIGHT = 130;

export default function RowActionsMenu({ actions }: { actions: RowAction[] }) {
  const [position, setPosition] = useState<{ top: number; left: number; openAbove: boolean } | null>(
    null,
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!position) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setPosition(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [position]);

  function handleToggle() {
    if (position) {
      setPosition(null);
      return;
    }
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const spaceBelow = window.innerHeight - rect.bottom;
    const openAbove = spaceBelow < ESTIMATED_MENU_HEIGHT;

    setPosition({
      top: openAbove ? rect.top - 4 : rect.bottom + 4,
      left: rect.right,
      openAbove,
    });
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        aria-label={ROW_ACTIONS_MENU_TRIGGER_ARIA}
        className="flex h-8 w-8 items-center justify-center rounded-full text-[#101010] hover:bg-[#F3F1EF] transition-colors cursor-pointer"
      >
        <IoEllipsisVertical size={18} />
      </button>

      {position &&
        createPortal(
          <div
            ref={menuRef}
            className={`fixed z-60 w-36 -translate-x-full rounded-lg border border-[#DBDBDB] bg-white
            py-1 shadow-lg ${position.openAbove ? "-translate-y-full" : ""}`}
            style={{ top: position.top, left: position.left }}
          >
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  setPosition(null);
                  action.onClick();
                }}
                className={`block w-full px-4 py-2 text-left font-sans text-sm transition-colors hover:bg-[#F3F1EF] cursor-pointer ${
                  action.variant === "danger" ? "text-red-600" : "text-[#101010]"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

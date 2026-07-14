"use client";

import { useState, useRef, useEffect, IoEllipsisVertical, ROW_ACTIONS_MENU_TRIGGER_ARIA } from "./import";

export interface RowAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

export default function RowActionsMenu({ actions }: { actions: RowAction[] }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={ROW_ACTIONS_MENU_TRIGGER_ARIA}
        className="flex h-8 w-8 items-center justify-center rounded-full text-[#101010] hover:bg-[#F3F1EF] transition-colors cursor-pointer"
      >
        <IoEllipsisVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-1 w-36 rounded-lg border border-[#DBDBDB] bg-white py-1 shadow-lg">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                setOpen(false);
                action.onClick();
              }}
              className={`block w-full px-4 py-2 text-left font-sans text-sm transition-colors hover:bg-[#F3F1EF] cursor-pointer ${
                action.variant === "danger" ? "text-red-600" : "text-[#101010]"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

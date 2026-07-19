"use client";

import { useState, useRef, createPortal } from "./import";

interface TruncatedCellProps {
  text: string | null | undefined;
  maxWidthClass?: string;
}

const ESTIMATED_TOOLTIP_HEIGHT = 100;

export default function TruncatedCell({ text, maxWidthClass = "max-w-55" }: TruncatedCellProps) {
  const [position, setPosition] = useState<{ top: number; left: number; openBelow: boolean } | null>(
    null,
  );
  const triggerRef = useRef<HTMLSpanElement>(null);

  if (!text) return <>—</>;

  function handleMouseEnter() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const spaceBelow = window.innerHeight - rect.bottom;
    const openBelow = spaceBelow >= ESTIMATED_TOOLTIP_HEIGHT;

    setPosition({
      top: openBelow ? rect.bottom + 6 : rect.top - 6,
      left: rect.left,
      openBelow,
    });
  }

  return (
    <>
      <span
        ref={triggerRef}
        className={`block truncate ${maxWidthClass}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setPosition(null)}
      >
        {text}
      </span>

      {position &&
        createPortal(
          <div
            className={`pointer-events-none fixed z-60 whitespace-normal wrap-break-word rounded-lg border
            border-[#DBDBDB] bg-white p-2 font-sans text-xs text-[#101010] shadow-lg ${maxWidthClass}
            ${position.openBelow ? "" : "-translate-y-full"}`}
            style={{ top: position.top, left: position.left }}
          >
            {text}
          </div>,
          document.body,
        )}
    </>
  );
}

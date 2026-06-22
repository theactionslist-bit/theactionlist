"use client";
import { useState, useEffect, createPortal, TOAST_DEFAULT_DURATION, TOAST_CLOSE_ARIA, ToastrCrossIcon } from "./import";

export interface Toast {
  id: string;
  message: string;
  duration?: number;
  variant?: "success" | "error";
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), toast.duration ?? TOAST_DEFAULT_DURATION);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={`flex items-center gap-3 ${toast.variant === "error" ? "bg-[#C10803] border-[#C1080312] border-2" : "bg-[#EFF9EE] border-2 border-[#09961E]"} text-white px-4 py-3 rounded-xl shadow-lg min-w-[280px] max-w-sm w-full`}
      style={{ animation: "toast-slide-in 0.25s ease-out" }}
    >
      <span className="flex-1 font-sans text-base font-medium text-black">{toast.message}</span>
      <button
        type="button"
        aria-label={TOAST_CLOSE_ARIA}
        onClick={() => onRemove(toast.id)}
        className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer"
      >
        <ToastrCrossIcon />
      </button>
    </div>
  );
}

export function Toaster({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(
    <div className="fixed top-6 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>,
    document.body,
  );
}

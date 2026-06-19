"use client";
import { useState, useCallback, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Toaster } from "@/components/Toast/page";
import type { Toast } from "@/components/Toast/page";

interface ToastContextValue {
  addToast: (message: string, variant?: "success" | "error", duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(message: string, variant?: "success" | "error", duration?: number) {
    const id = Math.random().toString(36).slice(2) + Date.now();
    setToasts((prev) => [...prev, { id, message, variant, duration }]);
  }

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Toaster toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

"use client";

import { clsx, BUTTON_SPINNER_ARIA } from "./import";
import type { MouseEventHandler, ReactNode } from "./import";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  leftIcon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  padding?: string;
  borderRadius?: string;
  fontSize?: string;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  leftIcon,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  width,
  height,
  padding,
  borderRadius,
  fontSize,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{
        ...(width && { width }),
        ...(height && { height }),
        ...(padding && { padding }),
        ...(borderRadius && { borderRadius }),
        ...(fontSize && { fontSize }),
      }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-sans font-semibold transition-colors duration-200 cursor-pointer",
        !height && "h-12",
        !padding && "px-5",
        !borderRadius && "rounded-full",
        !fontSize && "text-base",
        variant === "primary"
          ? "bg-[#D89593] text-white hover:bg-[#C27E7A] border-0"
          : "bg-transparent text-[#D89593] border-2 border-[#D89593] hover:bg-[#D89593]/10",
        !isDisabled && "active:scale-[.98]",
        isDisabled && "opacity-60 cursor-not-allowed",
        className,
      )}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          aria-label={BUTTON_SPINNER_ARIA}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {!loading && leftIcon && (
        <span className="shrink-0 inline-flex">{leftIcon}</span>
      )}
      {children}
    </button>
  );
}

"use client";

import {
  Image,
  Link,
  googleIconPng,
  COVER_IMAGE_ALT,
  LOGO_ALT,
  LOGO_WIDTH,
  LOGO_HEIGHT,
  GOOGLE_ICON_ALT,
  GOOGLE_ICON_SIZE,
  BACK_BUTTON_TEXT,
  BACK_HREF,
  CONTINUE_WITH_GOOGLE_TEXT,
} from "./import";
import type { StaticImageData } from "./import";

interface FooterLink {
  href: string;
  label: string;
}

interface OnboardingLayoutProps {
  heading: string;
  description: string;
  coverImage: StaticImageData | string;
  logo?: StaticImageData | string;
  children: React.ReactNode;
  footerText?: string;
  footerLink?: FooterLink;
  showGoogleButton?: boolean;
  showBackButton?: boolean;
  onGoogleSignIn?: () => void;
}

export function OnboardingLayout({
  heading,
  description,
  coverImage,
  logo,
  children,
  footerText,
  footerLink,
  showGoogleButton = true,
  showBackButton = false,
  onGoogleSignIn,
}: OnboardingLayoutProps) {
  return (
    <div className="flex flex-1 xl:h-full">
      {/* ── Left: cover image ── */}
      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src={coverImage}
          alt={COVER_IMAGE_ALT}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ── Right: form panel ── */}
      <div className="flex flex-1 justify-center bg-white px-6 py-8 lg:px-8 xl:px-16">
        <div className="w-full max-w-140 flex flex-col">
          {showBackButton && (
            <Link
              href={BACK_HREF}
              className="
                inline-flex items-center w-fit px-4 py-2
                border-2 border-[#999999] rounded-full
                font-sans text-sm font-medium text-[#999999]
                hover:bg-gray-50 transition-colors
              "
            >
              {BACK_BUTTON_TEXT}
            </Link>
          )}

          <div className="flex-1 flex flex-col justify-center">
            {/* Logo */}
            {logo && (
              <Link href={process.env.NEXT_PUBLIC_BASE_URL || ''}>
              <div className="mb-19">
                <Image
                  src={logo}
                  alt={LOGO_ALT}
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                />
              </div>
              </Link>
            )}

            {/* Heading */}
            <h1 className="font-display text-[50px] leading-9.5 font-normal text-[#101010] mb-6.25">
              {heading}
            </h1>

            {/* Description */}
            <p className="font-sans text-base font-normal text-[#101010] mb-15">
              {description}
            </p>

            {/* Form Content */}
            <div className="flex flex-col gap-6">
              {children}

              {/* Google Button */}
              {showGoogleButton && (
                <button
                  type="button"
                  onClick={onGoogleSignIn}
                  className="
                    font-sans text-lg font-medium w-full h-15 flex items-center justify-center gap-3
                    rounded-full border-2 border-[#0A0A0A] bg-white py-3 text-[#0A0A0A]
                    transition-all active:scale-[.98]
                  "
                >
                  <Image
                    src={googleIconPng}
                    alt={GOOGLE_ICON_ALT}
                    width={GOOGLE_ICON_SIZE}
                    height={GOOGLE_ICON_SIZE}
                    className="shrink-0"
                  />
                  {CONTINUE_WITH_GOOGLE_TEXT}
                </button>
              )}

              {/* Footer Text with Link */}
              {footerText && footerLink && (
                <p className="font-sans text-[22px] font-normal text-black mt-15 w-full text-center">
                  {footerText}{" "}
                  <Link
                    href={footerLink.href}
                    className="font-medium text-[#D89593] underline-offset-2 hover:underline transition-colors"
                  >
                    {footerLink.label}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

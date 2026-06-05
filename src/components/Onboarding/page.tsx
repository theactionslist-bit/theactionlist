"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import googleIconPng from "@/assets/GoogleIcon.png";

interface FooterLink {
  href: string;
  label: string;
}

interface OnboardingLayoutProps {
  heading: string;
  description: string;
  coverImage: StaticImageData | string;
  logo: StaticImageData | string;
  children: React.ReactNode;
  footerText?: string;
  footerLink?: FooterLink;
  showGoogleButton?: boolean;
  showBackButton?: boolean;
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
}: OnboardingLayoutProps) {
  return (
    <div className="flex flex-1 min-h-screen">
      {/* ── Left: cover image ── */}
      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src={coverImage}
          alt="The Action List — get things done"
          fill
          className="object-cover"
          preload={true}
        />
      </div>

      {/* ── Right: form panel ── */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-8 lg:px-8 xl:px-16">

        <div className="w-full max-w-[560px]">
          {showBackButton && (
            <Link
              href="/login"
              className="
                inline-flex items-center w-fit px-4 py-2
                border-2 border-[#999999] rounded-full
                font-sans text-sm font-medium text-[#999999]
                hover:bg-gray-50 transition-colors
              "
            >
              &lt; Back
            </Link>
          )}
          {/* Logo */}
          <div className="mb-10">
            <Image
              src={logo}
              alt="The Action List"
              width={272}
              height={61}
            />
          </div>

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
                className="
                  font-sans text-lg font-medium w-full h-15 flex items-center justify-center gap-3
                  rounded-full border-2 border-[#0A0A0A] bg-white py-3 text-[#0A0A0A]
                  transition-all active:scale-[.98]
                "
              >
                <Image
                  src={googleIconPng}
                  alt="Google"
                  width={30}
                  height={30}
                  className="shrink-0"
                />
                Continue with Google
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
  );
}

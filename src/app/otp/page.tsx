"use client";

import { useRef, useState } from "react";
import loginCover from "@/assets/LoginPage/Login_page.png";
import logoPng from "@/assets/Logo.png";
import { OnboardingLayout } from "@/components/Onboarding/page";

export default function OTPPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleOtpChange = (index: number, value: string): void => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;

    setIsSubmitting(true);
    try {
      console.log("Verifying OTP:", otpValue);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    setResendLoading(true);
    try {
      console.log("Resending OTP");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <OnboardingLayout
      heading="Check Your Inbox"
      description="We've sent a verification code to your email to continue your journey."
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={false}
      showBackButton={true}
    >
      <form onSubmit={handleVerify} className="flex flex-col gap-6">

        {/* OTP Input Fields */}
        <div className="flex gap-2 sm:gap-3 xl:gap-4 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="
                w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-17 xl:h-17
                text-center font-semibold text-lg
                rounded-lg border border-[#DBDBDB]
                focus:border-[#D89593] focus:outline-none
                focus:bg-white
                transition-all
              "
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={isSubmitting || otp.join("").length !== 6}
          className="
            font-sans text-lg font-semibold w-full h-15 rounded-full bg-[#D89593] py-3 text-white
            transition-all hover:bg-[#c07c79] active:scale-[.98]
            focus:outline-none focus:ring-4 focus:ring-gray-900/20
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {isSubmitting ? "Verifying…" : "Verify"}
        </button>

        {/* Resend OTP */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendLoading}
            className="
              font-sans text-base font-semibold text-[#C27E7A]
              hover:underline transition-colors
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {resendLoading ? "Sending…" : "Resend OTP"}
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}

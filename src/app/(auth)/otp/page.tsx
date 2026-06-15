"use client";

import {
  useState,
  useRef,
  useRouter,
  useSearchParams,
  loginCover,
  logoPng,
  OnboardingLayout,
  Button,
  Suspense,
  OTP_LENGTH,
  OTP_HEADING,
  OTP_DESCRIPTION,
  OTP_VERIFY_TEXT,
  OTP_VERIFYING_TEXT,
  OTP_RESEND_TEXT,
  OTP_RESENDING_TEXT,
  OTP_ERROR_CLASS,
  handleVerifyOtp,
  handleResendSignupOtp,
} from "./import";

function OTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const name = searchParams.get("name") ?? "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (index: number, value: string): void => {
    if (!/^\d*$/.test(value)) return;
    setError("");

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
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
    if (otpValue.length !== OTP_LENGTH) return;

    setIsSubmitting(true);
    await handleVerifyOtp(email, otpValue, name, setError, router);
    setIsSubmitting(false);
  };

  const handleResendOtp = async (): Promise<void> => {
    setResendLoading(true);
    await handleResendSignupOtp(
      email,
      () => {
        setOtp(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
      },
      setError
    );
    setResendLoading(false);
  };

  return (
    <OnboardingLayout
      heading={OTP_HEADING}
      description={OTP_DESCRIPTION}
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={false}
      showBackButton={true}
    >
      <form onSubmit={handleVerify} className="flex flex-col gap-6">
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

        {error && <p className={OTP_ERROR_CLASS}>{error}</p>}

        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={otp.join("").length !== OTP_LENGTH}
          className="w-full h-15 text-lg!"
        >
          {isSubmitting ? OTP_VERIFYING_TEXT : OTP_VERIFY_TEXT}
        </Button>

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
            {resendLoading ? OTP_RESENDING_TEXT : OTP_RESEND_TEXT}
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}

export default function OTPPage() {
  return (
    <Suspense>
      <OTPContent />
    </Suspense>
  );
}

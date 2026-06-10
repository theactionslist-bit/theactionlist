import { OTP_SUCCESS_REDIRECT } from "./constant";
import { verifySignupOtp, resendSignupOtp } from "./service";

interface OtpRouter {
  push: (url: string) => void;
  refresh: () => void;
}

export async function handleVerifyOtp(
  email: string,
  otp: string,
  name: string,
  setError: (msg: string) => void,
  router: OtpRouter
) {
  const { error } = await verifySignupOtp(email, otp);
  if (error) {
    setError(error.message);
    return;
  }
  const params = new URLSearchParams({ email, name });
  router.push(`${OTP_SUCCESS_REDIRECT}?${params.toString()}`);
}

export async function handleResendSignupOtp(
  email: string,
  onSuccess: () => void,
  setError: (msg: string) => void
) {
  const { error } = await resendSignupOtp(email);
  if (error) {
    setError(error.message);
    return;
  }
  onSuccess();
}

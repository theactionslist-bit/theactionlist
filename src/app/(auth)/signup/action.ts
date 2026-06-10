import type { FormikHelpers } from "formik";
import { SIGNUP_EMAIL_EXISTS_ERROR, SIGNUP_OTP_PATH } from "./constant";
import { checkEmailExists, sendSignupOtp } from "./service";

interface SignupValues {
  name: string;
  email: string;
}

interface SignupRouter {
  push: (url: string) => void;
}

export async function handleSignupSubmit(
  values: SignupValues,
  {
    setSubmitting,
    setStatus,
  }: Pick<FormikHelpers<SignupValues>, "setSubmitting" | "setStatus">,
  router: SignupRouter
) {
  const { data: exists, error: existsError } = await checkEmailExists(values.email);
  if (existsError) {
    setStatus(existsError.message);
    setSubmitting(false);
    return;
  }
  if (exists === true) {
    setStatus(SIGNUP_EMAIL_EXISTS_ERROR);
    setSubmitting(false);
    return;
  }
  const { error: otpError } = await sendSignupOtp(values.email);
  if (otpError) {
    setStatus(otpError.message);
    setSubmitting(false);
    return;
  }
  const params = new URLSearchParams({ email: values.email, name: values.name });
  router.push(`${SIGNUP_OTP_PATH}?${params.toString()}`);
}

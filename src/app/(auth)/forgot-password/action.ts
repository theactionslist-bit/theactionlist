import type { FormikHelpers } from "formik";
import {
  FORGOT_PASSWORD_AUTH_CALLBACK_PATH,
  FORGOT_PASSWORD_RESET_PATH,
} from "./constant";
import { sendPasswordResetEmail } from "./service";

interface ForgotPasswordValues {
  email: string;
}

export async function handleForgotPasswordSubmit(
  values: ForgotPasswordValues,
  { setSubmitting, setStatus }: Pick<
    FormikHelpers<ForgotPasswordValues>,
    "setSubmitting" | "setStatus"
  >,
  onSuccess: () => void
) {
  const redirectTo = `${window.location.origin}${FORGOT_PASSWORD_AUTH_CALLBACK_PATH}?next=${FORGOT_PASSWORD_RESET_PATH}`;
  const { error } = await sendPasswordResetEmail(values.email, redirectTo);
  if (error) {
    setStatus(error.message);
    setSubmitting(false);
    return;
  }
  setSubmitting(false);
  onSuccess();
}

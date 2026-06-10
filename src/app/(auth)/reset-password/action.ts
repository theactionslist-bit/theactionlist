import type { FormikHelpers } from "formik";
import { RESET_PASSWORD_SUCCESS_REDIRECT } from "./constant";
import { updatePassword } from "./service";

interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

interface ResetRouter {
  push: (url: string) => void;
  refresh: () => void;
}

export async function handleResetPasswordSubmit(
  values: ResetPasswordValues,
  { setSubmitting, setStatus }: Pick<
    FormikHelpers<ResetPasswordValues>,
    "setSubmitting" | "setStatus"
  >,
  router: ResetRouter
) {
  const { error } = await updatePassword(values.password);
  if (error) {
    setStatus(error.message);
    setSubmitting(false);
    return;
  }
  router.push(RESET_PASSWORD_SUCCESS_REDIRECT);
  router.refresh();
}

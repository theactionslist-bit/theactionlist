import type { FormikHelpers } from "formik";
import { SETTINGS_SUCCESS_MESSAGE } from "./constant";
import { changeAdminPassword } from "./service";

interface PasswordValues {
  newPassword: string;
  confirmPassword: string;
}

type ToastFn = (message: string, variant?: "success" | "error", duration?: number) => void;

export async function handleChangePassword(
  values: PasswordValues,
  { setSubmitting, setStatus, resetForm }: Pick<FormikHelpers<PasswordValues>, "setSubmitting" | "setStatus" | "resetForm">,
  addToast: ToastFn,
) {
  const { error } = await changeAdminPassword(values.newPassword);

  if (error) {
    setStatus(error.message);
    setSubmitting(false);
    return;
  }

  setSubmitting(false);
  resetForm();
  addToast(SETTINGS_SUCCESS_MESSAGE, "success");
}

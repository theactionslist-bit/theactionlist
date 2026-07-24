import type { FormikHelpers } from "formik";
import { ADMIN_LOGIN_SUCCESS_REDIRECT } from "./constant";
import { signInAsAdmin } from "./service";

interface AdminLoginValues {
  email: string;
  password: string;
}

interface AdminLoginRouter {
  push: (url: string) => void;
  refresh: () => void;
}

export async function handleAdminLoginSubmit(
  values: AdminLoginValues,
  { setSubmitting, setStatus }: Pick<FormikHelpers<AdminLoginValues>, "setSubmitting" | "setStatus">,
  router: AdminLoginRouter,
  onBeforeRedirect?: () => void
) {
  const { error } = await signInAsAdmin(values.email, values.password);
  if (error) {
    setStatus(error);
    setSubmitting(false);
    return;
  }
  onBeforeRedirect?.();
  router.push(ADMIN_LOGIN_SUCCESS_REDIRECT);
}

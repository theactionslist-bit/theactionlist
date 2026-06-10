import type { FormikHelpers } from "formik";
import { LOGIN_SUCCESS_REDIRECT } from "./constant";
import { signInWithEmail, signInWithGoogle } from "./service";

interface LoginValues {
  email: string;
  password: string;
}

interface LoginRouter {
  push: (url: string) => void;
  refresh: () => void;
}

export async function handleLoginSubmit(
  values: LoginValues,
  {
    setSubmitting,
    setStatus,
  }: Pick<FormikHelpers<LoginValues>, "setSubmitting" | "setStatus">,
  router: LoginRouter
) {
  const { error } = await signInWithEmail(values.email, values.password);
  if (error) {
    setStatus(error.message);
    setSubmitting(false);
    return;
  }
  router.push(LOGIN_SUCCESS_REDIRECT);
  router.refresh();
}

export async function handleGoogleSignIn(redirectTo: string) {
  await signInWithGoogle(redirectTo);
}

import type { FormikHelpers } from "formik";
import { CREATE_PASSWORD_SUCCESS_REDIRECT } from "./constant";
import { createUserWithPassword } from "./service";

interface CreatePasswordValues {
  password: string;
  confirmPassword: string;
}

interface CreatePasswordRouter {
  push: (url: string) => void;
  refresh: () => void;
}

export async function handleCreatePasswordSubmit(
  values: CreatePasswordValues,
  {
    setSubmitting,
    setStatus,
  }: Pick<FormikHelpers<CreatePasswordValues>, "setSubmitting" | "setStatus">,
  email: string,
  name: string,
  router: CreatePasswordRouter
) {
  const { error } = await createUserWithPassword(email, values.password, name);
  if (error) {
    setStatus(error.message);
    setSubmitting(false);
    return;
  }
  router.push(CREATE_PASSWORD_SUCCESS_REDIRECT);
  router.refresh();
}

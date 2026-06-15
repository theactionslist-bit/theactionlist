import type { FormikHelpers } from "formik";
import type { User } from "@supabase/supabase-js";
import { updateProfile, changePassword, logoutUser } from "./service";

interface ProfileValues {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfileRouter {
  push: (url: string) => void;
  refresh: () => void;
}

export async function handleProfileUpdate(
  values: ProfileValues,
  { setSubmitting, setStatus }: Pick<
    FormikHelpers<ProfileValues>,
    "setSubmitting" | "setStatus"
  >,
  setUser: (u: User) => void,
  onSuccess: () => void
) {
  const { data, error } = await updateProfile(values.name, values.email);
  if (error) {
    setStatus(error.message);
    setSubmitting(false);
    return;
  }

  if (values.newPassword) {
    const { error: pwErr } = await changePassword(values.newPassword);
    if (pwErr) {
      setStatus(pwErr.message);
      setSubmitting(false);
      return;
    }
  }

  if (data.user) setUser(data.user);
  setSubmitting(false);
  onSuccess();
}

export async function handleLogout(router: ProfileRouter) {
  await logoutUser();
  router.push("/login");
  router.refresh();
}

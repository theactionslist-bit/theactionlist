import * as Yup from "yup";

export { useState, useEffect, Formik, Form } from "@/common/imports";
export type { FormikHelpers } from "@/common/imports";
export { Button, FormikControl } from "@/common/components";
export { useToast } from "@/context/ToastContext";
export {
  SETTINGS_HEADING,
  SETTINGS_DESCRIPTION,
  SETTINGS_ACCOUNT_HEADING,
  SETTINGS_EMAIL_LABEL,
  SETTINGS_PASSWORD_HEADING,
  SETTINGS_PASSWORD_DESCRIPTION,
  SETTINGS_NEW_PASSWORD_LABEL,
  SETTINGS_CONFIRM_PASSWORD_LABEL,
  SETTINGS_SUBMIT_TEXT,
  SETTINGS_SUBMITTING_TEXT,
  SETTINGS_ERROR_CLASS,
  SETTINGS_INITIAL_VALUES,
} from "./constant";
export { fetchAdminUser } from "./service";
export { handleChangePassword } from "./action";

export const SETTINGS_PASSWORD_VALIDATION_SCHEMA = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});

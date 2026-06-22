import * as Yup from "yup";

export { Formik, Form, useRouter } from "@/common/imports";
export type { FormikHelpers } from "@/common/imports";
export { Button, FormikControl, loginCover, OnboardingLayout } from "@/common/components";
export {
  RESET_PASSWORD_HEADING,
  RESET_PASSWORD_DESCRIPTION,
  RESET_PASSWORD_BUTTON_TEXT,
  RESET_PASSWORD_SUBMITTING_TEXT,
  RESET_PASSWORD_INITIAL_VALUES,
  RESET_PASSWORD_FIELDS,
  RESET_PASSWORD_ERROR_CLASS,
} from "./constant";
export { handleResetPasswordSubmit } from "./action";

export const RESET_PASSWORD_VALIDATION_SCHEMA = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

import * as Yup from "yup";

export { Formik, Form } from "formik";
export type { FormikHelpers } from "formik";
export { default as loginCover } from "@/assets/LoginPage/Login_page.png";
export { default as logoPng } from "@/assets/Logo.png";
export { default as FormikControl } from "@/components/FormikControl/page";
export { OnboardingLayout } from "@/components/Onboarding/page";
export {
  FORGOT_PASSWORD_HEADING,
  FORGOT_PASSWORD_DESCRIPTION,
  FORGOT_PASSWORD_BUTTON_TEXT,
  FORGOT_PASSWORD_SUBMITTING_TEXT,
  FORGOT_PASSWORD_INITIAL_VALUES,
  FORGOT_PASSWORD_FIELDS,
} from "./constant";

export const FORGOT_PASSWORD_VALIDATION_SCHEMA = Yup.object({
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

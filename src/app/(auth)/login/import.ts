import * as Yup from "yup";

export { Formik, Form, Link } from "@/common/imports";
export type { FormikHelpers } from "@/common/imports";
export { Button, FormikControl, loginCover, logoPng, OnboardingLayout } from "@/common/components";
export {
  LOGIN_HEADING,
  LOGIN_DESCRIPTION,
  LOGIN_BUTTON_TEXT,
  LOGIN_SUBMITTING_TEXT,
  LOGIN_FORGOT_PASSWORD_TEXT,
  LOGIN_FORGOT_PASSWORD_HREF,
  LOGIN_FOOTER_TEXT,
  LOGIN_FOOTER_LINK,
  LOGIN_INITIAL_VALUES,
  LOGIN_FIELDS,
} from "./constant";

export const LOGIN_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

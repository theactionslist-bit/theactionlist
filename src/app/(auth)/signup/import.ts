import * as Yup from "yup";

export { Formik, Form, useRouter } from "@/common/imports";
export type { FormikHelpers } from "@/common/imports";
export { Button, FormikControl, loginCover, logoPng, OnboardingLayout } from "@/common/components";
export {
  SIGNUP_HEADING,
  SIGNUP_DESCRIPTION,
  SIGNUP_BUTTON_TEXT,
  SIGNUP_SUBMITTING_TEXT,
  SIGNUP_FOOTER_TEXT,
  SIGNUP_FOOTER_LINK,
  SIGNUP_INITIAL_VALUES,
  SIGNUP_FIELDS,
  SIGNUP_EMAIL_EXISTS_ERROR,
  SIGNUP_OTP_PATH,
  SIGNUP_ERROR_CLASS,
} from "./constant";
export { handleSignupSubmit } from "./action";

export const SIGNUP_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
});

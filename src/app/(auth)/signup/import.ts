import * as Yup from "yup";

export { Formik, Form } from "@/common/imports";
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
} from "./constant";

export const SIGNUP_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
});

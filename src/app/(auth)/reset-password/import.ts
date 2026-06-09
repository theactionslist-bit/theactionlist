import * as Yup from "yup";

export { Formik, Form } from "@/common/imports";
export type { FormikHelpers } from "@/common/imports";
export { Button, FormikControl, loginCover, logoPng, OnboardingLayout } from "@/common/components";
export {
  RESET_PASSWORD_HEADING,
  RESET_PASSWORD_DESCRIPTION,
  RESET_PASSWORD_BUTTON_TEXT,
  RESET_PASSWORD_SUBMITTING_TEXT,
  RESET_PASSWORD_FOOTER_TEXT,
  RESET_PASSWORD_FOOTER_LINK,
  RESET_PASSWORD_INITIAL_VALUES,
  RESET_PASSWORD_FIELDS,
} from "./constant";

export const RESET_PASSWORD_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
});

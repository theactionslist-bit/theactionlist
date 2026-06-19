import * as Yup from "yup";

export { Formik, Form } from "@/common/imports";
export type { FormikHelpers } from "@/common/imports";
export { Button, FormikControl, loginCover, logoPng, OnboardingLayout } from "@/common/components";
export { useToast } from "@/context/ToastContext";
export {
  FORGOT_PASSWORD_HEADING,
  FORGOT_PASSWORD_DESCRIPTION,
  FORGOT_PASSWORD_BUTTON_TEXT,
  FORGOT_PASSWORD_SUBMITTING_TEXT,
  FORGOT_PASSWORD_SUCCESS_MESSAGE,
  FORGOT_PASSWORD_INITIAL_VALUES,
  FORGOT_PASSWORD_FIELDS,
  FORGOT_PASSWORD_ERROR_CLASS,
  FORGOT_PASSWORD_FOOTER_TEXT,
  FORGOT_PASSWORD_FOOTER_LINK_LABEL,
  FORGOT_PASSWORD_FOOTER_LINK_HREF,
} from "./constant";
export { handleForgotPasswordSubmit } from "./action";

export const FORGOT_PASSWORD_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

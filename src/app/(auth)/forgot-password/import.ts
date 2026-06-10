import * as Yup from "yup";

export { Formik, Form, useState } from "@/common/imports";
export type { FormikHelpers } from "@/common/imports";
export { Button, FormikControl, loginCover, logoPng, OnboardingLayout } from "@/common/components";
export {
  FORGOT_PASSWORD_HEADING,
  FORGOT_PASSWORD_DESCRIPTION,
  FORGOT_PASSWORD_BUTTON_TEXT,
  FORGOT_PASSWORD_SUBMITTING_TEXT,
  FORGOT_PASSWORD_SUCCESS_MESSAGE,
  FORGOT_PASSWORD_INITIAL_VALUES,
  FORGOT_PASSWORD_FIELDS,
  FORGOT_PASSWORD_ERROR_CLASS,
  FORGOT_PASSWORD_SUCCESS_CLASS,
} from "./constant";
export { handleForgotPasswordSubmit } from "./action";

export const FORGOT_PASSWORD_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

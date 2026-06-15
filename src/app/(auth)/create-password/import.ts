import * as Yup from "yup";

export { Formik, Form, useRouter, Suspense } from "@/common/imports";
export { useSearchParams } from "next/navigation";
export type { FormikHelpers } from "@/common/imports";
export { Button, FormikControl, loginCover, logoPng, OnboardingLayout } from "@/common/components";
export {
  CREATE_PASSWORD_HEADING,
  CREATE_PASSWORD_DESCRIPTION,
  CREATE_PASSWORD_BUTTON_TEXT,
  CREATE_PASSWORD_SUBMITTING_TEXT,
  CREATE_PASSWORD_INITIAL_VALUES,
  CREATE_PASSWORD_FIELDS,
  CREATE_PASSWORD_ERROR_CLASS,
} from "./constant";
export { handleCreatePasswordSubmit } from "./action";

export const CREATE_PASSWORD_VALIDATION_SCHEMA = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

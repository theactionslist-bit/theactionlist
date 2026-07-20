import * as Yup from "yup";

export { Formik, Form, Image, useRouter, useRef } from "@/common/imports";
export type { FormikHelpers } from "@/common/imports";
export { Button, FormikControl } from "@/common/components";
export { default as AdminHeader } from "@/components/admin/Header/page";
export {
  ADMIN_LOGIN_HEADING,
  ADMIN_LOGIN_DESCRIPTION,
  ADMIN_LOGIN_BUTTON_TEXT,
  ADMIN_LOGIN_SUBMITTING_TEXT,
  ADMIN_LOGIN_INITIAL_VALUES,
  ADMIN_LOGIN_FIELDS,
  ADMIN_LOGIN_ERROR_CLASS,
} from "./constant";
export { handleAdminLoginSubmit } from "./action";

export const ADMIN_LOGIN_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string().email("Please enter a valid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

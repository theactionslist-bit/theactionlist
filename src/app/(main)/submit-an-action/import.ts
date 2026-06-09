import * as Yup from "yup";

export { Formik, Form } from "@/common/imports";
export type { FormikHelpers } from "@/common/imports";
export { BannerSection, FormikControl, Button } from "@/common/components";
export { default as BannerImage } from "@/assets/submit-an-action.jpg";
export {
  SUBMIT_ACTIONS_BANNER_HEADING,
  SUBMIT_FORM_SECTION_1,
  SUBMIT_FORM_SECTION_2,
  SUBMIT_FORM_SECTION_3,
  SUBMIT_FORM_BUTTON_TEXT,
  SUBMIT_FORM_SUBMITTING_TEXT,
  SUBMIT_FORM_INITIAL_VALUES,
  SUBMIT_FORM_TOP_FIELDS,
  SUBMIT_FORM_HELPS_WITH_FIELD,
  SUBMIT_FORM_HOW_IT_WORKS_PLACEHOLDER,
  SUBMIT_FORM_ANYTHING_ELSE_PLACEHOLDER,
} from "./constant";

export const SUBMIT_FORM_VALIDATION_SCHEMA = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  helpsWith: Yup.string().required("Please describe what your action helps with"),
  howItWorks: Yup.string().required("Please describe how it works"),
  anythingElse: Yup.string(),
});

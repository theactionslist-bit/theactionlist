import * as Yup from "yup";

export { useState, useEffect, Link, Image, Formik, Form } from "@/common/imports";
export { useRouter } from "@/common/imports";
export type { FormikHelpers } from "@/common/imports";
export type { User } from "@supabase/supabase-js";
export { Button, FormikControl } from "@/common/components";

export { default as ProfileNameIcon } from "@/assets/MyProfile/ProfileName.svg";
export { default as ProfileEmailIcon } from "@/assets/MyProfile/ProfileEmail.svg";
export { default as ProfilePasswordIcon } from "@/assets/MyProfile/ProfilePassword.svg";
export { default as CancelIcon } from "@/assets/MyProfile/CancelIcon.svg";
export { default as LogoutIcon } from "@/assets/MyProfile/LogoutIcon.svg";
export { default as UpdateIcon } from "@/assets/MyProfile/UpdateIcon.svg";
export { default as EditIcon } from "@/assets/MyProfile/EditIcon.svg";

export { default as passwordEye } from "@/assets/passwordEye.png";
export { default as passwordHideEye } from "@/assets/passwordhideEye.png";

export { fetchUser } from "./service";
export { handleProfileUpdate, handleLogout } from "./action";

export {
  PROFILE_PAGE_HEADING,
  PROFILE_PAGE_SUBTITLE,
  EDIT_PAGE_HEADING,
  EDIT_PAGE_SUBTITLE,
  PROFILE_BACK_TEXT,
  PROFILE_EDIT_TEXT,
  PROFILE_LOGOUT_TEXT,
  PROFILE_CANCEL_TEXT,
  PROFILE_UPDATE_TEXT,
  PROFILE_UPDATING_TEXT,
  PROFILE_NAME_LABEL,
  PROFILE_EMAIL_LABEL,
  PROFILE_PASSWORD_LABEL,
  PROFILE_MOCK_PASSWORD_DISPLAY,
  PROFILE_NEW_PASSWORD_PLACEHOLDER,
  PROFILE_CONFIRM_PASSWORD_PLACEHOLDER,
  PROFILE_SHOW_PASSWORD_ARIA,
  PROFILE_HIDE_PASSWORD_ARIA,
  PROFILE_EYE_SIZE,
  PROFILE_ERROR_CLASS,
} from "./constant";

export const PROFILE_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  newPassword: Yup.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "Passwords must match"
  ),
});

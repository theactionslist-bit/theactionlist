export const RESET_PASSWORD_HEADING = "Set New Password";
export const RESET_PASSWORD_DESCRIPTION = "Enter your new password below.";
export const RESET_PASSWORD_BUTTON_TEXT = "Update Password";
export const RESET_PASSWORD_SUBMITTING_TEXT = "Updating…";
export const RESET_PASSWORD_INITIAL_VALUES = { password: "", confirmPassword: "" };
export const RESET_PASSWORD_FIELDS = [
  {
    control: "input" as const,
    type: "password",
    label: "New Password",
    name: "password",
    autoComplete: "new-password",
  },
  {
    control: "input" as const,
    type: "password",
    label: "Confirm Password",
    name: "confirmPassword",
    autoComplete: "new-password",
  },
];
export const RESET_PASSWORD_SUCCESS_REDIRECT = "/";
export const RESET_PASSWORD_ERROR_CLASS = "text-sm font-medium text-red-600";

export const CREATE_PASSWORD_HEADING = "You're Almost In";
export const CREATE_PASSWORD_DESCRIPTION = "Set your password to begin exploring thoughtful actions.";
export const CREATE_PASSWORD_BUTTON_TEXT = "Submit";
export const CREATE_PASSWORD_SUBMITTING_TEXT = "Submitting…";
export const CREATE_PASSWORD_INITIAL_VALUES = { password: "", confirmPassword: "" };
export const CREATE_PASSWORD_FIELDS = [
  {
    control: "input" as const,
    type: "password",
    label: "Password",
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
export const CREATE_PASSWORD_SUCCESS_REDIRECT = "/";
export const CREATE_PASSWORD_ERROR_CLASS = "text-sm font-medium text-red-600";

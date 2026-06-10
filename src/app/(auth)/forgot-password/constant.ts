export const FORGOT_PASSWORD_HEADING = "You're Almost In";
export const FORGOT_PASSWORD_DESCRIPTION = "Set your password to begin exploring thoughtful actions.";
export const FORGOT_PASSWORD_BUTTON_TEXT = "Submit";
export const FORGOT_PASSWORD_SUBMITTING_TEXT = "Submitting…";
export const FORGOT_PASSWORD_INITIAL_VALUES = { password: "", confirmPassword: "" };
export const FORGOT_PASSWORD_FIELDS = [
  { control: "input" as const, type: "password", label: "Password", name: "password", autoComplete: "new-password" },
  { control: "input" as const, type: "password", label: "Confirm Password", name: "confirmPassword", autoComplete: "new-password" },
];

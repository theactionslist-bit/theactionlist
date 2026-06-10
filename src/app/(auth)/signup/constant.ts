export const SIGNUP_HEADING = "Join The Actions List";
export const SIGNUP_DESCRIPTION = "A curated space for calmer days and meaningful living.";
export const SIGNUP_BUTTON_TEXT = "Submit";
export const SIGNUP_SUBMITTING_TEXT = "Submitting…";
export const SIGNUP_FOOTER_TEXT = "Already have an account?";
export const SIGNUP_FOOTER_LINK = { href: "/login", label: "Login" };
export const SIGNUP_INITIAL_VALUES = { name: "", email: "" };
export const SIGNUP_FIELDS = [
  { control: "input" as const, type: "text", label: "Name", name: "name", autoComplete: "name" },
  { control: "input" as const, type: "email", label: "Email", name: "email", autoComplete: "email" },
];

export const SIGNUP_EMAIL_EXISTS_ERROR =
  "An account with this email already exists. Please log in instead.";
export const SIGNUP_OTP_PATH = "/otp";
export const SIGNUP_ERROR_CLASS = "text-sm font-medium text-red-600";

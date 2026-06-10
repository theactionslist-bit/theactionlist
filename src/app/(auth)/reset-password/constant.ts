export const RESET_PASSWORD_HEADING = "Join The Actions List";
export const RESET_PASSWORD_DESCRIPTION = "A curated space for calmer days and meaningful living.";
export const RESET_PASSWORD_BUTTON_TEXT = "Submit";
export const RESET_PASSWORD_SUBMITTING_TEXT = "Submitting…";
export const RESET_PASSWORD_FOOTER_TEXT = "Already have an account?";
export const RESET_PASSWORD_FOOTER_LINK = { href: "/login", label: "Login" };
export const RESET_PASSWORD_INITIAL_VALUES = { email: "" };
export const RESET_PASSWORD_FIELDS = [
  { control: "input" as const, type: "email", label: "Email", name: "email", autoComplete: "email" },
];

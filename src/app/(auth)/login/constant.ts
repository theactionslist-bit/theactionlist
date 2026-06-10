export const LOGIN_HEADING = "Welcome back!";
export const LOGIN_DESCRIPTION = "For a life well-lived. Not just well-optimised.";
export const LOGIN_BUTTON_TEXT = "Log in";
export const LOGIN_SUBMITTING_TEXT = "Logging in…";
export const LOGIN_FORGOT_PASSWORD_TEXT = "Forgot Password?";
export const LOGIN_FORGOT_PASSWORD_HREF = "/forgot-password";
export const LOGIN_FOOTER_TEXT = "Don't have an account?";
export const LOGIN_FOOTER_LINK = { href: "/signup", label: "Sign Up" };
export const LOGIN_INITIAL_VALUES = { email: "", password: "" };
export const LOGIN_FIELDS = [
  { control: "input" as const, type: "email", label: "Email", name: "email", autoComplete: "email" },
  { control: "input" as const, type: "password", label: "Password", name: "password", autoComplete: "current-password" },
];

export const LOGIN_SUCCESS_REDIRECT = "/";
export const LOGIN_AUTH_CALLBACK_PATH = "/auth/callback";
export const LOGIN_ERROR_CLASS = "text-sm font-medium text-red-600";

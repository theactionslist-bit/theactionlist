export const ADMIN_LOGIN_HEADING = "Admin Login";
export const ADMIN_LOGIN_DESCRIPTION = "Sign in to manage The Action List.";
export const ADMIN_LOGIN_BUTTON_TEXT = "Log in";
export const ADMIN_LOGIN_SUBMITTING_TEXT = "Logging in…";

export const ADMIN_LOGIN_INITIAL_VALUES = { email: "", password: "" };

export const ADMIN_LOGIN_FIELDS = [
  { control: "input" as const, type: "email", label: "Email", name: "email", autoComplete: "email" },
  { control: "input" as const, type: "password", label: "Password", name: "password", autoComplete: "current-password" },
];

export const ADMIN_LOGIN_SUCCESS_REDIRECT = "/admin";
export const ADMIN_LOGIN_ERROR_CLASS = "text-sm font-medium text-red-600";
export const ADMIN_LOGIN_UNAUTHORIZED_MESSAGE = "You are not authorized to access the admin panel.";

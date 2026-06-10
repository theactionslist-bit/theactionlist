export const FORGOT_PASSWORD_HEADING = "Forgot Password?";
export const FORGOT_PASSWORD_DESCRIPTION = "Enter your email and we'll send you a reset link.";
export const FORGOT_PASSWORD_BUTTON_TEXT = "Send Reset Link";
export const FORGOT_PASSWORD_SUBMITTING_TEXT = "Sending…";
export const FORGOT_PASSWORD_SUCCESS_MESSAGE =
  "Check your inbox — we've sent a password reset link to your email.";
export const FORGOT_PASSWORD_INITIAL_VALUES = { email: "" };
export const FORGOT_PASSWORD_FIELDS = [
  {
    control: "input" as const,
    type: "email",
    label: "Email",
    name: "email",
    autoComplete: "email",
  },
];
export const FORGOT_PASSWORD_ERROR_CLASS = "text-sm font-medium text-red-600";
export const FORGOT_PASSWORD_SUCCESS_CLASS = "text-sm font-medium text-green-600";
export const FORGOT_PASSWORD_AUTH_CALLBACK_PATH = "/auth/callback";
export const FORGOT_PASSWORD_RESET_PATH = "/reset-password";

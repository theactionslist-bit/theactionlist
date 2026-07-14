"use client";

import {
  useState,
  useEffect,
  Formik,
  Form,
  Button,
  FormikControl,
  useToast,
  SETTINGS_HEADING,
  SETTINGS_DESCRIPTION,
  SETTINGS_ACCOUNT_HEADING,
  SETTINGS_EMAIL_LABEL,
  SETTINGS_PASSWORD_HEADING,
  SETTINGS_PASSWORD_DESCRIPTION,
  SETTINGS_NEW_PASSWORD_LABEL,
  SETTINGS_CONFIRM_PASSWORD_LABEL,
  SETTINGS_SUBMIT_TEXT,
  SETTINGS_SUBMITTING_TEXT,
  SETTINGS_ERROR_CLASS,
  SETTINGS_INITIAL_VALUES,
  SETTINGS_PASSWORD_VALIDATION_SCHEMA,
  fetchAdminUser,
  handleChangePassword,
} from "./import";
import type { FormikHelpers } from "./import";

interface PasswordValues {
  newPassword: string;
  confirmPassword: string;
}

export default function AdminSettingsPage() {
  const { addToast } = useToast();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  function handleSubmit(values: PasswordValues, helpers: FormikHelpers<PasswordValues>) {
    handleChangePassword(values, helpers, addToast);
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-normal text-[#101010]">{SETTINGS_HEADING}</h1>
        <p className="mt-1 font-sans text-sm text-[#10101099]">{SETTINGS_DESCRIPTION}</p>
      </div>

      <div className="max-w-md rounded-2xl border border-[#DBDBDB] bg-white p-6">
        <h2 className="font-display text-xl font-normal text-[#101010]">{SETTINGS_ACCOUNT_HEADING}</h2>
        <p className="mt-4 font-sans text-sm text-[#10101099]">
          {SETTINGS_EMAIL_LABEL}: <span className="font-semibold text-[#101010]">{email ?? "—"}</span>
        </p>
      </div>

      <div className="max-w-md rounded-2xl border border-[#DBDBDB] bg-white p-6">
        <h2 className="font-display text-xl font-normal text-[#101010]">{SETTINGS_PASSWORD_HEADING}</h2>
        <p className="mt-1 font-sans text-sm text-[#10101099]">{SETTINGS_PASSWORD_DESCRIPTION}</p>

        <Formik
          initialValues={SETTINGS_INITIAL_VALUES}
          validationSchema={SETTINGS_PASSWORD_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form noValidate className="mt-6 flex flex-col gap-5">
              <FormikControl
                control="input"
                type="password"
                name="newPassword"
                label={SETTINGS_NEW_PASSWORD_LABEL}
                autoComplete="new-password"
              />
              <FormikControl
                control="input"
                type="password"
                name="confirmPassword"
                label={SETTINGS_CONFIRM_PASSWORD_LABEL}
                autoComplete="new-password"
              />

              {status && <p className={SETTINGS_ERROR_CLASS}>{status}</p>}

              <Button type="submit" variant="primary" loading={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? SETTINGS_SUBMITTING_TEXT : SETTINGS_SUBMIT_TEXT}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

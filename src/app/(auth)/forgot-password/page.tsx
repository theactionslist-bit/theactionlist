"use client";

import {
  Formik,
  Form,
  loginCover,
  logoPng,
  FormikControl,
  OnboardingLayout,
  FORGOT_PASSWORD_HEADING,
  FORGOT_PASSWORD_DESCRIPTION,
  FORGOT_PASSWORD_BUTTON_TEXT,
  FORGOT_PASSWORD_SUBMITTING_TEXT,
  FORGOT_PASSWORD_INITIAL_VALUES,
  FORGOT_PASSWORD_FIELDS,
  FORGOT_PASSWORD_VALIDATION_SCHEMA,
} from "./import";
import type { FormikHelpers } from "./import";

interface ForgotPasswordValues {
  password: string;
  confirmPassword: string;
}

export default function PasswordPage() {
  function handleSubmit(
    values: ForgotPasswordValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordValues>
  ) {
    setSubmitting(false);
  }

  return (
    <OnboardingLayout
      heading={FORGOT_PASSWORD_HEADING}
      description={FORGOT_PASSWORD_DESCRIPTION}
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={false}
      showBackButton={true}
    >
      <Formik
        initialValues={FORGOT_PASSWORD_INITIAL_VALUES}
        validationSchema={FORGOT_PASSWORD_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate className="flex flex-col gap-6">
            {FORGOT_PASSWORD_FIELDS.map((field) => (
              <FormikControl
                key={field.name}
                control={field.control}
                type={field.type}
                label={field.label}
                name={field.name}
                autoComplete={field.autoComplete}
              />
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                font-sans text-lg font-semibold w-full h-15 rounded-full bg-[#D89593] py-3 text-white
                transition-all active:scale-[.98]
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {isSubmitting ? FORGOT_PASSWORD_SUBMITTING_TEXT : FORGOT_PASSWORD_BUTTON_TEXT}
            </button>
          </Form>
        )}
      </Formik>
    </OnboardingLayout>
  );
}

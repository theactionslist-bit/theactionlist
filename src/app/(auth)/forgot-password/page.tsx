"use client";

import {
  Formik,
  Form,
  useState,
  loginCover,
  logoPng,
  Button,
  FormikControl,
  OnboardingLayout,
  FORGOT_PASSWORD_HEADING,
  FORGOT_PASSWORD_DESCRIPTION,
  FORGOT_PASSWORD_BUTTON_TEXT,
  FORGOT_PASSWORD_SUBMITTING_TEXT,
  FORGOT_PASSWORD_SUCCESS_MESSAGE,
  FORGOT_PASSWORD_INITIAL_VALUES,
  FORGOT_PASSWORD_FIELDS,
  FORGOT_PASSWORD_VALIDATION_SCHEMA,
  FORGOT_PASSWORD_ERROR_CLASS,
  FORGOT_PASSWORD_SUCCESS_CLASS,
  handleForgotPasswordSubmit,
} from "./import";
import type { FormikHelpers } from "./import";

interface ForgotPasswordValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(
    values: ForgotPasswordValues,
    helpers: FormikHelpers<ForgotPasswordValues>
  ) {
    handleForgotPasswordSubmit(values, helpers, () => setSent(true));
  }

  if (sent) {
    return (
      <OnboardingLayout
        heading={FORGOT_PASSWORD_HEADING}
        description={FORGOT_PASSWORD_DESCRIPTION}
        coverImage={loginCover}
        logo={logoPng}
        showGoogleButton={false}
        showBackButton={true}
      >
        <p className={FORGOT_PASSWORD_SUCCESS_CLASS}>{FORGOT_PASSWORD_SUCCESS_MESSAGE}</p>
      </OnboardingLayout>
    );
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
        {({ isSubmitting, status }) => (
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

            {status && <p className={FORGOT_PASSWORD_ERROR_CLASS}>{status}</p>}

            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              className="w-full h-15 text-lg!"
            >
              {isSubmitting ? FORGOT_PASSWORD_SUBMITTING_TEXT : FORGOT_PASSWORD_BUTTON_TEXT}
            </Button>
          </Form>
        )}
      </Formik>
    </OnboardingLayout>
  );
}

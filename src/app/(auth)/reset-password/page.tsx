"use client";

import {
  Formik,
  Form,
  loginCover,
  logoPng,
  Button,
  FormikControl,
  OnboardingLayout,
  RESET_PASSWORD_HEADING,
  RESET_PASSWORD_DESCRIPTION,
  RESET_PASSWORD_BUTTON_TEXT,
  RESET_PASSWORD_SUBMITTING_TEXT,
  RESET_PASSWORD_FOOTER_TEXT,
  RESET_PASSWORD_FOOTER_LINK,
  RESET_PASSWORD_INITIAL_VALUES,
  RESET_PASSWORD_FIELDS,
  RESET_PASSWORD_VALIDATION_SCHEMA,
} from "./import";
import type { FormikHelpers } from "./import";

interface ResetPasswordValues {
  email: string;
}

export default function ResetPasswordPage() {
  function handleSubmit(
    values: ResetPasswordValues,
    { setSubmitting }: FormikHelpers<ResetPasswordValues>
  ) {
    setSubmitting(false);
  }

  return (
    <OnboardingLayout
      heading={RESET_PASSWORD_HEADING}
      description={RESET_PASSWORD_DESCRIPTION}
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={false}
      showBackButton={false}
      footerText={RESET_PASSWORD_FOOTER_TEXT}
      footerLink={RESET_PASSWORD_FOOTER_LINK}
    >
      <Formik
        initialValues={RESET_PASSWORD_INITIAL_VALUES}
        validationSchema={RESET_PASSWORD_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate className="flex flex-col gap-6">
            {RESET_PASSWORD_FIELDS.map((field) => (
              <FormikControl
                key={field.name}
                control={field.control}
                type={field.type}
                label={field.label}
                name={field.name}
                autoComplete={field.autoComplete}
              />
            ))}

            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              className="w-full h-15 text-lg!"
            >
              {isSubmitting ? RESET_PASSWORD_SUBMITTING_TEXT : RESET_PASSWORD_BUTTON_TEXT}
            </Button>
          </Form>
        )}
      </Formik>
    </OnboardingLayout>
  );
}

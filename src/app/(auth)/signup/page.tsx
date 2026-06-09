"use client";

import {
  Formik,
  Form,
  loginCover,
  logoPng,
  FormikControl,
  OnboardingLayout,
  Button,
  SIGNUP_HEADING,
  SIGNUP_DESCRIPTION,
  SIGNUP_BUTTON_TEXT,
  SIGNUP_SUBMITTING_TEXT,
  SIGNUP_FOOTER_TEXT,
  SIGNUP_FOOTER_LINK,
  SIGNUP_INITIAL_VALUES,
  SIGNUP_FIELDS,
  SIGNUP_VALIDATION_SCHEMA,
} from "./import";
import type { FormikHelpers } from "./import";

interface SignupValues {
  name: string;
  email: string;
}

export default function SignupPage() {
  function handleSubmit(
    values: SignupValues,
    { setSubmitting }: FormikHelpers<SignupValues>,
  ) {
    setSubmitting(false);
  }

  return (
    <OnboardingLayout
      heading={SIGNUP_HEADING}
      description={SIGNUP_DESCRIPTION}
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={true}
      footerText={SIGNUP_FOOTER_TEXT}
      footerLink={SIGNUP_FOOTER_LINK}
    >
      <Formik
        initialValues={SIGNUP_INITIAL_VALUES}
        validationSchema={SIGNUP_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate className="flex flex-col gap-6">
            {SIGNUP_FIELDS.map((field) => (
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
              {isSubmitting ? SIGNUP_SUBMITTING_TEXT : SIGNUP_BUTTON_TEXT}
            </Button>
          </Form>
        )}
      </Formik>
    </OnboardingLayout>
  );
}

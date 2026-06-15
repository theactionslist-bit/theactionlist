"use client";

import {
  Formik,
  Form,
  useRouter,
  loginCover,
  logoPng,
  Button,
  FormikControl,
  OnboardingLayout,
  RESET_PASSWORD_HEADING,
  RESET_PASSWORD_DESCRIPTION,
  RESET_PASSWORD_BUTTON_TEXT,
  RESET_PASSWORD_SUBMITTING_TEXT,
  RESET_PASSWORD_INITIAL_VALUES,
  RESET_PASSWORD_FIELDS,
  RESET_PASSWORD_VALIDATION_SCHEMA,
  RESET_PASSWORD_ERROR_CLASS,
  handleResetPasswordSubmit,
} from "./import";
import type { FormikHelpers } from "./import";

interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();

  function handleSubmit(
    values: ResetPasswordValues,
    helpers: FormikHelpers<ResetPasswordValues>
  ) {
    handleResetPasswordSubmit(values, helpers, router);
  }

  return (
    <OnboardingLayout
      heading={RESET_PASSWORD_HEADING}
      description={RESET_PASSWORD_DESCRIPTION}
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={false}
      showBackButton={false}
    >
      <Formik
        initialValues={RESET_PASSWORD_INITIAL_VALUES}
        validationSchema={RESET_PASSWORD_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
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

            {status && <p className={RESET_PASSWORD_ERROR_CLASS}>{status}</p>}

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

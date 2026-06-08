"use client";

import {
  Formik,
  Form,
  Link,
  loginCover,
  logoPng,
  FormikControl,
  OnboardingLayout,
  LOGIN_HEADING,
  LOGIN_DESCRIPTION,
  LOGIN_BUTTON_TEXT,
  LOGIN_SUBMITTING_TEXT,
  LOGIN_FORGOT_PASSWORD_TEXT,
  LOGIN_FORGOT_PASSWORD_HREF,
  LOGIN_FOOTER_TEXT,
  LOGIN_FOOTER_LINK,
  LOGIN_INITIAL_VALUES,
  LOGIN_FIELDS,
  LOGIN_VALIDATION_SCHEMA,
} from "./import";
import type { FormikHelpers } from "./import";

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  function handleSubmit(
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) {
    setSubmitting(false);
  }

  return (
    <OnboardingLayout
      heading={LOGIN_HEADING}
      description={LOGIN_DESCRIPTION}
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={true}
      footerText={LOGIN_FOOTER_TEXT}
      footerLink={LOGIN_FOOTER_LINK}
    >
      <Formik
        initialValues={LOGIN_INITIAL_VALUES}
        validationSchema={LOGIN_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate className="flex flex-col gap-6">
            {LOGIN_FIELDS.map((field) => (
              <FormikControl
                key={field.name}
                control={field.control}
                type={field.type}
                label={field.label}
                name={field.name}
                autoComplete={field.autoComplete}
              />
            ))}

            <div className="flex justify-end -mt-1 w-full">
              <Link
                href={LOGIN_FORGOT_PASSWORD_HREF}
                className="font-sans text-base font-semibold text-[#C27E7A] transition-colors hover:opacity-80"
              >
                {LOGIN_FORGOT_PASSWORD_TEXT}
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                font-sans text-lg font-semibold w-full h-15 rounded-full bg-[#D89593] py-3 text-white
                transition-all active:scale-[.98]
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {isSubmitting ? LOGIN_SUBMITTING_TEXT : LOGIN_BUTTON_TEXT}
            </button>
          </Form>
        )}
      </Formik>
    </OnboardingLayout>
  );
}

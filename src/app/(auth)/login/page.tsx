"use client";

import {
  Formik,
  Form,
  Link,
  useRouter,
  loginCover,
  logoPng,
  Button,
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
  LOGIN_AUTH_CALLBACK_PATH,
  LOGIN_ERROR_CLASS,
  handleLoginSubmit,
  handleGoogleSignIn,
} from "./import";
import type { FormikHelpers } from "./import";

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(
    values: LoginValues,
    helpers: FormikHelpers<LoginValues>
  ) {
    handleLoginSubmit(values, helpers, router);
  }

  function handleGoogleLogin() {
    handleGoogleSignIn(`${window.location.origin}${LOGIN_AUTH_CALLBACK_PATH}`);
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
      onGoogleSignIn={handleGoogleLogin}
    >
      <Formik
        initialValues={LOGIN_INITIAL_VALUES}
        validationSchema={LOGIN_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
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

            {status && <p className={LOGIN_ERROR_CLASS}>{status}</p>}

            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              className="w-full h-15 text-lg!"
            >
              {isSubmitting ? LOGIN_SUBMITTING_TEXT : LOGIN_BUTTON_TEXT}
            </Button>
          </Form>
        )}
      </Formik>
    </OnboardingLayout>
  );
}

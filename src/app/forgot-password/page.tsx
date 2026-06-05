"use client";

import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import loginCover from "@/assets/LoginPage/Login_page.png";
import logoPng from "@/assets/Logo.png";
import FormikControl from "@/components/FormikControl/page";
import { OnboardingLayout } from "@/components/Onboarding/page";

interface ForgotPasswordValues {
  password: string;
  confirmPassword: string;
}

const initialValues: ForgotPasswordValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function PasswordPage() {
  function handleSubmit(
    values: ForgotPasswordValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordValues>
  ) {
    console.log(values);
    setSubmitting(false);
  }

  return (
    <OnboardingLayout
      heading="You're Almost In"
      description="Set your password to begin exploring thoughtful actions."
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={false}
      showBackButton={true}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate className="flex flex-col gap-6">
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
              autoComplete="new-password"
            />

            <FormikControl
              control="input"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                font-sans text-lg font-semibold w-full h-15 rounded-full bg-[#D89593] py-3 text-white
                transition-all active:scale-[.98]
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </OnboardingLayout>
  );
}

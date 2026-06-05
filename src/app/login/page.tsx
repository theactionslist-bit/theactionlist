"use client";

import Link from "next/link";
import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import loginCover from "@/assets/LoginPage/Login_page.png";
import logoPng from "@/assets/Logo.png";
import FormikControl from "@/components/FormikControl/page";
import { OnboardingLayout } from "@/components/Onboarding/page";

interface LoginValues {
  email: string;
  password: string;
}

const initialValues: LoginValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  function handleSubmit(
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) {
    console.log(values);
    setSubmitting(false);
  }

  return (
    <OnboardingLayout
      heading="Welcome back!"
      description="For a life well-lived. Not just well-optimised."
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={true}
      footerText="Don't have an account?"
      footerLink={{ href: "/signup", label: "Sign Up" }}
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
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
            />

            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
              autoComplete="current-password"
            />

            <div className="flex justify-end -mt-1 w-full">
              <Link
                href="/forgot-password"
                className="font-sans text-base font-semibold text-[#C27E7A] transition-colors hover:opacity-80"
              >
                Forgot Password?
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
              {isSubmitting ? "Logging in…" : "Log in"}
            </button>
          </Form>
        )}
      </Formik>
    </OnboardingLayout>
  );
}

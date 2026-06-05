"use client";

import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import loginCover from "@/assets/LoginPage/Login_page.png";
import logoPng from "@/assets/Logo.png";
import FormikControl from "@/components/FormikControl/page";
import { OnboardingLayout } from "@/components/Onboarding/page";

interface SignupValues {
  name: string;
  email: string;
}

const initialValues: SignupValues = {
  name: "",
  email: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export default function SignupPage() {
  function handleSubmit(
    values: SignupValues,
    { setSubmitting }: FormikHelpers<SignupValues>
  ) {
    console.log(values);
    setSubmitting(false);
  }

  return (
    <OnboardingLayout
      heading="Join The Actions List"
      description="A curated space for calmer days and meaningful living."
      coverImage={loginCover}
      logo={logoPng}
      showGoogleButton={true}
      footerText="Already have an account?"
      footerLink={{ href: "/login", label: "Login" }}
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
              type="text"
              label="Name"
              name="name"
              autoComplete="name"
            />

            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
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

"use client";

import {
  Formik,
  Form,
  BannerImage,
  BannerSection,
  FormikControl,
  Button,
  SUBMIT_ACTIONS_BANNER_HEADING,
  SUBMIT_FORM_SECTION_1,
  SUBMIT_FORM_SECTION_2,
  SUBMIT_FORM_SECTION_3,
  SUBMIT_FORM_BUTTON_TEXT,
  SUBMIT_FORM_SUBMITTING_TEXT,
  SUBMIT_FORM_INITIAL_VALUES,
  SUBMIT_FORM_TOP_FIELDS,
  SUBMIT_FORM_HELPS_WITH_FIELD,
  SUBMIT_FORM_HOW_IT_WORKS_PLACEHOLDER,
  SUBMIT_FORM_ANYTHING_ELSE_PLACEHOLDER,
  SUBMIT_FORM_VALIDATION_SCHEMA,
} from "./import";
import type { FormikHelpers } from "./import";

interface SubmitActionValues {
  fullName: string;
  email: string;
  helpsWith: string;
  howItWorks: string;
  anythingElse: string;
}

const SubmitAnAction = () => {
  function handleSubmit(
    _values: SubmitActionValues,
    { setSubmitting }: FormikHelpers<SubmitActionValues>
  ) {
    setSubmitting(false);
  }

  return (
    <>
      <BannerSection
        heading={SUBMIT_ACTIONS_BANNER_HEADING}
        image={BannerImage}
      />

      <section className="px-4 py-10 md:px-8 lg:px-15 lg:w-3/4 max-w-full">
        <Formik
          initialValues={SUBMIT_FORM_INITIAL_VALUES}
          validationSchema={SUBMIT_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form noValidate className="flex flex-col gap-5">

              {SUBMIT_FORM_TOP_FIELDS.map((field) => (
                <FormikControl
                  key={field.name}
                  control={field.control}
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                />
              ))}

              <h2 className="font-display text-2xl md:text-3xl text-[#101010] mt-5">
                {SUBMIT_FORM_SECTION_1}
              </h2>
              <FormikControl
                control={SUBMIT_FORM_HELPS_WITH_FIELD.control}
                type={SUBMIT_FORM_HELPS_WITH_FIELD.type}
                name={SUBMIT_FORM_HELPS_WITH_FIELD.name}
                label={SUBMIT_FORM_HELPS_WITH_FIELD.label}
                placeholder={SUBMIT_FORM_HELPS_WITH_FIELD.placeholder}
                autoComplete={SUBMIT_FORM_HELPS_WITH_FIELD.autoComplete}
              />

              <h2 className="font-display text-2xl md:text-3xl text-[#101010] mt-5">
                {SUBMIT_FORM_SECTION_2}
              </h2>
              <FormikControl
                control="textarea"
                name="howItWorks"
                label=""
                placeholder={SUBMIT_FORM_HOW_IT_WORKS_PLACEHOLDER}
                rows={5}
              />

              <h2 className="font-display text-2xl md:text-3xl text-[#101010] mt-5">
                {SUBMIT_FORM_SECTION_3}
              </h2>
              <FormikControl
                control="textarea"
                name="anythingElse"
                label=""
                placeholder={SUBMIT_FORM_ANYTHING_ELSE_PLACEHOLDER}
                rows={4}
              />

              <div className="mt-5">
                <Button type="submit" loading={isSubmitting}>
                  {isSubmitting ? SUBMIT_FORM_SUBMITTING_TEXT : SUBMIT_FORM_BUTTON_TEXT}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default SubmitAnAction;

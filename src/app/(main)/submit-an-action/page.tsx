"use client";

import {
  Formik,
  Form,
  useState,
  BannerImage,
  BannerSection,
  FormikControl,
  Button,
  Modal,
  BsCheck2,
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
  SUCCESS_MODAL_TITLE,
  SUCCESS_MODAL_DESCRIPTION,
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function handleSubmit(
    values: SubmitActionValues,
    { setSubmitting, setStatus, resetForm }: FormikHelpers<SubmitActionValues>
  ) {
    setStatus(undefined);
    try {
      const res = await fetch("/api/submit-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json();
        setStatus(data.error ?? "Submission failed. Please try again.");
        return;
      }

      resetForm();
      setShowSuccessModal(true);
    } catch {
      setStatus("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <BannerSection
        heading={SUBMIT_ACTIONS_BANNER_HEADING}
        image={BannerImage}
      />

      <section className="px-4 pb-10 pt-20 md:px-8 lg:px-15 lg:w-3/4 max-w-full">
        <Formik
          initialValues={SUBMIT_FORM_INITIAL_VALUES}
          validationSchema={SUBMIT_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form noValidate className="flex flex-col gap-5">
              {status && (
                <p className="text-sm font-medium text-red-500">{status}</p>
              )}

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

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        customIcon={
          <div className="flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#D89593]/20 cursor-pointer">
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D89593]">
              <BsCheck2 className="w-10 h-10 sm:w-12 sm:h-12 text-white cursor-pointer" />
            </div>
          </div>
        }
        title={SUCCESS_MODAL_TITLE}
        description={SUCCESS_MODAL_DESCRIPTION}
        showCloseButton={true}
        closeOnOverlayClick={true}
      />
    </>
  );
};

export default SubmitAnAction;

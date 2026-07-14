"use client";

import {
  createPortal,
  useState,
  useEffect,
  Formik,
  Form,
  Button,
  FormikControl,
  FORM_MODAL_CLOSE_ARIA,
  FORM_MODAL_DEFAULT_SUBMIT_LABEL,
  FORM_MODAL_SAVING_LABEL,
  FORM_MODAL_CANCEL_LABEL,
  FORM_MODAL_VIEW_CLOSE_LABEL,
  FORM_MODAL_EMPTY_VALUE,
} from "./import";
import type { FormikHelpers, ObjectSchema } from "./import";

export interface AdminFormField {
  name: string;
  label: string;
  control: "input" | "select" | "textarea";
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  formatViewValue?: (value: unknown) => React.ReactNode;
}

interface AdminFormModalProps<T extends Record<string, unknown>> {
  isOpen: boolean;
  mode: "add" | "edit" | "view";
  title: string;
  fields: readonly AdminFormField[];
  initialValues: T;
  validationSchema: ObjectSchema<any>;
  onClose: () => void;
  onSubmit: (values: T) => Promise<{ error?: string } | void>;
  submitLabel?: string;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return FORM_MODAL_EMPTY_VALUE;
  return String(value);
}

export default function AdminFormModal<T extends Record<string, unknown>>({
  isOpen,
  mode,
  title,
  fields,
  initialValues,
  validationSchema,
  onClose,
  onSubmit,
  submitLabel,
}: AdminFormModalProps<T>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  async function handleSubmit(values: T, helpers: FormikHelpers<T>) {
    const result = await onSubmit(values);
    if (result && "error" in result && result.error) {
      helpers.setStatus(result.error);
      helpers.setSubmitting(false);
      return;
    }
    helpers.setSubmitting(false);
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-[#1010104D] animate-[modal-fade-in_0.2s_ease-out]"
        onClick={onClose}
      />

      <div
        className="relative bg-white w-full sm:max-w-lg md:max-w-xl rounded-2xl shadow-xl flex flex-col gap-5
        px-6 py-8 sm:p-10 max-h-[90vh] overflow-y-auto animate-[modal-scale-in_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label={FORM_MODAL_CLOSE_ARIA}
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-[#101010] hover:opacity-60 transition-opacity leading-none cursor-pointer"
        >
          ×
        </button>

        <h2 className="font-display text-2xl sm:text-3xl text-[#101010] pr-8">{title}</h2>

        {mode === "view" ? (
          <>
            <div className="flex flex-col gap-4">
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <span className="font-sans text-sm font-semibold text-[#101010]">{field.label}</span>
                  <span className="font-sans text-sm text-[#10101099] whitespace-pre-wrap">
                    {field.formatViewValue
                      ? field.formatViewValue(initialValues[field.name])
                      : formatValue(initialValues[field.name])}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button variant="primary" onClick={onClose}>
                {FORM_MODAL_VIEW_CLOSE_LABEL}
              </Button>
            </div>
          </>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form noValidate className="flex flex-col gap-5">
                {fields.map((field) => (
                  <FormikControl
                    key={field.name}
                    control={field.control}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    options={field.options}
                    rows={field.rows}
                  />
                ))}

                {status && <p className="text-sm font-medium text-red-600">{status}</p>}

                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="secondary" onClick={onClose}>
                    {FORM_MODAL_CANCEL_LABEL}
                  </Button>
                  <Button type="submit" variant="primary" loading={isSubmitting}>
                    {isSubmitting ? FORM_MODAL_SAVING_LABEL : submitLabel ?? FORM_MODAL_DEFAULT_SUBMIT_LABEL}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>,
    document.body
  );
}

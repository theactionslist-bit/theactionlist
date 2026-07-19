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
  control: "input" | "select" | "textarea" | "richtext" | "linklist" | "multiselect";
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  formatViewValue?: (value: unknown) => React.ReactNode;
  /** Shown in the View modal, but excluded from the Add/Edit form. */
  viewOnly?: boolean;
  /** For control="multiselect": set to false to allow only a single selection. Defaults to true. */
  multiple?: boolean;
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

function renderMultiSelect(
  value: unknown,
  options: { value: string; label: string }[] = [],
): React.ReactNode {
  const ids = Array.isArray(value) ? (value as string[]).filter(Boolean) : [];

  if (ids.length === 0) {
    return <span className="font-sans text-sm text-[#10101099]">{FORM_MODAL_EMPTY_VALUE}</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => (
        <span
          key={id}
          className="rounded-full bg-[#F3F1EF] px-3 py-1 font-sans text-xs text-[#101010]"
        >
          {options.find((opt) => opt.value === id)?.label ?? id}
        </span>
      ))}
    </div>
  );
}

function renderLinkList(value: unknown): React.ReactNode {
  const links = Array.isArray(value) ? (value as string[]).filter(Boolean) : [];

  if (links.length === 0) {
    return <span className="font-sans text-sm text-[#10101099]">{FORM_MODAL_EMPTY_VALUE}</span>;
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="font-sans text-xs text-[#10101099]">
        {links.length} {links.length === 1 ? "link" : "links"}
      </span>
      {links.map((link, i) => (
        <a
          key={i}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm text-[#C27E7A] underline-offset-2 hover:underline wrap-break-word"
        >
          {link}
        </a>
      ))}
    </div>
  );
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
    try {
      const result = await onSubmit(values);
      if (result && "error" in result && result.error) {
        helpers.setStatus(result.error);
        helpers.setSubmitting(false);
        return;
      }
      helpers.setSubmitting(false);
      onClose();
    } catch (err) {
      helpers.setStatus(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      helpers.setSubmitting(false);
    }
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
        <h2 className="font-display text-2xl sm:text-3xl text-[#101010] pr-8">{title}</h2>

        {mode === "view" ? (
          <>
            <div className="flex flex-col gap-4">
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <span className="font-sans text-sm font-semibold text-[#101010]">{field.label}</span>
                  {field.control === "richtext" ? (
                    <div
                      className="admin-view-content font-sans text-sm text-[#10101099] whitespace-pre-wrap wrap-break-word"
                      dangerouslySetInnerHTML={{
                        __html: formatValue(initialValues[field.name]),
                      }}
                    />
                  ) : field.control === "linklist" ? (
                    renderLinkList(initialValues[field.name])
                  ) : field.control === "multiselect" ? (
                    renderMultiSelect(initialValues[field.name], field.options)
                  ) : field.type === "color" ? (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-4 w-4 shrink-0 rounded-full border border-[#DBDBDB]"
                        style={{ backgroundColor: (initialValues[field.name] as string) || "#FFFFFF" }}
                      />
                      <span className="font-sans text-sm text-[#10101099]">
                        {formatValue(initialValues[field.name])}
                      </span>
                    </span>
                  ) : (
                    <span className="font-sans text-sm text-[#10101099] whitespace-pre-wrap wrap-break-word">
                      {field.formatViewValue
                        ? field.formatViewValue(initialValues[field.name])
                        : formatValue(initialValues[field.name])}
                    </span>
                  )}
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
                {fields
                  .filter((field) => !field.viewOnly)
                  .map((field) => (
                    <FormikControl
                      key={field.name}
                      control={field.control}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      options={field.options}
                      rows={field.rows}
                      multiple={field.multiple}
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

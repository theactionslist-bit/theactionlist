"use client";

import {
  useRouter,
  Formik,
  Form,
  Button,
  FormikControl,
  ACTION_FORM_CANCEL_LABEL,
  ACTION_FORM_DEFAULT_SUBMIT_LABEL,
  ACTION_FORM_SAVING_LABEL,
  ACTION_FORM_GENERIC_ERROR,
} from "./import";
import type { FormikHelpers, ObjectSchema } from "./import";

export interface ActionFormField {
  name: string;
  label: string;
  control: "input" | "select" | "textarea" | "richtext" | "linklist" | "multiselect";
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  multiple?: boolean;
}

interface ActionFormProps<T extends Record<string, unknown>> {
  heading: string;
  description?: string;
  fields: readonly ActionFormField[];
  initialValues: T;
  validationSchema: ObjectSchema<any>;
  onSubmit: (values: T) => Promise<{ error?: string } | void>;
  cancelHref: string;
  submitLabel?: string;
}

export default function ActionForm<T extends Record<string, unknown>>({
  heading,
  description,
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  cancelHref,
  submitLabel = ACTION_FORM_DEFAULT_SUBMIT_LABEL,
}: ActionFormProps<T>) {
  const router = useRouter();

  async function handleSubmit(values: T, helpers: FormikHelpers<T>) {
    try {
      const result = await onSubmit(values);
      if (result && "error" in result && result.error) {
        helpers.setStatus(result.error);
        helpers.setSubmitting(false);
        return;
      }
      helpers.setSubmitting(false);
      router.push(cancelHref);
    } catch (err) {
      helpers.setStatus(err instanceof Error ? err.message : ACTION_FORM_GENERIC_ERROR);
      helpers.setSubmitting(false);
    }
  }

  return (
    <div className="flex max-w-2xl min-w-0 flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-normal text-[#101010]">{heading}</h1>
        {description && (
          <p className="mt-1 font-sans text-sm text-[#10101099]">{description}</p>
        )}
      </div>

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
                multiple={field.multiple}
              />
            ))}

            {status && <p className="font-sans text-sm font-medium text-red-600">{status}</p>}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => router.push(cancelHref)}>
                {ACTION_FORM_CANCEL_LABEL}
              </Button>
              <Button type="submit" variant="primary" loading={isSubmitting}>
                {isSubmitting ? ACTION_FORM_SAVING_LABEL : submitLabel}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

"use client";

import { useField } from "formik";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
};

export default function Textarea({ label, rows = 4, ...props }: TextareaProps) {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={props.id || props.name}
        className="font-sans text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      <textarea
        id={props.id || props.name}
        rows={rows}
        {...field}
        {...props}
        className={`
          font-sans text-sm w-full rounded-xl border bg-gray-50
          px-4 py-3 text-gray-900 placeholder:text-gray-400
          outline-none transition-all resize-y
          hover:border-gray-300 hover:bg-white
          focus:bg-white focus:ring-4
          ${
            hasError
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
              : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/8"
          }
        `}
      />

      {hasError && (
        <p className="font-sans text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
}

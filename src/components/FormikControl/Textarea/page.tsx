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
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={props.id || props.name}
        className="font-sans text-[16px] font-semibold text-[#101010]"
      >
        {label}
      </label>

      <textarea
        id={props.id || props.name}
        rows={rows}
        {...field}
        {...props}
        className={`
          font-sans text-base w-full rounded-xl border-2 bg-gray-50
          px-4 py-3 text-gray-900 placeholder:text-gray-400 placeholder:text-[16px]
          outline-none transition-all resize-y
          hover:bg-white
          focus:bg-white
          ${
            hasError
              ? "border-red-400 focus:border-red-500"
              : "border-[#DBDBDB] focus:border-[#D89593]"
          }
        `}
      />

      {hasError && (
        <p className="font-sans text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
}

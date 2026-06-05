"use client";

import { useField } from "formik";

interface SelectOption {
  value: string;
  label: string;
}

type SelectorProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  options?: SelectOption[];
};

export default function Selector({ label, options = [], ...props }: SelectorProps) {
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

      <select
        id={props.id || props.name}
        {...field}
        {...props}
        className={`
          font-sans text-sm w-full rounded-xl border bg-gray-50
          px-4 py-3 text-gray-900
          outline-none transition-all appearance-none cursor-pointer
          hover:border-gray-300 hover:bg-white
          focus:bg-white focus:ring-4
          ${
            hasError
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
              : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/8"
          }
        `}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hasError && (
        <p className="font-sans text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
}

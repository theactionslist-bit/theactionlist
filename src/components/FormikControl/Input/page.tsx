"use client";

import {
  useState,
  Image,
  useField,
  passwordEye,
  passwordHideEye,
  SHOW_PASSWORD_ARIA_LABEL,
  HIDE_PASSWORD_ARIA_LABEL,
  PASSWORD_EYE_SIZE,
} from "./import";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export default function Input({ label, type, className, ...props }: InputProps) {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);
  const hasError = meta.touched && meta.error;
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="font-sans text-[16px] font-semibold text-[#101010]"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={props.id || props.name}
          {...field}
          {...props}
          type={inputType}
          className={`
            font-sans text-base w-full h-17
            rounded-xl border-2 bg-gray-50
            px-4 text-gray-900 placeholder:text-gray-400
            outline-none transition-all
            hover:bg-white
            focus:bg-white
            ${isPasswordField ? "pr-12" : ""}
            ${
              hasError
                ? "border-red-400 focus:border-red-500"
                : "border-[#DBDBDB] focus:border-[#D89593]"
            }
            ${className ?? ""}
          `}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center hover:opacity-75 transition-opacity focus:outline-none"
            aria-label={showPassword ? HIDE_PASSWORD_ARIA_LABEL : SHOW_PASSWORD_ARIA_LABEL}
          >
            <Image
              src={showPassword ? passwordHideEye : passwordEye}
              alt={showPassword ? HIDE_PASSWORD_ARIA_LABEL : SHOW_PASSWORD_ARIA_LABEL}
              width={PASSWORD_EYE_SIZE}
              height={PASSWORD_EYE_SIZE}
              className="pointer-events-none"
            />
          </button>
        )}
      </div>

      {hasError && (
        <p className="font-sans text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
}

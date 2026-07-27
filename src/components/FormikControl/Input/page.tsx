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
  required?: boolean;
};

const HEX_COLOUR_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export default function Input({ label, type, className, required, ...props }: InputProps) {
  const [field, meta, helpers] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);
  const hasError = meta.touched && meta.error;
  const isPasswordField = type === "password";
  const isColorField = type === "color";
  const inputType = isPasswordField && showPassword ? "text" : type;
  const hexValue = (field.value as string) || "";
  const isValidHex = HEX_COLOUR_PATTERN.test(hexValue);

  function handleHexTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.trim();
    helpers.setValue(raw && !raw.startsWith("#") ? `#${raw}` : raw);
  }

  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="font-sans text-[16px] font-semibold text-[#101010]"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {isColorField ? (
        <div className="inline-flex items-center gap-3">
          <label
            htmlFor={props.id || props.name}
            className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-[#DBDBDB]"
            style={{ backgroundColor: isValidHex ? hexValue : "#FFFFFF" }}
          >
            <input
              id={props.id || props.name}
              {...field}
              {...props}
              type="color"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
          <input
            type="text"
            value={hexValue}
            onChange={handleHexTextChange}
            onBlur={() => helpers.setTouched(true)}
            placeholder="#RRGGBB"
            className={`
              font-sans text-base w-32
              rounded-xl border-2
              px-4 py-2.5 text-gray-900 placeholder:text-[#10101099]
              outline-none transition-all
              hover:bg-white
              focus:bg-white
              ${
                hasError
                  ? "border-red-400 focus:border-red-500"
                  : "border-[#DBDBDB] focus:border-[#D89593]"
              }
            `}
          />
        </div>
      ) : (
        <div className="relative">
          <input
            id={props.id || props.name}
            {...field}
            {...props}
            type={inputType}
            autoComplete="off"
            className={`
              font-sans text-base w-full
              rounded-xl border-2
              px-5 py-3.5 text-gray-900 placeholder:text-[#10101099]
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
                src={showPassword ? passwordEye :  passwordHideEye}
                alt={showPassword ? HIDE_PASSWORD_ARIA_LABEL : SHOW_PASSWORD_ARIA_LABEL}
                width={PASSWORD_EYE_SIZE}
                height={PASSWORD_EYE_SIZE}
                className="cursor-pointer"
              />
            </button>
          )}
        </div>
      )}

      {hasError && (
        <p className="font-sans text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
}

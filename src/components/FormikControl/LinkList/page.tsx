"use client";

import {
  FieldArray,
  useField,
  IoCloseOutline,
  IoAddOutline,
  LINK_LIST_EMPTY_TEXT,
  LINK_LIST_ADD_BUTTON_TEXT,
  LINK_LIST_REMOVE_ARIA_LABEL,
  LINK_LIST_DEFAULT_PLACEHOLDER,
} from "./import";

type LinkListProps = {
  label?: string;
  name: string;
  placeholder?: string;
};

export default function LinkList({ label, name, placeholder }: LinkListProps) {
  const [field] = useField<string[]>(name);
  const links = field.value ?? [];

  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <label className="font-sans text-[16px] font-semibold text-[#101010]">{label}</label>
      )}

      <FieldArray name={name}>
        {({ push, remove, replace }) => (
          <div className="flex flex-col gap-2">
            {links.length === 0 && (
              <p className="font-sans text-sm text-[#10101099]">{LINK_LIST_EMPTY_TEXT}</p>
            )}

            {links.map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => replace(index, e.target.value)}
                  placeholder={placeholder ?? LINK_LIST_DEFAULT_PLACEHOLDER}
                  className="font-sans text-base w-full rounded-xl border-2 border-[#DBDBDB]
                  px-4 py-3 text-gray-900 placeholder:text-[#10101099] outline-none transition-all
                  hover:bg-white focus:bg-white focus:border-[#D89593]"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label={LINK_LIST_REMOVE_ARIA_LABEL}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#101010]
                  transition-colors hover:bg-[#F3F1EF] cursor-pointer"
                >
                  <IoCloseOutline size={18} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => push("")}
              className="inline-flex items-center gap-1 self-start font-sans text-sm font-semibold
              text-[#C27E7A] hover:underline cursor-pointer"
            >
              <IoAddOutline size={16} />
              {LINK_LIST_ADD_BUTTON_TEXT}
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
}

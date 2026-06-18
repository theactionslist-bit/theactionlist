"use client";

import {
  useState,
  useRef,
  useEffect,
  useField,
  DropDownArrow,
  IoClose,
  SELECTOR_DEFAULT_PLACEHOLDER,
  SELECTOR_SEARCH_PLACEHOLDER,
  SELECTOR_NO_RESULTS_TEXT,
} from "./import";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectorProps {
  label?: string;
  name: string;
  options?: SelectOption[];
  placeholder?: string;
}

export default function Selector({
  label,
  name,
  options = [],
  placeholder = SELECTOR_DEFAULT_PLACEHOLDER,
}: SelectorProps) {
  const [field, meta, helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const hasError = meta.touched && meta.error;
  const selectedOption = options.find((opt) => opt.value === field.value);
  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        helpers.setTouched(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, helpers]);

  function selectOption(opt: SelectOption) {
    helpers.setValue(opt.value);
    helpers.setTouched(true);
    setOpen(false);
    setSearch("");
  }

  return (
    <div ref={containerRef} className="relative flex flex-col gap-2.5">
      {label && (
        <label className="font-sans text-[16px] font-semibold text-[#101010]">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`
            font-sans text-sm w-full h-17 text-left
            rounded-xl border-2
            px-5 pr-12 text-gray-900
            outline-none transition-all
            hover:bg-white
            cursor-pointer
            ${
              hasError
                ? "border-red-400"
                : open
                  ? "border-[#D89593] bg-white"
                  : selectedOption
                    ? "border-[#D89593]"
                    : "border-[#DBDBDB]"
            }
          `}
        >
          {selectedOption ? (
            <span className="xl:text-[24px] text-xl font-semibold text-[#D89593]">
              {selectedOption.label}
            </span>
          ) : (
            <span className="xl:text-[26px] text-xl font-semibold text-[#101010]">
              {placeholder}
            </span>
          )}
        </button>

        {selectedOption ? (
          <button
            type="button"
            aria-label="Clear selection"
            onClick={(e) => {
              e.stopPropagation();
              helpers.setValue("");
              helpers.setTouched(true);
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#10101099] hover:text-[#101010] transition-colors bg-[#cccccc42] border border-[#DBDBDB] p-1 rounded-full cursor-pointer"
          >
            <IoClose size={18} color="black" />
          </button>
        ) : (
          <div
            className={`absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <DropDownArrow />
          </div>
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border-2 border-[#DBDBDB] rounded-xl shadow-sm overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={SELECTOR_SEARCH_PLACEHOLDER}
              autoFocus
              className="w-full px-3 py-2 font-sans lg:text-xl text-lg rounded-lg border-2 border-[#DBDBDB] bg-gray-50 outline-none focus:border-[#D89593] focus:bg-white transition-all [&::placeholder]:text-[#737373] placeholder:font-semibold"
            />
          </div>

          <ul className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 font-sans text-sm text-gray-400">
                {SELECTOR_NO_RESULTS_TEXT}
              </li>
            ) : (
              filtered.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => selectOption(opt)}
                    className={`w-full text-left px-4 py-3.5 font-sans xl:text-[26px] text-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer ${
                      field.value === opt.value
                        ? "text-[#D89593] font-semibold"
                        : "text-[#101010]"
                    }`}
                  >
                    {opt.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {hasError && (
        <p className="font-sans text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
}

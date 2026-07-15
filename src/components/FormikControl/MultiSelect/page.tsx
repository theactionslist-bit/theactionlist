"use client";

import {
  useState,
  useRef,
  useEffect,
  useField,
  DropDownArrow,
  IoCloseOutline,
  MULTISELECT_DEFAULT_PLACEHOLDER,
  MULTISELECT_SEARCH_PLACEHOLDER,
  MULTISELECT_NO_RESULTS_TEXT,
} from "./import";

interface MultiSelectOption {
  value: string;
  label: string;
}

type MultiSelectProps = {
  label?: string;
  name: string;
  options?: MultiSelectOption[];
  placeholder?: string;
  /** Set to false to allow only a single selection. Defaults to true. */
  multiple?: boolean;
};

export default function MultiSelect({
  label,
  name,
  options = [],
  placeholder = MULTISELECT_DEFAULT_PLACEHOLDER,
  multiple = true,
}: MultiSelectProps) {
  const [field, meta, helpers] = useField<string[]>(name);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedIds = field.value ?? [];
  const hasError = meta.touched && meta.error;
  const selectedOptions = options.filter((opt) => selectedIds.includes(opt.value));
  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        helpers.setTouched(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function toggleOption(id: string) {
    if (!multiple) {
      helpers.setValue(selectedIds.includes(id) ? [] : [id]);
      helpers.setTouched(true);
      setOpen(false);
      setSearch("");
      return;
    }

    const next = selectedIds.includes(id)
      ? selectedIds.filter((v) => v !== id)
      : [...selectedIds, id];
    helpers.setValue(next);
    helpers.setTouched(true);
  }

  function removeOption(id: string) {
    helpers.setValue(selectedIds.filter((v) => v !== id));
    helpers.setTouched(true);
  }

  return (
    <div ref={containerRef} className="relative flex flex-col gap-2.5">
      {label && (
        <label className="font-sans text-[16px] font-semibold text-[#101010]">{label}</label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`
            font-sans text-base w-full min-h-13 text-left
            rounded-xl border-2
            px-5 py-2.5 pr-12 text-gray-900
            outline-none transition-all
            hover:bg-white
            cursor-pointer
            ${hasError ? "border-red-400" : open ? "border-[#D89593] bg-white" : "border-[#DBDBDB]"}
          `}
        >
          {selectedOptions.length === 0 ? (
            <span className="text-[#10101099]">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {selectedOptions.map((opt) => (
                <span
                  key={opt.value}
                  className="inline-flex items-center gap-1 rounded-full bg-[#D89593]/10 px-3 py-1 font-sans text-sm text-[#C27E7A]"
                >
                  {opt.label}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(opt.value);
                    }}
                    className="cursor-pointer hover:text-[#101010]"
                  >
                    <IoCloseOutline size={14} />
                  </span>
                </span>
              ))}
            </div>
          )}
        </button>

        <div
          className={`absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <DropDownArrow />
        </div>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 overflow-hidden rounded-xl border-2 border-[#DBDBDB] bg-white shadow-sm">
          <div className="border-b border-gray-100 p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={MULTISELECT_SEARCH_PLACEHOLDER}
              autoFocus
              className="w-full rounded-lg border-2 border-[#DBDBDB] bg-gray-50 px-3 py-2 font-sans text-sm outline-none transition-all focus:border-[#D89593] focus:bg-white"
            />
          </div>

          <ul className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 font-sans text-sm text-gray-400">
                {MULTISELECT_NO_RESULTS_TEXT}
              </li>
            ) : (
              filtered.map((opt) => {
                const checked = selectedIds.includes(opt.value);
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => toggleOption(opt.value)}
                      className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left font-sans text-sm transition-colors hover:bg-[#F3F1EF] cursor-pointer ${
                        checked ? "font-semibold text-[#C27E7A]" : "text-[#101010]"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${
                          checked ? "border-[#D89593] bg-[#D89593]" : "border-[#DBDBDB]"
                        }`}
                      >
                        {checked && <span className="h-1.5 w-1.5 rounded-sm bg-white" />}
                      </span>
                      {opt.label}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {hasError && <p className="font-sans text-sm text-red-600">{meta.error}</p>}
    </div>
  );
}

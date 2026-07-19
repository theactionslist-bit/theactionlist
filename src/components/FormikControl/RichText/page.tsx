"use client";

import { useEffect, useRef } from "react";
import { useField } from "formik";
import "summernote/dist/summernote-lite.css";

type RichTextProps = {
  label?: string;
  name: string;
  placeholder?: string;
};

export default function RichText({ label, name, placeholder }: RichTextProps) {
  const [field, meta, helpers] = useField(name);
  const editorRef = useRef<HTMLDivElement>(null);
  const hasError = meta.touched && meta.error;

  useEffect(() => {
    let isActive = true;
    let $editorInstance: any;

    async function initEditor() {
      const jqueryModule = await import("jquery");
      const $: any = jqueryModule.default;
      (window as any).jQuery = $;
      (window as any).$ = $;
      await import("summernote/dist/summernote-lite.js");

      if (!isActive || !editorRef.current) return;

      editorRef.current.innerHTML = field.value ?? "";

      $editorInstance = $(editorRef.current);
      $editorInstance.summernote({
        height: 200,
        placeholder: placeholder ?? "",
        toolbar: [
          ["style", ["style"]],
          ["font", ["bold", "underline", "clear"]],
          ["para", ["ul", "ol", "paragraph"]],
        ],
        callbacks: {
          onChange: (contents: string) => helpers.setValue(contents),
          onBlur: () => helpers.setTouched(true),
        },
      });

      // summernote-lite's own dropdowns (e.g. the style menu) don't auto-close
      // on item select — its outside-click handler only closes on clicks
      // *outside* the button group, and a dropdown item click is still inside it.
      // The `.note-editor` wrapper is inserted as a sibling right after the
      // original element (insertAfter), not an ancestor — so `.next()`, not `.closest()`.
      $editorInstance
        .next(".note-editor")
        .on("click", ".note-dropdown-item", function (this: HTMLElement) {
          $(this).closest(".note-btn-group").removeClass("open");
        });
    }

    initEditor();

    return () => {
      isActive = false;
      $editorInstance?.summernote("destroy");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <label className="font-sans text-[16px] font-semibold text-[#101010]">{label}</label>
      )}

      <div className={`rounded-xl ${hasError ? "[&_.note-editor]:border-red-400" : ""}`}>
        <div ref={editorRef} />
      </div>

      {hasError && <p className="font-sans text-sm text-red-600">{meta.error}</p>}
    </div>
  );
}

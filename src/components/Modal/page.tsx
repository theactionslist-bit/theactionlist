"use client";

import {
  useEffect,
  createPortal,
  Image,
  modalImagePng,
  MODAL_DEFAULT_PRIMARY_TEXT,
  MODAL_DEFAULT_SECONDARY_TEXT,
} from "./import";
import type { StaticImageData } from "./import";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  image?: StaticImageData | string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  closeOnOverlayClick?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  image = modalImagePng,
  primaryButtonText = MODAL_DEFAULT_PRIMARY_TEXT,
  secondaryButtonText = MODAL_DEFAULT_SECONDARY_TEXT,
  onPrimaryAction,
  onSecondaryAction,
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  function handlePrimary() {
    onPrimaryAction?.();
    onClose();
  }

  function handleSecondary() {
    onSecondaryAction?.();
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-[modal-fade-in_0.2s_ease-out]"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal box */}
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center gap-5 p-6 animate-[modal-scale-in_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="w-full rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title ?? "Modal image"}
            width={400}
            height={260}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Text */}
        {title && (
          <h2 className="font-display text-xl md:text-2xl text-center text-[#101010] leading-snug">
            {title}
          </h2>
        )}
        {description && (
          <p className="font-sans text-base text-center text-[#10101099] leading-relaxed -mt-2">
            {description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={handleSecondary}
            className="flex-1 h-12 rounded-full border border-[#101010] font-sans text-base font-semibold text-[#101010] bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            {secondaryButtonText}
          </button>
          <button
            type="button"
            onClick={handlePrimary}
            className="flex-1 h-12 rounded-full bg-[#101010] font-sans text-base font-semibold text-white hover:bg-[#2a2a2a] transition-colors duration-200"
          >
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;

"use client";

import {
  createPortal,
  Image,
  Button,
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
        className="absolute inset-0 bg-[#1010104D] animate-[modal-fade-in_0.2s_ease-out]"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal box */}
      <div
        className="relative bg-white w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-xl flex flex-col items-center gap-4 sm:gap-5 px-6 pt-8 pb-10 sm:p-10 md:p-12 animate-[modal-scale-in_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div>
          <Image
            src={image}
            alt={title ?? "Modal image"}
            width={170}
            height={170}
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-42.5 md:h-42.5"
          />
        </div>

        {/* Text */}
        {title && (
          <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] text-center text-[#101010] leading-snug">
            {title}
          </h2>
        )}
        {description && (
          <p className="font-sans text-base sm:text-lg md:text-2xl text-center text-[#101010] leading-relaxed -mt-1 sm:-mt-2">
            {description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-1 w-full sm:w-auto justify-center">
          <Button variant="secondary" onClick={handleSecondary} className="border-[#0A0A0A]! text-[#0A0A0A]! flex-1 sm:flex-none">
            {secondaryButtonText}
          </Button>
          <Button variant="primary" onClick={handlePrimary} className="flex-1 sm:flex-none">
            {primaryButtonText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;

import { clsx, LOADER_ARIA_LABEL, LOADER_SIZE_CLASSES } from "./import";

interface LoaderProps {
  size?: keyof typeof LOADER_SIZE_CLASSES;
  className?: string;
  fullPage?: boolean;
}

export default function Loader({ size = "md", className, fullPage = false }: LoaderProps) {
  const spinner = (
    <svg
      className={clsx("animate-spin text-[#D89593]", LOADER_SIZE_CLASSES[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={LOADER_ARIA_LABEL}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );

  if (!fullPage) return spinner;

  return <div className="flex items-center justify-center py-24">{spinner}</div>;
}

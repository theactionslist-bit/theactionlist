"use client";

import Input from "./Input/page";
import Selector from "./Selector/page";
import Textarea from "./Textarea/page";

interface FormikControlProps {
  control: "input" | "select" | "textarea";
  [key: string]: unknown;
}

export default function FormikControl({ control, ...rest }: FormikControlProps) {
  switch (control) {
    case "input":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <Input {...(rest as any)} />;
    case "select":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <Selector {...(rest as any)} />;
    case "textarea":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <Textarea {...(rest as any)} />;
    default:
      return null;
  }
}

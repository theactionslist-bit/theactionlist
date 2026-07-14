"use client";

import Input from "./Input/page";
import Selector from "./Selector/page";
import Textarea from "./Textarea/page";
import RichText from "./RichText/page";
import LinkList from "./LinkList/page";

interface FormikControlProps {
  control: "input" | "select" | "textarea" | "richtext" | "linklist";
  [key: string]: unknown;
}

export default function FormikControl({ control, ...rest }: FormikControlProps) {
  switch (control) {
    case "input":
      return <Input {...(rest as any)} />;
    case "select":
      return <Selector {...(rest as any)} />;
    case "textarea":
      return <Textarea {...(rest as any)} />;
    case "richtext":
      return <RichText {...(rest as any)} />;
    case "linklist":
      return <LinkList {...(rest as any)} />;
    default:
      return null;
  }
}

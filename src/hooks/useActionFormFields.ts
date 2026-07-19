"use client";

import { useEffect, useState } from "react";
import { ACTIONS_FORM_FIELDS } from "@/components/admin/ActionsTable/constant";
import {
  fetchAreaOptions,
  fetchAuthorOptions,
  fetchFrequencyOptions,
} from "@/components/admin/ActionsTable/service";
import type { LookupOption } from "@/components/admin/ActionsTable/service";

function toOptions(items: LookupOption[]): { value: string; label: string }[] {
  return items.map((item) => ({ value: item.id, label: item.name }));
}

export function useActionFormFields() {
  const [areaOptions, setAreaOptions] = useState<LookupOption[]>([]);
  const [authorOptions, setAuthorOptions] = useState<LookupOption[]>([]);
  const [frequencyOptions, setFrequencyOptions] = useState<LookupOption[]>([]);

  useEffect(() => {
    fetchAreaOptions().then(setAreaOptions);
    fetchAuthorOptions().then(setAuthorOptions);
    fetchFrequencyOptions().then(setFrequencyOptions);
  }, []);

  return ACTIONS_FORM_FIELDS.map((field) => {
    if (field.name === "area_ids") return { ...field, options: toOptions(areaOptions) };
    if (field.name === "author_ids") return { ...field, options: toOptions(authorOptions) };
    if (field.name === "frequency_ids") return { ...field, options: toOptions(frequencyOptions) };
    return field;
  });
}

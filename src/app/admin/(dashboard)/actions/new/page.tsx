"use client";

import {
  useToast,
  ActionForm,
  useActionFormFields,
  ACTIONS_FORM_INITIAL_VALUES,
  ACTIONS_FORM_VALIDATION_SCHEMA,
  ACTIONS_ADD_MODAL_TITLE,
  ACTIONS_CREATE_SUCCESS_MESSAGE,
  toActionInput,
  createAction,
  NEW_ACTION_DESCRIPTION,
  NEW_ACTION_SUBMIT_LABEL,
  ACTIONS_LIST_HREF,
} from "./import";
import type { ActionFormValues } from "./import";

export default function AdminNewActionPage() {
  const { addToast } = useToast();
  const fields = useActionFormFields();

  async function handleSubmit(values: ActionFormValues): Promise<{ error?: string } | void> {
    const result = await createAction(toActionInput(values));

    if (result.error) {
      addToast(result.error, "error");
      return result;
    }

    addToast(ACTIONS_CREATE_SUCCESS_MESSAGE, "success");
    return result;
  }

  return (
    <ActionForm<ActionFormValues>
      heading={ACTIONS_ADD_MODAL_TITLE}
      description={NEW_ACTION_DESCRIPTION}
      fields={fields}
      initialValues={ACTIONS_FORM_INITIAL_VALUES}
      validationSchema={ACTIONS_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
      cancelHref={ACTIONS_LIST_HREF}
      submitLabel={NEW_ACTION_SUBMIT_LABEL}
    />
  );
}

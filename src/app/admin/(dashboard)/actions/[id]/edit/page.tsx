"use client";

import {
  useState,
  useEffect,
  useParams,
  useToast,
  ActionForm,
  useActionFormFields,
  ACTIONS_EDIT_MODAL_TITLE,
  ACTIONS_FORM_VALIDATION_SCHEMA,
  ACTIONS_UPDATE_SUCCESS_MESSAGE,
  fetchActionById,
  toFormValues,
  toActionInput,
  updateAction,
  EDIT_ACTION_DESCRIPTION,
  EDIT_ACTION_LOADING_TEXT,
  EDIT_ACTION_NOT_FOUND_TEXT,
  ACTIONS_LIST_HREF,
} from "./import";
import type { AdminActionRow, ActionFormValues } from "./import";

export default function AdminEditActionPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { addToast } = useToast();
  const fields = useActionFormFields();
  const [row, setRow] = useState<AdminActionRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchActionById(id)
      .then(setRow)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(values: ActionFormValues): Promise<{ error?: string } | void> {
    const result = await updateAction(id, toActionInput(values));

    if (result.error) {
      addToast(result.error, "error");
      return result;
    }

    addToast(ACTIONS_UPDATE_SUCCESS_MESSAGE, "success");
    return result;
  }

  if (loading) {
    return <p className="font-sans text-sm text-[#10101099]">{EDIT_ACTION_LOADING_TEXT}</p>;
  }

  if (!row) {
    return <p className="font-sans text-sm text-[#10101099]">{EDIT_ACTION_NOT_FOUND_TEXT}</p>;
  }

  return (
    <ActionForm<ActionFormValues>
      heading={ACTIONS_EDIT_MODAL_TITLE}
      description={EDIT_ACTION_DESCRIPTION}
      fields={fields}
      initialValues={toFormValues(row)}
      validationSchema={ACTIONS_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
      cancelHref={ACTIONS_LIST_HREF}
    />
  );
}

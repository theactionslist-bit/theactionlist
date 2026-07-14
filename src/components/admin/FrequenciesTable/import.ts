import * as Yup from "yup";

export { useState } from "@/common/imports";
export { default as AdminDataTable } from "@/components/admin/DataTable/page";
export { default as AdminFormModal } from "@/components/admin/FormModal/page";
export { default as RowActionsMenu } from "@/components/admin/RowActionsMenu/page";
export { Modal } from "@/common/components";
export { default as TruncatedCell } from "@/components/admin/TruncatedCell/page";
export { useToast } from "@/context/ToastContext";
export {
  FREQUENCIES_TABLE_ITEMS_PER_PAGE,
  FREQUENCIES_TABLE_HEADING,
  FREQUENCIES_TABLE_EMPTY_TEXT,
  FREQUENCIES_TABLE_SEARCH_PLACEHOLDER,
  FREQUENCIES_TABLE_ADD_NEW_LABEL,
  FREQUENCIES_TABLE_ACTIONS_COLUMN_LABEL,
  FREQUENCIES_TABLE_COLUMNS,
  FREQUENCIES_FORM_FIELDS,
  FREQUENCIES_FORM_INITIAL_VALUES,
  FREQUENCIES_ADD_MODAL_TITLE,
  FREQUENCIES_EDIT_MODAL_TITLE,
  FREQUENCIES_VIEW_MODAL_TITLE,
  FREQUENCIES_DELETE_CONFIRM_TITLE,
  FREQUENCIES_DELETE_CONFIRM_DESCRIPTION,
  FREQUENCIES_CREATE_SUCCESS_MESSAGE,
  FREQUENCIES_UPDATE_SUCCESS_MESSAGE,
  FREQUENCIES_DELETE_SUCCESS_MESSAGE,
} from "./constant";
export { fetchPaginatedFrequencies } from "./service";
export { createFrequency, updateFrequency, deleteFrequency } from "./mutations";
export type { AdminFrequencyRow, FrequencyInput } from "./service";

export const FREQUENCIES_FORM_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Name is required"),
  period: Yup.string().nullable(),
  attachments: Yup.string().nullable(),
});

import * as Yup from "yup";

export { useState, useEffect, useRouter } from "@/common/imports";
export { default as AdminDataTable } from "@/components/admin/DataTable/page";
export { default as AdminFormModal } from "@/components/admin/FormModal/page";
export { default as RowActionsMenu } from "@/components/admin/RowActionsMenu/page";
export { Modal } from "@/common/components";
export { default as TruncatedCell } from "@/components/admin/TruncatedCell/page";
export { useToast } from "@/context/ToastContext";
export { useActionFormFields } from "@/hooks/useActionFormFields";
export {
  ACTIONS_TABLE_ITEMS_PER_PAGE,
  ACTIONS_TABLE_HEADING,
  ACTIONS_TABLE_EMPTY_TEXT,
  ACTIONS_TABLE_SEARCH_PLACEHOLDER,
  ACTIONS_TABLE_ADD_NEW_LABEL,
  ACTIONS_TABLE_ACTIONS_COLUMN_LABEL,
  ACTIONS_TABLE_COLUMNS,
  ACTIONS_FORM_FIELDS,
  ACTIONS_FORM_INITIAL_VALUES,
  ACTIONS_ADD_MODAL_TITLE,
  ACTIONS_EDIT_MODAL_TITLE,
  ACTIONS_VIEW_MODAL_TITLE,
  ACTIONS_DELETE_CONFIRM_TITLE,
  ACTIONS_DELETE_CONFIRM_DESCRIPTION,
  ACTIONS_CREATE_SUCCESS_MESSAGE,
  ACTIONS_UPDATE_SUCCESS_MESSAGE,
  ACTIONS_DELETE_SUCCESS_MESSAGE,
  ACTIONS_NEW_HREF,
  actionEditHref,
} from "./constant";
export {
  fetchPaginatedActions,
  fetchActionById,
  fetchAreaOptions,
  fetchAuthorOptions,
  fetchFrequencyOptions,
  toFormValues,
  toActionInput,
} from "./service";
export { createAction, updateAction, deleteAction } from "./mutations";
export type { AdminActionRow, ActionInput, LookupOption, ActionFormValues } from "./service";

export const ACTIONS_FORM_VALIDATION_SCHEMA = Yup.object({
  title: Yup.string().required("Title is required"),
  more_info: Yup.string().nullable(),
  hex_colour_code: Yup.string().nullable(),
  products_used: Yup.string().nullable().url("Enter a valid product URL"),
  area_ids: Yup.array().of(Yup.string().required()).default([]),
  author_ids: Yup.array().of(Yup.string().required()).default([]),
  frequency_ids: Yup.array().of(Yup.string().required()).default([]),
});

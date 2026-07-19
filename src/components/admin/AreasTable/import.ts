import * as Yup from "yup";

export { useState } from "@/common/imports";
export { default as AdminDataTable } from "@/components/admin/DataTable/page";
export { default as AdminFormModal } from "@/components/admin/FormModal/page";
export { default as RowActionsMenu } from "@/components/admin/RowActionsMenu/page";
export { Modal } from "@/common/components";
export { default as TruncatedCell } from "@/components/admin/TruncatedCell/page";
export { useToast } from "@/context/ToastContext";
export {
  AREAS_TABLE_ITEMS_PER_PAGE,
  AREAS_TABLE_HEADING,
  AREAS_TABLE_EMPTY_TEXT,
  AREAS_TABLE_SEARCH_PLACEHOLDER,
  AREAS_TABLE_ADD_NEW_LABEL,
  AREAS_TABLE_ACTIONS_COLUMN_LABEL,
  AREAS_TABLE_COLUMNS,
  AREAS_FORM_FIELDS,
  AREAS_FORM_INITIAL_VALUES,
  AREAS_ADD_MODAL_TITLE,
  AREAS_EDIT_MODAL_TITLE,
  AREAS_VIEW_MODAL_TITLE,
  AREAS_DELETE_CONFIRM_TITLE,
  AREAS_DELETE_CONFIRM_DESCRIPTION,
  AREAS_CREATE_SUCCESS_MESSAGE,
  AREAS_UPDATE_SUCCESS_MESSAGE,
  AREAS_DELETE_SUCCESS_MESSAGE,
} from "./constant";
export { fetchPaginatedAreas } from "./service";
export { createArea, updateArea, deleteArea } from "./mutations";
export type { AdminAreaRow, AreaInput } from "./service";

export const AREAS_FORM_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Name is required"),
  attachments: Yup.string().nullable(),
});

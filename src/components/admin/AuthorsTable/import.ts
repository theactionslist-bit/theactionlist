import * as Yup from "yup";

export { useState } from "@/common/imports";
export { default as AdminDataTable } from "@/components/admin/DataTable/page";
export { default as AdminFormModal } from "@/components/admin/FormModal/page";
export { default as RowActionsMenu } from "@/components/admin/RowActionsMenu/page";
export { Modal } from "@/common/components";
export { useToast } from "@/context/ToastContext";
export {
  AUTHORS_TABLE_ITEMS_PER_PAGE,
  AUTHORS_TABLE_HEADING,
  AUTHORS_TABLE_EMPTY_TEXT,
  AUTHORS_TABLE_SEARCH_PLACEHOLDER,
  AUTHORS_TABLE_ADD_NEW_LABEL,
  AUTHORS_TABLE_ACTIONS_COLUMN_LABEL,
  AUTHORS_TABLE_COLUMNS,
  AUTHORS_FORM_FIELDS,
  AUTHORS_FORM_INITIAL_VALUES,
  AUTHORS_ADD_MODAL_TITLE,
  AUTHORS_EDIT_MODAL_TITLE,
  AUTHORS_VIEW_MODAL_TITLE,
  AUTHORS_DELETE_CONFIRM_TITLE,
  AUTHORS_DELETE_CONFIRM_DESCRIPTION,
  AUTHORS_CREATE_SUCCESS_MESSAGE,
  AUTHORS_UPDATE_SUCCESS_MESSAGE,
  AUTHORS_DELETE_SUCCESS_MESSAGE,
} from "./constant";
export { fetchPaginatedAuthors } from "./service";
export { createAuthor, updateAuthor, deleteAuthor } from "./mutations";
export type { AdminAuthorRow, AuthorInput } from "./service";

export const AUTHORS_FORM_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Name is required"),
  social_links: Yup.array().of(Yup.string()).nullable(),
});

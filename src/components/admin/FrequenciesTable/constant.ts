export const FREQUENCIES_TABLE_ITEMS_PER_PAGE = 10;
export const FREQUENCIES_TABLE_HEADING = "Frequencies";
export const FREQUENCIES_TABLE_EMPTY_TEXT = "No frequencies yet.";
export const FREQUENCIES_TABLE_SEARCH_PLACEHOLDER = "Search by name…";
export const FREQUENCIES_TABLE_ADD_NEW_LABEL = "Add New";
export const FREQUENCIES_TABLE_ACTIONS_COLUMN_LABEL = "Actions";

export const FREQUENCIES_TABLE_COLUMNS = {
  name: "Name",
  period: "Period",
  attachments: "Attachments",
  createdAt: "Created At",
  updatedAt: "Updated At",
};

export const FREQUENCIES_FORM_FIELDS = [
  { name: "name", label: "Name", control: "input", type: "text" },
  { name: "period", label: "Period", control: "input", type: "text" },
  { name: "attachments", label: "Attachments", control: "textarea", rows: 3 },
] as const;

export const FREQUENCIES_FORM_INITIAL_VALUES = {
  name: "",
  period: "",
  attachments: "",
};

export const FREQUENCIES_ADD_MODAL_TITLE = "Add Frequency";
export const FREQUENCIES_EDIT_MODAL_TITLE = "Edit Frequency";
export const FREQUENCIES_VIEW_MODAL_TITLE = "View Frequency";
export const FREQUENCIES_DELETE_CONFIRM_TITLE = "Delete this frequency?";
export const FREQUENCIES_DELETE_CONFIRM_DESCRIPTION =
  "This frequency will be permanently removed. This cannot be undone.";
export const FREQUENCIES_CREATE_SUCCESS_MESSAGE = "Frequency created.";
export const FREQUENCIES_UPDATE_SUCCESS_MESSAGE = "Frequency updated.";
export const FREQUENCIES_DELETE_SUCCESS_MESSAGE = "Frequency deleted.";

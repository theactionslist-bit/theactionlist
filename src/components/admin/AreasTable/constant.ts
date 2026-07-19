export const AREAS_TABLE_ITEMS_PER_PAGE = 10;
export const AREAS_TABLE_HEADING = "Areas of Inspiration";
export const AREAS_TABLE_EMPTY_TEXT = "No areas yet.";
export const AREAS_TABLE_SEARCH_PLACEHOLDER = "Search by name…";
export const AREAS_TABLE_ADD_NEW_LABEL = "Add New";
export const AREAS_TABLE_ACTIONS_COLUMN_LABEL = "Actions";

export const AREAS_TABLE_COLUMNS = {
  name: "Name",
  attachments: "Attachments",
  createdAt: "Created At",
  updatedAt: "Updated At",
};

export const AREAS_FORM_FIELDS = [
  { name: "name", label: "Name", control: "input", type: "text" },
  { name: "attachments", label: "Attachments", control: "textarea", rows: 3 },
] as const;

export const AREAS_FORM_INITIAL_VALUES = {
  name: "",
  attachments: "",
};

export const AREAS_ADD_MODAL_TITLE = "Add Area of Inspiration";
export const AREAS_EDIT_MODAL_TITLE = "Edit Area of Inspiration";
export const AREAS_VIEW_MODAL_TITLE = "View Area of Inspiration";
export const AREAS_DELETE_CONFIRM_TITLE = "Delete this area?";
export const AREAS_DELETE_CONFIRM_DESCRIPTION =
  "This area of inspiration will be permanently removed. This cannot be undone.";
export const AREAS_CREATE_SUCCESS_MESSAGE = "Area created.";
export const AREAS_UPDATE_SUCCESS_MESSAGE = "Area updated.";
export const AREAS_DELETE_SUCCESS_MESSAGE = "Area deleted.";

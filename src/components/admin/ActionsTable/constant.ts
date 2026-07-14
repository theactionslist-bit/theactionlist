export const ACTIONS_TABLE_ITEMS_PER_PAGE = 10;
export const ACTIONS_TABLE_HEADING = "Actions";
export const ACTIONS_TABLE_EMPTY_TEXT = "No actions yet.";
export const ACTIONS_TABLE_SEARCH_PLACEHOLDER = "Search by title…";
export const ACTIONS_TABLE_ADD_NEW_LABEL = "Add New";
export const ACTIONS_TABLE_ACTIONS_COLUMN_LABEL = "Actions";

export const ACTIONS_TABLE_COLUMNS = {
  title: "Title",
  moreInfo: "More Info",
  colour: "Colour",
  productsUsed: "Products Used",
  createdAt: "Created At",
  updatedAt: "Updated At",
};

export const ACTIONS_FORM_FIELDS = [
  { name: "title", label: "Title", control: "input", type: "text" },
  { name: "more_info", label: "More Info", control: "richtext" },
  { name: "hex_colour_code", label: "Colour (hex)", control: "input", type: "color" },
  { name: "products_used", label: "Products Used", control: "input", type: "url", placeholder: "https://…" },
] as const;

export const ACTIONS_FORM_INITIAL_VALUES = {
  title: "",
  more_info: "",
  hex_colour_code: "",
  status: "",
  products_used: "",
};

export const ACTIONS_ADD_MODAL_TITLE = "Add Action";
export const ACTIONS_EDIT_MODAL_TITLE = "Edit Action";
export const ACTIONS_VIEW_MODAL_TITLE = "View Action";
export const ACTIONS_DELETE_CONFIRM_TITLE = "Delete this action?";
export const ACTIONS_DELETE_CONFIRM_DESCRIPTION =
  "This action will be permanently removed. This cannot be undone.";
export const ACTIONS_CREATE_SUCCESS_MESSAGE = "Action created.";
export const ACTIONS_UPDATE_SUCCESS_MESSAGE = "Action updated.";
export const ACTIONS_DELETE_SUCCESS_MESSAGE = "Action deleted.";

export const AUTHORS_TABLE_ITEMS_PER_PAGE = 10;
export const AUTHORS_TABLE_HEADING = "Authors";
export const AUTHORS_TABLE_EMPTY_TEXT = "No authors yet.";
export const AUTHORS_TABLE_SEARCH_PLACEHOLDER = "Search by name…";
export const AUTHORS_TABLE_ADD_NEW_LABEL = "Add New";
export const AUTHORS_TABLE_ACTIONS_COLUMN_LABEL = "Actions";

export const AUTHORS_TABLE_COLUMNS = {
  name: "Name",
  socialLinks: "Social Links",
  createdAt: "Created At",
  updatedAt: "Updated At",
};

export const AUTHORS_FORM_FIELDS = [
  { name: "name", label: "Name", control: "input", type: "text" },
  {
    name: "social_links",
    label: "Social Links",
    control: "input",
    type: "text",
    placeholder: "https://x.com/foo, https://instagram.com/foo",
  },
] as const;

export const AUTHORS_FORM_INITIAL_VALUES = {
  name: "",
  social_links: "",
};

export const AUTHORS_ADD_MODAL_TITLE = "Add Author";
export const AUTHORS_EDIT_MODAL_TITLE = "Edit Author";
export const AUTHORS_VIEW_MODAL_TITLE = "View Author";
export const AUTHORS_DELETE_CONFIRM_TITLE = "Delete this author?";
export const AUTHORS_DELETE_CONFIRM_DESCRIPTION =
  "This author will be permanently removed. This cannot be undone.";
export const AUTHORS_CREATE_SUCCESS_MESSAGE = "Author created.";
export const AUTHORS_UPDATE_SUCCESS_MESSAGE = "Author updated.";
export const AUTHORS_DELETE_SUCCESS_MESSAGE = "Author deleted.";

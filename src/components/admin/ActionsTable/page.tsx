"use client";

import {
  useState,
  AdminDataTable,
  AdminFormModal,
  RowActionsMenu,
  Modal,
  TruncatedCell,
  useToast,
  ACTIONS_TABLE_ITEMS_PER_PAGE,
  ACTIONS_TABLE_HEADING,
  ACTIONS_TABLE_EMPTY_TEXT,
  ACTIONS_TABLE_SEARCH_PLACEHOLDER,
  ACTIONS_TABLE_ADD_NEW_LABEL,
  ACTIONS_TABLE_ACTIONS_COLUMN_LABEL,
  ACTIONS_TABLE_COLUMNS,
  ACTIONS_FORM_FIELDS,
  ACTIONS_FORM_INITIAL_VALUES,
  ACTIONS_FORM_VALIDATION_SCHEMA,
  ACTIONS_ADD_MODAL_TITLE,
  ACTIONS_EDIT_MODAL_TITLE,
  ACTIONS_VIEW_MODAL_TITLE,
  ACTIONS_DELETE_CONFIRM_TITLE,
  ACTIONS_DELETE_CONFIRM_DESCRIPTION,
  ACTIONS_CREATE_SUCCESS_MESSAGE,
  ACTIONS_UPDATE_SUCCESS_MESSAGE,
  ACTIONS_DELETE_SUCCESS_MESSAGE,
  fetchPaginatedActions,
  createAction,
  updateAction,
  deleteAction,
} from "./import";
import type { AdminActionRow, ActionInput } from "./import";

type ActionFormValues = typeof ACTIONS_FORM_INITIAL_VALUES;

function stripHtml(html: string | null): string | null {
  if (!html) return html;
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toFormValues(row: AdminActionRow): ActionFormValues {
  return {
    serial_number: row.serial_number != null ? String(row.serial_number) : "",
    title: row.title,
    more_info: row.more_info ?? "",
    hex_colour_code: row.hex_colour_code ?? "",
    status: row.status ?? "",
    products_used: row.products_used ?? "",
  };
}

export default function AdminActionsTable() {
  const { addToast } = useToast();
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedRow, setSelectedRow] = useState<AdminActionRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminActionRow | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function closeModal() {
    setModalMode(null);
    setSelectedRow(null);
  }

  async function handleSubmit(values: ActionFormValues): Promise<{ error?: string } | void> {
    // Formik coerces type="number" inputs to an actual number once filled in,
    // so serial_number may arrive as "" (empty) or a number, never a string to .trim().
    const serialNumber =
      values.serial_number === "" || values.serial_number == null
        ? null
        : Number(values.serial_number);

    const input: ActionInput = {
      serial_number: serialNumber,
      title: values.title.trim(),
      more_info: values.more_info.trim() || null,
      hex_colour_code: values.hex_colour_code.trim() || null,
      status: values.status.trim() || null,
      products_used: values.products_used.trim() || null,
    };

    const result =
      modalMode === "edit" && selectedRow
        ? await updateAction(selectedRow.id, input)
        : await createAction(input);

    if (result.error) {
      addToast(result.error, "error");
      return result;
    }

    addToast(
      modalMode === "edit" ? ACTIONS_UPDATE_SUCCESS_MESSAGE : ACTIONS_CREATE_SUCCESS_MESSAGE,
      "success",
    );
    setRefreshKey((k) => k + 1);
    return result;
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const result = await deleteAction(deleteTarget.id);
    if (result.error) {
      addToast(result.error, "error");
      return;
    }
    addToast(ACTIONS_DELETE_SUCCESS_MESSAGE, "success");
    setRefreshKey((k) => k + 1);
  }

  const modalTitle =
    modalMode === "edit"
      ? ACTIONS_EDIT_MODAL_TITLE
      : modalMode === "view"
        ? ACTIONS_VIEW_MODAL_TITLE
        : ACTIONS_ADD_MODAL_TITLE;

  return (
    <>
      <AdminDataTable<AdminActionRow>
        heading={ACTIONS_TABLE_HEADING}
        emptyText={ACTIONS_TABLE_EMPTY_TEXT}
        itemsPerPage={ACTIONS_TABLE_ITEMS_PER_PAGE}
        searchPlaceholder={ACTIONS_TABLE_SEARCH_PLACEHOLDER}
        addNewLabel={ACTIONS_TABLE_ADD_NEW_LABEL}
        onAddNew={() => setModalMode("add")}
        refreshKey={refreshKey}
        fetchPage={fetchPaginatedActions}
        rowKey={(row) => row.id}
        columns={[
          {
            key: "serialNumber",
            label: ACTIONS_TABLE_COLUMNS.serialNumber,
            render: (row) => row.serial_number ?? "—",
          },
          {
            key: "title",
            label: ACTIONS_TABLE_COLUMNS.title,
            render: (row) => row.title,
          },
          {
            key: "moreInfo",
            label: ACTIONS_TABLE_COLUMNS.moreInfo,
            render: (row) => <TruncatedCell text={stripHtml(row.more_info)} maxWidthClass="max-w-100" />,
          },
          {
            key: "colour",
            label: ACTIONS_TABLE_COLUMNS.colour,
            render: (row) =>
              row.hex_colour_code ? (
                <span className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border border-[#DBDBDB]"
                    style={{ backgroundColor: row.hex_colour_code }}
                  />
                  {row.hex_colour_code}
                </span>
              ) : (
                "—"
              ),
          },
          {
            key: "productsUsed",
            label: ACTIONS_TABLE_COLUMNS.productsUsed,
            render: (row) =>
              row.products_used ? (
                <a
                  href={row.products_used}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={row.products_used}
                  className="block max-w-50 truncate text-[#C27E7A] underline-offset-2 hover:underline"
                >
                  {row.products_used}
                </a>
              ) : (
                "—"
              ),
          },
          {
            key: "createdAt",
            label: ACTIONS_TABLE_COLUMNS.createdAt,
            render: (row) => new Date(row.created_at).toLocaleDateString(),
          },
          {
            key: "updatedAt",
            label: ACTIONS_TABLE_COLUMNS.updatedAt,
            render: (row) => (row.updated_at ? new Date(row.updated_at).toLocaleDateString() : "—"),
          },
          {
            key: "rowActions",
            label: ACTIONS_TABLE_ACTIONS_COLUMN_LABEL,
            render: (row) => (
              <RowActionsMenu
                actions={[
                  { label: "View", onClick: () => { setSelectedRow(row); setModalMode("view"); } },
                  { label: "Edit", onClick: () => { setSelectedRow(row); setModalMode("edit"); } },
                  { label: "Delete", onClick: () => setDeleteTarget(row), variant: "danger" },
                ]}
              />
            ),
          },
        ]}
      />

      <AdminFormModal<ActionFormValues>
        isOpen={modalMode !== null}
        mode={modalMode ?? "add"}
        title={modalTitle}
        fields={ACTIONS_FORM_FIELDS}
        initialValues={selectedRow ? toFormValues(selectedRow) : ACTIONS_FORM_INITIAL_VALUES}
        validationSchema={ACTIONS_FORM_VALIDATION_SCHEMA}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title={ACTIONS_DELETE_CONFIRM_TITLE}
        description={ACTIONS_DELETE_CONFIRM_DESCRIPTION}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onPrimaryAction={handleConfirmDelete}
      />
    </>
  );
}

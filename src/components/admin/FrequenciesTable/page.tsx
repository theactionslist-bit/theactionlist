"use client";

import {
  useState,
  AdminDataTable,
  AdminFormModal,
  RowActionsMenu,
  Modal,
  TruncatedCell,
  useToast,
  FREQUENCIES_TABLE_ITEMS_PER_PAGE,
  FREQUENCIES_TABLE_HEADING,
  FREQUENCIES_TABLE_EMPTY_TEXT,
  FREQUENCIES_TABLE_SEARCH_PLACEHOLDER,
  FREQUENCIES_TABLE_ADD_NEW_LABEL,
  FREQUENCIES_TABLE_ACTIONS_COLUMN_LABEL,
  FREQUENCIES_TABLE_COLUMNS,
  FREQUENCIES_FORM_FIELDS,
  FREQUENCIES_FORM_INITIAL_VALUES,
  FREQUENCIES_FORM_VALIDATION_SCHEMA,
  FREQUENCIES_ADD_MODAL_TITLE,
  FREQUENCIES_EDIT_MODAL_TITLE,
  FREQUENCIES_VIEW_MODAL_TITLE,
  FREQUENCIES_DELETE_CONFIRM_TITLE,
  FREQUENCIES_DELETE_CONFIRM_DESCRIPTION,
  FREQUENCIES_CREATE_SUCCESS_MESSAGE,
  FREQUENCIES_UPDATE_SUCCESS_MESSAGE,
  FREQUENCIES_DELETE_SUCCESS_MESSAGE,
  fetchPaginatedFrequencies,
  createFrequency,
  updateFrequency,
  deleteFrequency,
} from "./import";
import type { AdminFrequencyRow, FrequencyInput } from "./import";

type FrequencyFormValues = typeof FREQUENCIES_FORM_INITIAL_VALUES;

function toFormValues(row: AdminFrequencyRow): FrequencyFormValues {
  return {
    name: row.name,
    period: row.period ?? "",
    attachments: row.attachments ?? "",
  };
}

export default function AdminFrequenciesTable() {
  const { addToast } = useToast();
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedRow, setSelectedRow] = useState<AdminFrequencyRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminFrequencyRow | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function closeModal() {
    setModalMode(null);
    setSelectedRow(null);
  }

  async function handleSubmit(values: FrequencyFormValues): Promise<{ error?: string } | void> {
    const input: FrequencyInput = {
      name: values.name.trim(),
      period: values.period.trim() || null,
      attachments: values.attachments.trim() || null,
    };

    const result =
      modalMode === "edit" && selectedRow
        ? await updateFrequency(selectedRow.id, input)
        : await createFrequency(input);

    if (result.error) {
      addToast(result.error, "error");
      return result;
    }

    addToast(
      modalMode === "edit" ? FREQUENCIES_UPDATE_SUCCESS_MESSAGE : FREQUENCIES_CREATE_SUCCESS_MESSAGE,
      "success",
    );
    setRefreshKey((k) => k + 1);
    return result;
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const result = await deleteFrequency(deleteTarget.id);
    if (result.error) {
      addToast(result.error, "error");
      return;
    }
    addToast(FREQUENCIES_DELETE_SUCCESS_MESSAGE, "success");
    setRefreshKey((k) => k + 1);
  }

  const modalTitle =
    modalMode === "edit"
      ? FREQUENCIES_EDIT_MODAL_TITLE
      : modalMode === "view"
        ? FREQUENCIES_VIEW_MODAL_TITLE
        : FREQUENCIES_ADD_MODAL_TITLE;

  return (
    <>
      <AdminDataTable<AdminFrequencyRow>
        heading={FREQUENCIES_TABLE_HEADING}
        emptyText={FREQUENCIES_TABLE_EMPTY_TEXT}
        itemsPerPage={FREQUENCIES_TABLE_ITEMS_PER_PAGE}
        searchPlaceholder={FREQUENCIES_TABLE_SEARCH_PLACEHOLDER}
        addNewLabel={FREQUENCIES_TABLE_ADD_NEW_LABEL}
        onAddNew={() => setModalMode("add")}
        refreshKey={refreshKey}
        fetchPage={fetchPaginatedFrequencies}
        rowKey={(row) => row.id}
        columns={[
          { key: "name", label: FREQUENCIES_TABLE_COLUMNS.name, render: (row) => row.name },
          {
            key: "period",
            label: FREQUENCIES_TABLE_COLUMNS.period,
            render: (row) => row.period ?? "—",
          },
          {
            key: "attachments",
            label: FREQUENCIES_TABLE_COLUMNS.attachments,
            render: (row) => <TruncatedCell text={row.attachments} maxWidthClass="max-w-55" />,
          },
          {
            key: "createdAt",
            label: FREQUENCIES_TABLE_COLUMNS.createdAt,
            render: (row) => new Date(row.created_at).toLocaleDateString(),
          },
          {
            key: "updatedAt",
            label: FREQUENCIES_TABLE_COLUMNS.updatedAt,
            render: (row) => (row.updated_at ? new Date(row.updated_at).toLocaleDateString() : "—"),
          },
          {
            key: "rowActions",
            label: FREQUENCIES_TABLE_ACTIONS_COLUMN_LABEL,
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

      <AdminFormModal<FrequencyFormValues>
        isOpen={modalMode !== null}
        mode={modalMode ?? "add"}
        title={modalTitle}
        fields={FREQUENCIES_FORM_FIELDS}
        initialValues={selectedRow ? toFormValues(selectedRow) : FREQUENCIES_FORM_INITIAL_VALUES}
        validationSchema={FREQUENCIES_FORM_VALIDATION_SCHEMA}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title={FREQUENCIES_DELETE_CONFIRM_TITLE}
        description={FREQUENCIES_DELETE_CONFIRM_DESCRIPTION}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onPrimaryAction={handleConfirmDelete}
      />
    </>
  );
}

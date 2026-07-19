"use client";

import {
  useState,
  AdminDataTable,
  AdminFormModal,
  RowActionsMenu,
  Modal,
  TruncatedCell,
  useToast,
  AREAS_TABLE_ITEMS_PER_PAGE,
  AREAS_TABLE_HEADING,
  AREAS_TABLE_EMPTY_TEXT,
  AREAS_TABLE_SEARCH_PLACEHOLDER,
  AREAS_TABLE_ADD_NEW_LABEL,
  AREAS_TABLE_ACTIONS_COLUMN_LABEL,
  AREAS_TABLE_COLUMNS,
  AREAS_FORM_FIELDS,
  AREAS_FORM_INITIAL_VALUES,
  AREAS_FORM_VALIDATION_SCHEMA,
  AREAS_ADD_MODAL_TITLE,
  AREAS_EDIT_MODAL_TITLE,
  AREAS_VIEW_MODAL_TITLE,
  AREAS_DELETE_CONFIRM_TITLE,
  AREAS_DELETE_CONFIRM_DESCRIPTION,
  AREAS_CREATE_SUCCESS_MESSAGE,
  AREAS_UPDATE_SUCCESS_MESSAGE,
  AREAS_DELETE_SUCCESS_MESSAGE,
  fetchPaginatedAreas,
  createArea,
  updateArea,
  deleteArea,
} from "./import";
import type { AdminAreaRow, AreaInput } from "./import";

type AreaFormValues = typeof AREAS_FORM_INITIAL_VALUES;

function toFormValues(row: AdminAreaRow): AreaFormValues {
  return {
    name: row.name,
    attachments: row.attachments ?? "",
  };
}

export default function AdminAreasTable() {
  const { addToast } = useToast();
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedRow, setSelectedRow] = useState<AdminAreaRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminAreaRow | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function closeModal() {
    setModalMode(null);
    setSelectedRow(null);
  }

  async function handleSubmit(values: AreaFormValues): Promise<{ error?: string } | void> {
    const input: AreaInput = {
      name: values.name.trim(),
      attachments: values.attachments.trim() || null,
    };

    const result =
      modalMode === "edit" && selectedRow
        ? await updateArea(selectedRow.id, input)
        : await createArea(input);

    if (result.error) {
      addToast(result.error, "error");
      return result;
    }

    addToast(
      modalMode === "edit" ? AREAS_UPDATE_SUCCESS_MESSAGE : AREAS_CREATE_SUCCESS_MESSAGE,
      "success",
    );
    setRefreshKey((k) => k + 1);
    return result;
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const result = await deleteArea(deleteTarget.id);
    if (result.error) {
      addToast(result.error, "error");
      return;
    }
    addToast(AREAS_DELETE_SUCCESS_MESSAGE, "success");
    setRefreshKey((k) => k + 1);
  }

  const modalTitle =
    modalMode === "edit"
      ? AREAS_EDIT_MODAL_TITLE
      : modalMode === "view"
        ? AREAS_VIEW_MODAL_TITLE
        : AREAS_ADD_MODAL_TITLE;

  return (
    <>
      <AdminDataTable<AdminAreaRow>
        heading={AREAS_TABLE_HEADING}
        emptyText={AREAS_TABLE_EMPTY_TEXT}
        itemsPerPage={AREAS_TABLE_ITEMS_PER_PAGE}
        searchPlaceholder={AREAS_TABLE_SEARCH_PLACEHOLDER}
        addNewLabel={AREAS_TABLE_ADD_NEW_LABEL}
        onAddNew={() => setModalMode("add")}
        refreshKey={refreshKey}
        fetchPage={fetchPaginatedAreas}
        rowKey={(row) => row.id}
        columns={[
          { key: "name", label: AREAS_TABLE_COLUMNS.name, render: (row) => row.name },
          {
            key: "attachments",
            label: AREAS_TABLE_COLUMNS.attachments,
            render: (row) => <TruncatedCell text={row.attachments} maxWidthClass="max-w-55" />,
          },
          {
            key: "createdAt",
            label: AREAS_TABLE_COLUMNS.createdAt,
            render: (row) => new Date(row.created_at).toLocaleDateString(),
          },
          {
            key: "updatedAt",
            label: AREAS_TABLE_COLUMNS.updatedAt,
            render: (row) => (row.updated_at ? new Date(row.updated_at).toLocaleDateString() : "—"),
          },
          {
            key: "rowActions",
            label: AREAS_TABLE_ACTIONS_COLUMN_LABEL,
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

      <AdminFormModal<AreaFormValues>
        isOpen={modalMode !== null}
        mode={modalMode ?? "add"}
        title={modalTitle}
        fields={AREAS_FORM_FIELDS}
        initialValues={selectedRow ? toFormValues(selectedRow) : AREAS_FORM_INITIAL_VALUES}
        validationSchema={AREAS_FORM_VALIDATION_SCHEMA}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title={AREAS_DELETE_CONFIRM_TITLE}
        description={AREAS_DELETE_CONFIRM_DESCRIPTION}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onPrimaryAction={handleConfirmDelete}
      />
    </>
  );
}

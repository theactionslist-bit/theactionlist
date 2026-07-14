"use client";

import {
  useState,
  AdminDataTable,
  AdminFormModal,
  RowActionsMenu,
  Modal,
  useToast,
  AUTHORS_TABLE_ITEMS_PER_PAGE,
  AUTHORS_TABLE_HEADING,
  AUTHORS_TABLE_EMPTY_TEXT,
  AUTHORS_TABLE_SEARCH_PLACEHOLDER,
  AUTHORS_TABLE_ADD_NEW_LABEL,
  AUTHORS_TABLE_ACTIONS_COLUMN_LABEL,
  AUTHORS_TABLE_COLUMNS,
  AUTHORS_FORM_FIELDS,
  AUTHORS_FORM_INITIAL_VALUES,
  AUTHORS_FORM_VALIDATION_SCHEMA,
  AUTHORS_ADD_MODAL_TITLE,
  AUTHORS_EDIT_MODAL_TITLE,
  AUTHORS_VIEW_MODAL_TITLE,
  AUTHORS_DELETE_CONFIRM_TITLE,
  AUTHORS_DELETE_CONFIRM_DESCRIPTION,
  AUTHORS_CREATE_SUCCESS_MESSAGE,
  AUTHORS_UPDATE_SUCCESS_MESSAGE,
  AUTHORS_DELETE_SUCCESS_MESSAGE,
  fetchPaginatedAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "./import";
import type { AdminAuthorRow, AuthorInput } from "./import";

type AuthorFormValues = typeof AUTHORS_FORM_INITIAL_VALUES;

function toFormValues(row: AdminAuthorRow): AuthorFormValues {
  return {
    name: row.name,
    social_links: row.social_links ?? [],
  };
}

export default function AdminAuthorsTable() {
  const { addToast } = useToast();
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedRow, setSelectedRow] = useState<AdminAuthorRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminAuthorRow | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function closeModal() {
    setModalMode(null);
    setSelectedRow(null);
  }

  async function handleSubmit(values: AuthorFormValues): Promise<{ error?: string } | void> {
    const cleanedLinks = values.social_links.map((link) => link.trim()).filter(Boolean);

    const input: AuthorInput = {
      name: values.name.trim(),
      social_links: cleanedLinks.length ? cleanedLinks : null,
    };

    const result =
      modalMode === "edit" && selectedRow
        ? await updateAuthor(selectedRow.id, input)
        : await createAuthor(input);

    if (result.error) {
      addToast(result.error, "error");
      return result;
    }

    addToast(
      modalMode === "edit" ? AUTHORS_UPDATE_SUCCESS_MESSAGE : AUTHORS_CREATE_SUCCESS_MESSAGE,
      "success",
    );
    setRefreshKey((k) => k + 1);
    return result;
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const result = await deleteAuthor(deleteTarget.id);
    if (result.error) {
      addToast(result.error, "error");
      return;
    }
    addToast(AUTHORS_DELETE_SUCCESS_MESSAGE, "success");
    setRefreshKey((k) => k + 1);
  }

  const modalTitle =
    modalMode === "edit"
      ? AUTHORS_EDIT_MODAL_TITLE
      : modalMode === "view"
        ? AUTHORS_VIEW_MODAL_TITLE
        : AUTHORS_ADD_MODAL_TITLE;

  return (
    <>
      <AdminDataTable<AdminAuthorRow>
        heading={AUTHORS_TABLE_HEADING}
        emptyText={AUTHORS_TABLE_EMPTY_TEXT}
        itemsPerPage={AUTHORS_TABLE_ITEMS_PER_PAGE}
        searchPlaceholder={AUTHORS_TABLE_SEARCH_PLACEHOLDER}
        addNewLabel={AUTHORS_TABLE_ADD_NEW_LABEL}
        onAddNew={() => setModalMode("add")}
        refreshKey={refreshKey}
        fetchPage={fetchPaginatedAuthors}
        rowKey={(row) => row.id}
        columns={[
          { key: "name", label: AUTHORS_TABLE_COLUMNS.name, render: (row) => row.name },
          {
            key: "socialLinks",
            label: AUTHORS_TABLE_COLUMNS.socialLinks,
            render: (row) => {
              const links = row.social_links ?? [];
              if (links.length === 0) return "—";
              return (
                <ol className="flex flex-col gap-0.5">
                  {links.map((link, i) => (
                    <li key={i} className="flex gap-1">
                      <span className="shrink-0 text-[#10101099]">{i + 1}.</span>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link}
                        className="block max-w-40 truncate text-[#C27E7A] underline-offset-2 hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ol>
              );
            },
          },
          {
            key: "createdAt",
            label: AUTHORS_TABLE_COLUMNS.createdAt,
            render: (row) => new Date(row.created_at).toLocaleDateString(),
          },
          {
            key: "updatedAt",
            label: AUTHORS_TABLE_COLUMNS.updatedAt,
            render: (row) => (row.updated_at ? new Date(row.updated_at).toLocaleDateString() : "—"),
          },
          {
            key: "rowActions",
            label: AUTHORS_TABLE_ACTIONS_COLUMN_LABEL,
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

      <AdminFormModal<AuthorFormValues>
        isOpen={modalMode !== null}
        mode={modalMode ?? "add"}
        title={modalTitle}
        fields={AUTHORS_FORM_FIELDS}
        initialValues={selectedRow ? toFormValues(selectedRow) : AUTHORS_FORM_INITIAL_VALUES}
        validationSchema={AUTHORS_FORM_VALIDATION_SCHEMA}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title={AUTHORS_DELETE_CONFIRM_TITLE}
        description={AUTHORS_DELETE_CONFIRM_DESCRIPTION}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onPrimaryAction={handleConfirmDelete}
      />
    </>
  );
}

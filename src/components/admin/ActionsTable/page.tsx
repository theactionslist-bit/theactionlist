"use client";

import {
  useState,
  useRouter,
  AdminDataTable,
  AdminFormModal,
  RowActionsMenu,
  Modal,
  TruncatedCell,
  useToast,
  useActionFormFields,
  ACTIONS_TABLE_ITEMS_PER_PAGE,
  ACTIONS_TABLE_HEADING,
  ACTIONS_TABLE_EMPTY_TEXT,
  ACTIONS_TABLE_SEARCH_PLACEHOLDER,
  ACTIONS_TABLE_ADD_NEW_LABEL,
  ACTIONS_TABLE_ACTIONS_COLUMN_LABEL,
  ACTIONS_TABLE_COLUMNS,
  ACTIONS_FORM_INITIAL_VALUES,
  ACTIONS_FORM_VALIDATION_SCHEMA,
  ACTIONS_VIEW_MODAL_TITLE,
  ACTIONS_DELETE_CONFIRM_TITLE,
  ACTIONS_DELETE_CONFIRM_DESCRIPTION,
  ACTIONS_DELETE_SUCCESS_MESSAGE,
  ACTIONS_NEW_HREF,
  actionEditHref,
  fetchPaginatedActions,
  toFormValues,
  deleteAction,
} from "./import";
import type { AdminActionRow, ActionFormValues } from "./import";

const HTML_ENTITY_FALLBACKS: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

function stripHtml(html: string | null): string | null {
  if (!html) return html;
  const withoutTags = html.replace(/<[^>]*>/g, " ");

  if (typeof document === "undefined") {
    const decoded = withoutTags.replace(
      /&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;/g,
      (entity) => HTML_ENTITY_FALLBACKS[entity],
    );
    return decoded.replace(/\s+/g, " ").trim();
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = withoutTags;
  return textarea.value.replace(/\s+/g, " ").trim();
}

export default function AdminActionsTable() {
  const router = useRouter();
  const { addToast } = useToast();
  const fields = useActionFormFields();
  const [viewRow, setViewRow] = useState<AdminActionRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminActionRow | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

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

  return (
    <>
      <AdminDataTable<AdminActionRow>
        heading={ACTIONS_TABLE_HEADING}
        emptyText={ACTIONS_TABLE_EMPTY_TEXT}
        itemsPerPage={ACTIONS_TABLE_ITEMS_PER_PAGE}
        searchPlaceholder={ACTIONS_TABLE_SEARCH_PLACEHOLDER}
        addNewLabel={ACTIONS_TABLE_ADD_NEW_LABEL}
        onAddNew={() => router.push(ACTIONS_NEW_HREF)}
        refreshKey={refreshKey}
        fetchPage={fetchPaginatedActions}
        rowKey={(row) => row.id}
        columns={[
          {
            key: "title",
            label: ACTIONS_TABLE_COLUMNS.title,
            render: (row) => row.title,
          },
          {
            key: "moreInfo",
            label: ACTIONS_TABLE_COLUMNS.moreInfo,
            render: (row) => <TruncatedCell text={stripHtml(row.more_info)} maxWidthClass="max-w-90" />,
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
              row.products_used.length > 0 ? (
                <div className="flex max-w-50 flex-col gap-1">
                  {row.products_used.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={url}
                      className="block truncate text-[#C27E7A] underline-offset-2 hover:underline"
                    >
                      {url}
                    </a>
                  ))}
                </div>
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
                  { label: "View", onClick: () => setViewRow(row) },
                  { label: "Edit", onClick: () => router.push(actionEditHref(row.id)) },
                  { label: "Delete", onClick: () => setDeleteTarget(row), variant: "danger" },
                ]}
              />
            ),
          },
        ]}
      />

      <AdminFormModal<ActionFormValues>
        isOpen={viewRow !== null}
        mode="view"
        title={ACTIONS_VIEW_MODAL_TITLE}
        fields={fields}
        initialValues={viewRow ? toFormValues(viewRow) : ACTIONS_FORM_INITIAL_VALUES}
        validationSchema={ACTIONS_FORM_VALIDATION_SCHEMA}
        onClose={() => setViewRow(null)}
        onSubmit={async () => {}}
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

import AdminActionsTable from "@/components/admin/ActionsTable/page";

export default function AdminActionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-normal text-[#101010]">Actions</h1>
        <p className="mt-1 font-sans text-sm text-[#10101099]">
          Manage all actions published on The Action List.
        </p>
      </div>

      <AdminActionsTable />
    </div>
  );
}

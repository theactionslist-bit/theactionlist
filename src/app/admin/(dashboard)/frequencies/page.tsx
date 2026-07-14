import AdminFrequenciesTable from "@/components/admin/FrequenciesTable/page";

export default function AdminFrequenciesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-normal text-[#101010]">Frequencies</h1>
        <p className="mt-1 font-sans text-sm text-[#10101099]">
          Manage the recurrence frequencies assigned to actions.
        </p>
      </div>

      <AdminFrequenciesTable />
    </div>
  );
}

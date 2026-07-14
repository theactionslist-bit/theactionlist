import AdminAuthorsTable from "@/components/admin/AuthorsTable/page";

export default function AdminAuthorsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-normal text-[#101010]">Authors</h1>
        <p className="mt-1 font-sans text-sm text-[#10101099]">
          Manage the authors credited across actions.
        </p>
      </div>

      <AdminAuthorsTable />
    </div>
  );
}

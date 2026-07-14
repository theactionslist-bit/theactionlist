import AdminAreasTable from "@/components/admin/AreasTable/page";

export default function AdminAreasPage() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-normal text-[#101010]">Areas of Inspiration</h1>
        <p className="mt-1 font-sans text-sm text-[#10101099]">
          Manage the areas of inspiration used across actions.
        </p>
      </div>

      <AdminAreasTable />
    </div>
  );
}

import { requireAdminSession } from "@/lib/admin/auth";
import AdminDashboardShell from "@/components/admin/DashboardShell/page";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  // TEMP: admin session guard disabled while building the dashboard UI — re-enable before shipping.
  // await requireAdminSession();

  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}

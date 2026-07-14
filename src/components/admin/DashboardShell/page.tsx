"use client";

import { useState, AdminHeader, AdminSidebar, AdminSidebarToggleButton } from "./import";

interface AdminDashboardShellProps {
  children: React.ReactNode;
}

export default function AdminDashboardShell({ children }: AdminDashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader
        rightSlot={<AdminSidebarToggleButton onClick={() => setMobileOpen(true)} />}
      />
      <div className="flex flex-1 min-w-0">
        <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
        <main className="flex-1 min-w-0 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

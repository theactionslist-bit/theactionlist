"use client";

import { useState, AdminHeader, AdminSidebar, AdminSidebarToggleButton } from "./import";

interface AdminDashboardShellProps {
  children: React.ReactNode;
}

export default function AdminDashboardShell({ children }: AdminDashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-linear-to-b from-white via-white to-[#D89593]/20">
      <AdminHeader
        rightSlot={<AdminSidebarToggleButton onClick={() => setMobileOpen(true)} />}
      />
      <div className="flex flex-1 min-w-0 overflow-hidden">
        <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
        <main className="flex-1 min-w-0 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

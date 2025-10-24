// /app/dashboard/layout.js
"use client";
import { useState } from "react";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6 flex-1 overflow-auto">
            {children}
        </main>
      </div>
    </div>
  );
}

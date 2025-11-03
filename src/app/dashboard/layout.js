// /app/dashboard/layout.js
"use client";

import { useEffect, useState } from "react";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

   // Multi-branch support
  const branches = user?.locations || [];
  const [selectedBranch, setSelectedBranch] = useState(branches[0]?._id || "");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || !user)
    return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        role={user.role}
        branches={branches.map(b => ({ id: b._id, name: b.name }))}
        selectedBranchId={selectedBranch}
        onBranchChange={setSelectedBranch}
      />
      <div className="flex-1 flex flex-col">
        <Topbar user={user} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

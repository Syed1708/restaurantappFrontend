// /app/dashboard/_components/Sidebar.js
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useMemo } from "react";

export default function Sidebar({ open, setOpen, role, branches = [], selectedBranchId, onBranchChange }) {
  const pathname = usePathname();

  const allLinks = useMemo(() => ({
    admin: [
      { href: "/dashboard/admin", label: "Overview" },
      { href: "/dashboard/admin/users", label: "Users" },
      { href: "/dashboard/admin/locations", label: "Locations" },
    ],
    manager: [
      { href: "/dashboard/manager", label: "Orders" },
      { href: "/dashboard/manager/staff", label: "Staff" },
    ],
    waiter: [
      { href: "/dashboard/waiter", label: "Tables" },
      { href: "/dashboard/waiter/orders", label: "Orders" },
    ],
    chef: [
      { href: "/dashboard/chef", label: "Kitchen" },
      { href: "/dashboard/chef/menu", label: "Menu" },
    ],
  }), [role]);

  const links = allLinks[role] || [];

  return (
    <>
      {/* Mobile toggle button */}
      {!open && (
        <button
          aria-label="Open sidebar"
          className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.aside
            key="sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed md:relative w-64 h-full bg-gray-900 text-white flex flex-col z-40"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
              <span className="text-lg font-bold">Dashboard</span>
              <button
                aria-label="Close sidebar"
                className="md:hidden text-gray-300 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Branch selector */}
            {branches.length > 0 && (
              <div className="p-3 border-b border-gray-700">
                <select
                  value={selectedBranchId}
                  onChange={(e) => onBranchChange?.(e.target.value)}
                  className="w-full bg-gray-800 text-white p-2 rounded"
                  aria-label="Select branch"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {links.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block px-4 py-2 rounded transition ${
                      active ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 w-1 h-full bg-blue-500 rounded-r"
                      />
                    )}
                  </Link>
                );
              })}
              {links.length === 0 && (
                <p className="p-4 text-sm text-gray-400">No links available for this role</p>
              )}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Background overlay */}
      {open && (
        <motion.div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  );
}

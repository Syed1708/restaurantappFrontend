// /components/Sidebar.js
"use client";

import { useAuth } from "@/context/AuthContext";

const linksByRole = {
  admin: [
    { name: "Dashboard", href: "/dashboard/admin" },
    { name: "Users", href: "/dashboard/admin/users" },
    { name: "Locations", href: "/dashboard/admin/locations" },
  ],
  manager: [
    { name: "Dashboard", href: "/dashboard/manager" },
    { name: "Orders", href: "/dashboard/manager/orders" },
  ],
  waiter: [
    { name: "Dashboard", href: "/dashboard/waiter" },
    { name: "Orders", href: "/dashboard/waiter/orders" },
  ],
  chef: [
    { name: "Dashboard", href: "/dashboard/chef" },
    { name: "Kitchen", href: "/dashboard/chef/kitchen" },
  ],
};

export default function Sidebar({ open }) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside className={`bg-gray-800 text-white h-full transition-all ${open ? "w-64" : "w-16"}`}>
      <div className="p-4 text-lg font-bold">App</div>
      <nav className="mt-4 space-y-2">
        {linksByRole[user.role]?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block p-2 hover:bg-gray-700 rounded"
          >
            {open ? link.name : link.name[0]}
          </a>
        ))}
      </nav>
    </aside>
  );
}

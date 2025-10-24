// /components/Topbar.js
"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Topbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);


  return (
    <div className="bg-gray-100 p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="p-2 bg-gray-300 rounded">☰</button>
      <div className="relative">
        <button onClick={() => setDropdown(!dropdown)} className="flex items-center space-x-2">
          <span>{user?.name}</span>
          <img src="/avatar.png" className="w-8 h-8 rounded-full" />
        </button>
        {dropdown && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow w-40">
            <button onClick={logout} className="block w-full text-left p-2 hover:bg-gray-200">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "../protectedRoutes/ProtectedRoute";

function DashboardContent() {
  const {user, logout} = useAuth(); // 👈 Get user info here

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        Welcome, {user.name} 👋
      </h1>
      <p className="text-gray-600">Role: {user.role}</p>
      {user.permissions && user.permissions.length > 0 && (
        <ul className="mt-2 list-disc pl-6 text-sm">
          {user.permissions.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
            <button onClick={logout}>Logout</button>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

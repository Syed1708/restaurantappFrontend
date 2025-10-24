"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import api from "@/lib/api";
import { registerSchema } from "@/lib/zodSchemas";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "manager", "chef", "waiter"]),
  location: z.string().min(1, "Location is required"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "waiter",
    location: "",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

    const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await api.get("/locations");
        setLocations(res.data);
      } catch (err) {
        console.error("Failed to load locations", err);
      }
    }
    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Validate with Zod
    const parsed = registerSchema.safeParse(form);

    if (!parsed.success) {
      // Extract errors in a friendly way
      const fieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return; // Stop submission if validation fails
    }

    // Step 2: Proceed with login API
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      console.log("register success:", res.data);
      // You can store user in context here
      // redirect to dashboard, etc.
      router.push("/login");
    } catch (err) {
        console.error("Registration failed:", err.response?.data || err.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full border p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="chef">Chef</option>
          <option value="waiter">Waiter</option>
        </select>

        {/* ✅ Location Dropdown */}
        <select
          name="location"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={form.location}
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc._id} value={loc._id}>
              {loc.name}
            </option>
          ))}
        </select>
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

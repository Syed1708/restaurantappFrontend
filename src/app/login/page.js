"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { loginSchema } from "@/lib/zodSchemas";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear individual field error
  };

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user){
     router.replace("/dashboard");  
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Validate with Zod
    const parsed = loginSchema.safeParse(form);

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
      const res = await login(form.email, form.password);
      console.log("Login success:", res.data);
      // You can store user in context here
      // redirect to dashboard, etc.
      router.push("/dashboard");
    } catch (err) {
      if (err.response?.status === 401) {
        setErrors({ password: "Invalid email or password" });
      } else {
        console.error("Login failed:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto p-6">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { loginSchema } from "@/lib/zodSchemas";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user,authLoading, login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear individual field error
  };

  // ✅ Redirect if already logged in


  useEffect(() => {
    if (!authLoading && user) {
      if (user.role === "admin") router.replace("/dashboard/admin");
      else if (user.role === "manager") router.replace("/dashboard/manager");
      else if (user.role === "waiter") router.replace("/dashboard/waiter");
      else if (user.role === "chef") router.replace("/dashboard/chef");
      else router.replace("/dashboard");
    }
}, [user, router, authLoading]);


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
    const res = await login(form.email, form.password); // call login from context

    
    } catch (err) {
     
      setErrors(err)
    
    } finally {
      setLoading(false);
    }
  };

    if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Checking session...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4">
      {errors.message && (
        <p className="text-red-600 text-sm font-medium">{errors.message}</p>
      )}

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full"
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>

    </div>
  );
}

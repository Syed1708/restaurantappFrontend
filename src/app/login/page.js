"use client"
import { loginSchema } from "@/lib/zodSchemas";
import api from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    // Validate form
    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = {};
      parsed.error.issues.forEach(issue => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
        console.log(form);
        
      const res = await api.post("api/auth/login", form);

      console.log(res.data);
      
      const { user, accessToken } = res.data;

      console.log("res", res);
      
      // store token
      localStorage.setItem("accessToken", accessToken);

      // redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
    //   console.error(err);
      setGeneralError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded">
      <h1 className="text-xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-2"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        {generalError && <p className="text-red-500">{generalError}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

"use client";

import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full text-center bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-red-100 p-4">
            <ShieldAlert className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page. Please contact your
          administrator if you think this is a mistake.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login">
            <Button className="w-full sm:w-auto">Go to Login</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

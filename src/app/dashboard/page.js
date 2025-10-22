import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect server-side if no session
    return (
      <div className="p-6 text-center">
        <h2>Unauthorized</h2>
        <p>Please <a href="/login" className="text-blue-500">login</a>.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome {session.user.name}</h1>
      <p>Your access token (for API calls):</p>
      <pre className="bg-gray-100 p-2 text-xs rounded">
        {session.accessToken}
      </pre>
    </div>
  );
}

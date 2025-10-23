import api from "@/lib/api";

export default async function DashboardPage({ cookies }) {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return (
      <div className="p-6 text-center">
        <h2>Unauthorized</h2>
        <p>
          Please <a href="/login" className="text-blue-500">login</a>.
        </p>
      </div>
    );
  }

  try {
    const res = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = res.data.user;

    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Welcome {user.name}</h1>
        <p>Your role: {user.role}</p>
      </div>
    );
  } catch (err) {
    return <p>Failed to load user. Please login again.</p>;
  }
}

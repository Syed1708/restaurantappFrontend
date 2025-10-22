import { serverApi } from "@/lib/serverApi";

export default async function DashboardPage() {
  const api = await serverApi();
  const res = await api.get("/orders");
  const orders = res.data;

  return (
    <div>
      <h1>Orders</h1>
      <pre>{JSON.stringify(orders, null, 2)}</pre>
    </div>
  );
}

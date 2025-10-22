import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function serverApi() {
  const session = await getServerSession(authOptions);

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (session?.accessToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${session.accessToken}`;
  }

  return instance;
}

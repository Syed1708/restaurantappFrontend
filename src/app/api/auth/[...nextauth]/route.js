import NextAuth from "next-auth"
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);
console.log("✅ NextAuth route mounted")


export { handler as GET, handler as POST };



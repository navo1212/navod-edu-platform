import API from "../../../utils/api";
import Layout from "../../../components/Layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserDashboard() {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore).get("access_token")?.value || "";
  const res = await fetch("http://localhost:4000/auth/me", {
    headers: { cookie: `access_token=${cookieHeader}` },
    cache: "no-store",
  });

  if (!res.ok) redirect("/");

  const json = await res.json();
  const user = json.user;

  if (user.role !== "user" && user.role !== "admin") redirect("/");

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-2">User Dashboard</h2>
      <p>Welcome, {user.email}</p>
      <p>Your role: {user.role}</p>
      <form method="post" action="http://localhost:4000/auth/logout">
        <button type="submit" className="mt-4 bg-red-500 text-white p-2 rounded">
          Logout
        </button>
      </form>
    </Layout>
  );
}

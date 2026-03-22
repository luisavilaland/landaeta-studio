import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

async function getUserRole(email: string): Promise<string> {
  const { data } = await supabaseAdmin.auth.admin.listUsers();
  const user = data?.users.find((u) => u.email === email);
  if (!user) return "client";

  const { data: settings } = await supabaseAdmin
    .from("user_settings")
    .select("role")
    .eq("user_id", user.id)
    .single();

  return settings?.role ?? "client";
}

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const role = await getUserRole(session.user.email!);
  if (role !== "admin") redirect("/dashboard");

  return <>{children}</>;
}
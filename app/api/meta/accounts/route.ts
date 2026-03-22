import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

async function getUserId(email: string): Promise<string | null> {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error || !data) return null;
  const user = data.users.find((u) => u.email === email);
  return user?.id ?? null;
}

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const userId = await getUserId(session.user.email!);
  if (!userId) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  // Verificar si es admin o cliente
  const { data: settings } = await supabaseAdmin
    .from("user_settings")
    .select("role, active_accounts")
    .eq("user_id", userId)
    .single();

  const role = settings?.role ?? "admin";

  // Si es admin devolver todas las cuentas
  if (role === "admin") {
    const accounts = JSON.parse(process.env.META_ACCOUNTS ?? "[]");
    return NextResponse.json({ accounts, role });
  }

  // Si es cliente devolver solo sus cuentas asignadas
  const { data: clientData } = await supabaseAdmin
    .from("clients")
    .select("client_accounts(*)")
    .eq("email", session.user.email!)
    .single();

  const accounts = (clientData?.client_accounts ?? []).map((a: any) => ({
    id: a.meta_account_id,
    name: a.meta_account_name,
  }));

  return NextResponse.json({ accounts, role });
}
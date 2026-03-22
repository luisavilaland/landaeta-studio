import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

async function getUserId(email: string): Promise<string | null> {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error || !data) return null;
  const user = data.users.find((u) => u.email === email);
  return user?.id ?? null;
}

// DELETE — eliminar cliente
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const userId = await getUserId(session.user.email!);
  if (!userId) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  // Verificar que el cliente pertenece al usuario
  const { data: client } = await supabaseAdmin
    .from("clients")
    .select("email")
    .eq("id", id)
    .eq("owner_id", userId)
    .single();

  if (!client) {
    return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
  }

  // Eliminar usuario de Supabase Auth
  const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers();
  const authUser = authUsers?.users.find((u) => u.email === client.email);
  if (authUser) {
    await supabaseAdmin.auth.admin.deleteUser(authUser.id);
  }

  // Eliminar cliente (cascade elimina client_accounts y user_settings)
  await supabaseAdmin.from("clients").delete().eq("id", id);

  return NextResponse.json({ success: true });
}

// PATCH — actualizar cuentas asignadas
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const { accounts } = await request.json();

  // Eliminar cuentas anteriores
  await supabaseAdmin.from("client_accounts").delete().eq("client_id", id);

  // Insertar nuevas cuentas
  if (accounts?.length > 0) {
    const accountRows = accounts.map((acc: any) => ({
      client_id: id,
      meta_account_id: acc.id,
      meta_account_name: acc.name,
    }));
    await supabaseAdmin.from("client_accounts").insert(accountRows);
  }

  return NextResponse.json({ success: true });
}
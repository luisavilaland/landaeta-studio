import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

async function getUserId(email: string): Promise<string | null> {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error || !data) return null;
  const user = data.users.find((u) => u.email === email);
  return user?.id ?? null;
}

// GET — listar clientes
export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const userId = await getUserId(session.user.email!);
  if (!userId) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin
    .from("clients")
    .select("*, client_accounts(*)")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ clients: data });
}

// POST — crear cliente
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const userId = await getUserId(session.user.email!);
  if (!userId) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  const { name, email, password, accounts } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
  }

  // Crear usuario en Supabase Auth
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // Crear registro en clients
  const { data: clientData, error: clientError } = await supabaseAdmin
    .from("clients")
    .insert({ owner_id: userId, name, email })
    .select()
    .single();

  if (clientError) {
    return NextResponse.json({ error: clientError.message }, { status: 400 });
  }

  // Asignar cuentas de Meta Ads
  if (accounts?.length > 0) {
    const accountRows = accounts.map((acc: any) => ({
      client_id: clientData.id,
      meta_account_id: acc.id,
      meta_account_name: acc.name,
    }));

    await supabaseAdmin.from("client_accounts").insert(accountRows);
  }

  // Crear settings para el cliente con rol "client"
  await supabaseAdmin.from("user_settings").insert({
    user_id: authData.user.id,
    report_email: email,
    active_accounts: accounts?.map((a: any) => a.id) ?? [],
    role: "client",
  });

  return NextResponse.json({ success: true, client: clientData });
}
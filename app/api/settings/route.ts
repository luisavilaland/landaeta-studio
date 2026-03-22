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

  const { data, error } = await supabaseAdmin
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({
      report_email: session.user.email,
      active_accounts: [],
      notif_weekly_report: true,
      notif_roas_alert: false,
      notif_spend_alert: false,
    });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();

  const userId = await getUserId(session.user.email!);
  if (!userId) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  const { error } = await supabaseAdmin
    .from("user_settings")
    .upsert(
      {
        user_id: userId,
        report_email: body.report_email,
        active_accounts: body.active_accounts,
        notif_weekly_report: body.notif_weekly_report,
        notif_roas_alert: body.notif_roas_alert,
        notif_spend_alert: body.notif_spend_alert,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
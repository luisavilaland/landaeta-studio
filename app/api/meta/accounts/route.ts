import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const accounts = JSON.parse(process.env.META_ACCOUNTS ?? "[]");
  return NextResponse.json({ accounts });
}
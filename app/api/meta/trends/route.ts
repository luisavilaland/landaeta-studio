import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("account_id") ?? process.env.META_AD_ACCOUNT_ID;
  const datePreset = searchParams.get("date_preset") ?? "last_30d";

  try {
    const url = `https://graph.facebook.com/v19.0/${accountId}/insights?fields=spend,action_values,actions&date_preset=${datePreset}&time_increment=1&access_token=${ACCESS_TOKEN}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const points = (data.data ?? []).map((d: any) => {
      const spend = parseFloat(d.spend ?? "0");
      const revenue = parseFloat(
        d.action_values?.find((a: any) => a.action_type === "omni_purchase")?.value ??
        d.action_values?.find((a: any) => a.action_type === "purchase")?.value ??
        "0"
      );
      const roas = spend > 0 ? parseFloat((revenue / spend).toFixed(2)) : 0;

      return {
        date: d.date_start,
        spend: parseFloat(spend.toFixed(2)),
        revenue: parseFloat(revenue.toFixed(2)),
        roas,
      };
    });

    return NextResponse.json({ points });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al conectar con Meta Ads API" },
      { status: 500 }
    );
  }
}
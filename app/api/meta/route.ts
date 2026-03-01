import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const datePreset = searchParams.get("date_preset") ?? "last_30d";
  const accountId = searchParams.get("account_id") ?? process.env.META_AD_ACCOUNT_ID;

  try {
    const url = `https://graph.facebook.com/v19.0/${accountId}/insights?fields=spend,actions,action_values,clicks,impressions,cpc,cpm&date_preset=${datePreset}&access_token=${ACCESS_TOKEN}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const insights = data.data?.[0];

    if (!insights) {
      return NextResponse.json({
        spend: "0", roas: "0", cvr: "0", revenue: "0",
        clicks: "0", impressions: "0", cpc: "0", cpm: "0",
        hasData: false,
      });
    }

    const spend = parseFloat(insights.spend ?? "0");

    const purchaseValue =
      insights.action_values?.find((a: any) => a.action_type === "omni_purchase")?.value ??
      insights.action_values?.find((a: any) => a.action_type === "purchase")?.value ??
      "0";
    const revenue = parseFloat(purchaseValue);
    const roas = spend > 0 ? revenue / spend : 0;

    const purchases =
      insights.actions?.find((a: any) => a.action_type === "omni_purchase")?.value ??
      insights.actions?.find((a: any) => a.action_type === "purchase")?.value ??
      "0";

    const clicks = parseFloat(insights.clicks ?? "0");
    const cvr = clicks > 0 ? (parseFloat(purchases) / clicks) * 100 : 0;

    return NextResponse.json({
      spend: spend.toFixed(2),
      roas: roas.toFixed(2),
      cvr: cvr.toFixed(2),
      revenue: revenue.toFixed(2),
      clicks: insights.clicks ?? "0",
      impressions: insights.impressions ?? "0",
      cpc: parseFloat(insights.cpc ?? "0").toFixed(2),
      cpm: parseFloat(insights.cpm ?? "0").toFixed(2),
      hasData: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al conectar con Meta Ads API" },
      { status: 500 }
    );
  }
}
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
    const url = `https://graph.facebook.com/v19.0/${accountId}/campaigns?fields=id,name,status,objective,insights.date_preset(${datePreset}){spend,impressions,clicks,cpc,cpm,actions,action_values}&limit=20&access_token=${ACCESS_TOKEN}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const campaigns = (data.data ?? []).map((c: any) => {
      const insights = c.insights?.data?.[0];

      const spend = parseFloat(insights?.spend ?? "0");
      const clicks = parseFloat(insights?.clicks ?? "0");
      const impressions = parseFloat(insights?.impressions ?? "0");
      const cpc = parseFloat(insights?.cpc ?? "0");
      const cpm = parseFloat(insights?.cpm ?? "0");

      const purchaseValue =
        insights?.action_values?.find((a: any) => a.action_type === "omni_purchase")?.value ??
        insights?.action_values?.find((a: any) => a.action_type === "purchase")?.value ??
        "0";
      const revenue = parseFloat(purchaseValue);
      const roas = spend > 0 ? revenue / spend : 0;

      const purchases =
        insights?.actions?.find((a: any) => a.action_type === "omni_purchase")?.value ??
        insights?.actions?.find((a: any) => a.action_type === "purchase")?.value ??
        "0";
      const cvr = clicks > 0 ? (parseFloat(purchases) / clicks) * 100 : 0;

      return {
        id: c.id,
        name: c.name,
        status: c.status,
        objective: c.objective,
        spend: spend.toFixed(2),
        revenue: revenue.toFixed(2),
        roas: roas.toFixed(2),
        cvr: cvr.toFixed(2),
        clicks: clicks.toFixed(0),
        impressions: impressions.toFixed(0),
        cpc: cpc.toFixed(2),
        cpm: cpm.toFixed(2),
        hasInsights: !!insights,
      };
    });

    return NextResponse.json({ campaigns });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al conectar con Meta Ads API" },
      { status: 500 }
    );
  }
}
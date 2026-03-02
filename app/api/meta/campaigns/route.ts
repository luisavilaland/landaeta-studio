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
    // Traer campañas con sus métricas en una sola llamada
    const url = `https://graph.facebook.com/v19.0/${accountId}/campaigns?fields=id,name,status,objective,daily_budget,lifetime_budget,insights.date_preset(${datePreset}){spend,clicks,impressions,cpc,cpm,actions,action_values}&limit=50&access_token=${ACCESS_TOKEN}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const campaigns = (data.data ?? []).map((c: any) => {
      const insights = c.insights?.data?.[0];
      const spend = parseFloat(insights?.spend ?? "0");

      const revenue =
        parseFloat(
          insights?.action_values?.find((a: any) => a.action_type === "omni_purchase")?.value ??
          insights?.action_values?.find((a: any) => a.action_type === "purchase")?.value ??
          "0"
        );

      const roas = spend > 0 ? revenue / spend : 0;

      const dailyBudget = c.daily_budget
        ? (parseFloat(c.daily_budget) / 100).toFixed(2)
        : null;

      const lifetimeBudget = c.lifetime_budget
        ? (parseFloat(c.lifetime_budget) / 100).toFixed(2)
        : null;

      return {
        id: c.id,
        name: c.name,
        status: c.status,
        objective: c.objective ?? "—",
        dailyBudget,
        lifetimeBudget,
        spend: spend.toFixed(2),
        roas: roas.toFixed(2),
        clicks: insights?.clicks ?? "0",
        impressions: insights?.impressions ?? "0",
        cpc: parseFloat(insights?.cpc ?? "0").toFixed(2),
        cpm: parseFloat(insights?.cpm ?? "0").toFixed(2),
        hasData: !!insights,
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
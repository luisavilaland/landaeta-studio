import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

async function fetchInsights(accountId: string, params: string) {
  const url = `https://graph.facebook.com/v19.0/${accountId}/insights?fields=spend,actions,action_values,clicks,impressions,cpc,cpm&${params}&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);
  return res.json();
}

function parseInsights(data: any) {
  const insights = data.data?.[0];
  if (!insights) return null;

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

  return {
    spend: spend,
    roas: roas,
    cvr: cvr,
    revenue: revenue,
    clicks: clicks,
    impressions: parseFloat(insights.impressions ?? "0"),
    cpc: parseFloat(insights.cpc ?? "0"),
    cpm: parseFloat(insights.cpm ?? "0"),
  };
}

function getComparisonDates(preset: string) {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  if (preset === "today") {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const y = yesterday.toISOString().split("T")[0];
    return { current: `date_preset=today`, previous: `time_range={"since":"${y}","until":"${y}"}` };
  }

  if (preset === "last_7d") {
    const d7 = new Date(now); d7.setDate(d7.getDate() - 7);
    const d14 = new Date(now); d14.setDate(d14.getDate() - 14);
    const d8 = new Date(now); d8.setDate(d8.getDate() - 8);
    return {
      current: `time_range={"since":"${d7.toISOString().split("T")[0]}","until":"${today}"}`,
      previous: `time_range={"since":"${d14.toISOString().split("T")[0]}","until":"${d8.toISOString().split("T")[0]}"}`,
    };
  }

  // last_30d
  const d30 = new Date(now); d30.setDate(d30.getDate() - 30);
  const d60 = new Date(now); d60.setDate(d60.getDate() - 60);
  const d31 = new Date(now); d31.setDate(d31.getDate() - 31);
  return {
    current: `time_range={"since":"${d30.toISOString().split("T")[0]}","until":"${today}"}`,
    previous: `time_range={"since":"${d60.toISOString().split("T")[0]}","until":"${d31.toISOString().split("T")[0]}"}`,
  };
}

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const datePreset = searchParams.get("date_preset") ?? "last_30d";
  const accountId = searchParams.get("account_id") ?? process.env.META_AD_ACCOUNT_ID;

  try {
    const { current, previous } = getComparisonDates(datePreset);

    // Llamadas en paralelo
    const [currentData, previousData] = await Promise.all([
      fetchInsights(accountId!, current),
      fetchInsights(accountId!, previous),
    ]);

    if (currentData.error) {
      return NextResponse.json({ error: currentData.error.message }, { status: 400 });
    }

    const curr = parseInsights(currentData);
    const prev = parseInsights(previousData);

    if (!curr) {
      return NextResponse.json({ hasData: false });
    }

    // Calcular variación porcentual
    function pct(current: number, previous: number | null) {
      if (!previous || previous === 0) return null;
      return ((current - previous) / previous) * 100;
    }

    return NextResponse.json({
      hasData: true,
      current: {
        spend: curr.spend.toFixed(2),
        roas: curr.roas.toFixed(2),
        cvr: curr.cvr.toFixed(2),
        revenue: curr.revenue.toFixed(2),
        clicks: curr.clicks.toFixed(0),
        impressions: curr.impressions.toFixed(0),
        cpc: curr.cpc.toFixed(2),
        cpm: curr.cpm.toFixed(2),
      },
      changes: {
        spend: pct(curr.spend, prev?.spend ?? null),
        roas: pct(curr.roas, prev?.roas ?? null),
        cvr: pct(curr.cvr, prev?.cvr ?? null),
        revenue: pct(curr.revenue, prev?.revenue ?? null),
        clicks: pct(curr.clicks, prev?.clicks ?? null),
        impressions: pct(curr.impressions, prev?.impressions ?? null),
        cpc: pct(curr.cpc, prev?.cpc ?? null),
        cpm: pct(curr.cpm, prev?.cpm ?? null),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al conectar con Meta Ads API" },
      { status: 500 }
    );
  }
}
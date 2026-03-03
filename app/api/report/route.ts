import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

async function fetchMetaData(accountId: string) {
  const url = `https://graph.facebook.com/v19.0/${accountId}/insights?fields=spend,actions,action_values,clicks,impressions,cpc,cpm&date_preset=last_30d&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);
  const data = await res.json();
  const insights = data.data?.[0];
  if (!insights) return null;

  const spend = parseFloat(insights.spend ?? "0");
  const purchaseValue =
    insights.action_values?.find((a: any) => a.action_type === "omni_purchase")?.value ??
    insights.action_values?.find((a: any) => a.action_type === "purchase")?.value ??
    "0";
  const revenue = parseFloat(purchaseValue);
  const roas = spend > 0 ? revenue / spend : 0;
  const clicks = parseFloat(insights.clicks ?? "0");

  return {
    spend: spend.toFixed(2),
    revenue: revenue.toFixed(2),
    roas: roas.toFixed(2),
    clicks: insights.clicks ?? "0",
    impressions: insights.impressions ?? "0",
    cpc: parseFloat(insights.cpc ?? "0").toFixed(2),
    cpm: parseFloat(insights.cpm ?? "0").toFixed(2),
  };
}

function buildEmailHtml(clientName: string, metrics: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">

          <!-- Header -->
          <tr>
            <td style="background:#0f172a;padding:32px 40px;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">LANDAETA STUDIO</p>
              <p style="margin:6px 0 0;font-size:13px;color:#94a3b8;">Reporte de Performance · Últimos 30 días</p>
            </td>
          </tr>

          <!-- Client name -->
          <tr>
            <td style="padding:28px 40px 0;">
              <p style="margin:0;font-size:14px;color:#6b7280;">Cliente</p>
              <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:#111827;">${clientName}</p>
            </td>
          </tr>

          <!-- Metrics -->
          <tr>
            <td style="padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding:0 8px 16px 0;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;">
                      <p style="margin:0;font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:0.1em;text-transform:uppercase;">Invertido</p>
                      <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#111827;">$${metrics.spend}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding:0 0 16px 8px;">
                    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;">
                      <p style="margin:0;font-size:11px;font-weight:600;color:#16a34a;letter-spacing:0.1em;text-transform:uppercase;">Revenue</p>
                      <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#111827;">$${metrics.revenue}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:0 8px 16px 0;">
                    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:20px;">
                      <p style="margin:0;font-size:11px;font-weight:600;color:#2563eb;letter-spacing:0.1em;text-transform:uppercase;">ROAS</p>
                      <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#111827;">${metrics.roas}x</p>
                    </div>
                  </td>
                  <td width="50%" style="padding:0 0 16px 8px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;">
                      <p style="margin:0;font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:0.1em;text-transform:uppercase;">Clicks</p>
                      <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#111827;">${metrics.clicks}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:0 8px 0 0;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;">
                      <p style="margin:0;font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:0.1em;text-transform:uppercase;">CPC</p>
                      <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#111827;">$${metrics.cpc}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding:0 0 0 8px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;">
                      <p style="margin:0;font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:0.1em;text-transform:uppercase;">CPM</p>
                      <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#111827;">$${metrics.cpm}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e4e4e7;padding:24px 40px;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Este reporte fue generado automáticamente por Landaeta Studio.<br/>
                Los datos corresponden a los últimos 30 días en Meta Ads.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { accountId, clientName, recipientEmail } = await request.json();

  if (!accountId || !clientName || !recipientEmail) {
    return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
  }

  const metrics = await fetchMetaData(accountId);
  if (!metrics) {
    return NextResponse.json({ error: "No hay datos para este período" }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: "Landaeta Studio <reportes@landaetastudio.com>",
    to: recipientEmail,
    subject: `Reporte de Performance · ${clientName} · Últimos 30 días`,
    html: buildEmailHtml(clientName, metrics),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, id: data?.id });
}
"use client";

type Campaign = {
  id: string;
  name: string;
  status: string;
  spend: string;
  roas: string;
  clicks: string;
};

interface Props {
  campaigns: Campaign[];
}

function StatusDot({ status }: { status: string }) {
  return (
    <span className={`inline-block h-1.5 w-1.5 rounded-full ${
      status === "ACTIVE" ? "bg-emerald-500" : "bg-gray-300"
    }`} />
  );
}

export default function TopCampaigns({ campaigns }: Props) {
  if (!campaigns.length) return null;

  const withRoas = campaigns.filter((c) => parseFloat(c.roas) > 0);
  if (!withRoas.length) return null;

  const sorted = [...withRoas].sort((a, b) => parseFloat(b.roas) - parseFloat(a.roas));
  const top3 = sorted.slice(0, 3);
  const worst3 = sorted.slice(-3).reverse();

  function CampaignRow({ c, rank, type }: { c: Campaign; rank: number; type: "top" | "worst" }) {
    const roas = parseFloat(c.roas);
    const isGood = type === "top";
    return (
      <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
            isGood ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
          }`}>
            {rank}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <StatusDot status={c.status} />
              <p className="text-sm font-medium text-gray-900 truncate max-w-[160px]" title={c.name}>
                {c.name}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">${c.spend} invertido · {c.clicks} clicks</p>
          </div>
        </div>
        <span className={`flex-shrink-0 text-sm font-bold ml-4 ${
          roas >= 3 ? "text-emerald-600" :
          roas >= 2 ? "text-amber-500" :
          "text-red-500"
        }`}>
          {c.roas}x
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🏆</span>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Mejores campañas</h3>
            <p className="text-xs text-gray-400">Mayor ROAS del período</p>
          </div>
        </div>
        {top3.map((c, i) => (
          <CampaignRow key={c.id} c={c} rank={i + 1} type="top" />
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">⚠️</span>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Campañas a revisar</h3>
            <p className="text-xs text-gray-400">Menor ROAS del período</p>
          </div>
        </div>
        {worst3.map((c, i) => (
          <CampaignRow key={c.id} c={c} rank={i + 1} type="worst" />
        ))}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

type Campaign = {
  id: string;
  name: string;
  status: string;
  objective: string;
  spend: string;
  revenue: string;
  roas: string;
  cvr: string;
  clicks: string;
  impressions: string;
  cpc: string;
  cpm: string;
  hasInsights: boolean;
};

type DatePreset = "today" | "last_7d" | "last_30d";
type Account = { id: string; name: string };

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PAUSED: "bg-yellow-50 text-yellow-700 border-yellow-200",
  ARCHIVED: "bg-gray-50 text-gray-500 border-gray-200",
  DELETED: "bg-red-50 text-red-600 border-red-200",
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Activa",
  PAUSED: "Pausada",
  ARCHIVED: "Archivada",
  DELETED: "Eliminada",
};

export default function MetaAdsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [datePreset, setDatePreset] = useState<DatePreset>("last_30d");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  useEffect(() => {
    fetch("/api/meta/accounts")
      .then((r) => r.json())
      .then((d) => {
        if (d.accounts?.length > 0) {
          setAccounts(d.accounts);
          setSelectedAccount(d.accounts[0]);
        }
      });
  }, []);

  useEffect(() => {
    if (!selectedAccount) return;
    setLoading(true);
    setError("");
    fetch(`/api/meta/campaigns?date_preset=${datePreset}&account_id=${selectedAccount.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setCampaigns(d.campaigns ?? []);
      })
      .catch(() => setError("Error al cargar campañas"))
      .finally(() => setLoading(false));
  }, [datePreset, selectedAccount]);

  // Totales
  const totals = campaigns.reduce(
    (acc, c) => ({
      spend: acc.spend + parseFloat(c.spend),
      revenue: acc.revenue + parseFloat(c.revenue),
      clicks: acc.clicks + parseFloat(c.clicks),
      impressions: acc.impressions + parseFloat(c.impressions),
    }),
    { spend: 0, revenue: 0, clicks: 0, impressions: 0 }
  );
  const totalRoas = totals.spend > 0 ? totals.revenue / totals.spend : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meta Ads</h1>
          <p className="mt-1 text-sm text-gray-500">
            Detalle de campañas por período.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {accounts.length > 0 && (
            <select
              value={selectedAccount?.id ?? ""}
              onChange={(e) => {
                const acc = accounts.find((a) => a.id === e.target.value);
                if (acc) setSelectedAccount(acc);
              }}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            {(["today", "last_7d", "last_30d"] as DatePreset[]).map((preset) => (
              <button
                key={preset}
                onClick={() => setDatePreset(preset)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  datePreset === preset
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {preset === "today" ? "Hoy" : preset === "last_7d" ? "7 días" : "30 días"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Summary cards */}
      {!loading && campaigns.length > 0 && (
        <div className="mb-6 grid grid-cols-4 gap-4">
          {[
            { label: "Total invertido", value: `$${totals.spend.toFixed(2)}` },
            { label: "Total revenue", value: `$${totals.revenue.toFixed(2)}` },
            { label: "ROAS total", value: `${totalRoas.toFixed(2)}x` },
            { label: "Total clicks", value: totals.clicks.toFixed(0) },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400">{s.label}</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Campaigns table */}
      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-400 text-sm">Cargando campañas...</p>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-lg font-semibold text-gray-900 mb-2">Sin campañas</p>
          <p className="text-sm text-gray-500">No hay campañas para este período.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-widest text-gray-400">Campaña</th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-widest text-gray-400">Estado</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-widest text-gray-400">Invertido</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-widest text-gray-400">Revenue</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-widest text-gray-400">ROAS</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-widest text-gray-400">CVR</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-widest text-gray-400">Clicks</th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-widest text-gray-400">CPC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900 max-w-xs truncate">{c.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{c.objective}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[c.status] ?? STATUS_STYLES["PAUSED"]}`}>
                        {STATUS_LABELS[c.status] ?? c.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right font-medium text-gray-900">
                      {c.hasInsights ? `$${c.spend}` : "—"}
                    </td>
                    <td className="px-5 py-4 text-right font-medium text-gray-900">
                      {c.hasInsights ? `$${c.revenue}` : "—"}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className={`font-semibold ${parseFloat(c.roas) >= 3 ? "text-emerald-600" : parseFloat(c.roas) >= 1 ? "text-yellow-600" : "text-red-500"}`}>
                        {c.hasInsights ? `${c.roas}x` : "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-gray-700">
                      {c.hasInsights ? `${c.cvr}%` : "—"}
                    </td>
                    <td className="px-5 py-4 text-right text-gray-700">
                      {c.hasInsights ? c.clicks : "—"}
                    </td>
                    <td className="px-5 py-4 text-right text-gray-700">
                      {c.hasInsights ? `$${c.cpc}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
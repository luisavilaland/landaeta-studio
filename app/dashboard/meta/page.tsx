"use client";

import { useEffect, useState } from "react";

type Campaign = {
  id: string;
  name: string;
  status: string;
  objective: string;
  dailyBudget: string | null;
  lifetimeBudget: string | null;
  spend: string;
  roas: string;
  clicks: string;
  impressions: string;
  cpc: string;
  cpm: string;
  hasData: boolean;
};

type DatePreset = "today" | "last_7d" | "last_30d";
type Account = { id: string; name: string };
type SortKey = keyof Campaign;

const OBJECTIVE_LABELS: Record<string, string> = {
  OUTCOME_TRAFFIC: "Tráfico",
  OUTCOME_SALES: "Ventas",
  OUTCOME_LEADS: "Leads",
  OUTCOME_ENGAGEMENT: "Interacción",
  OUTCOME_AWARENESS: "Reconocimiento",
  OUTCOME_APP_PROMOTION: "App",
};

function StatusBadge({ status }: { status: string }) {
  const active = status === "ACTIVE";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
      active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-gray-400"}`} />
      {active ? "Activa" : "Pausada"}
    </span>
  );
}

export default function MetaAdsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [datePreset, setDatePreset] = useState<DatePreset>("last_30d");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("spend");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

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
    fetch(`/api/meta/campaigns?account_id=${selectedAccount.id}&date_preset=${datePreset}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setCampaigns(d.campaigns ?? []);
      })
      .catch(() => setError("Error al cargar campañas"))
      .finally(() => setLoading(false));
  }, [selectedAccount, datePreset]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const filtered = campaigns
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aVal = parseFloat(a[sortKey] as string) || 0;
      const bVal = parseFloat(b[sortKey] as string) || 0;
      return sortDir === "desc" ? bVal - aVal : aVal - bVal;
    });

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="text-gray-300 ml-1">↕</span>;
    return <span className="text-blue-500 ml-1">{sortDir === "desc" ? "↓" : "↑"}</span>;
  }

  const columns: { key: SortKey; label: string; align?: string }[] = [
    { key: "name", label: "Campaña" },
    { key: "status", label: "Estado" },
    { key: "objective", label: "Objetivo" },
    { key: "spend", label: "Invertido", align: "right" },
    { key: "roas", label: "ROAS", align: "right" },
    { key: "clicks", label: "Clicks", align: "right" },
    { key: "impressions", label: "Impresiones", align: "right" },
    { key: "cpc", label: "CPC", align: "right" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meta Ads</h1>
          <p className="mt-1 text-sm text-gray-500">
            Detalle de campañas por cuenta publicitaria.
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
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            {(["today", "last_7d", "last_30d"] as DatePreset[]).map((preset) => (
              <button
                key={preset}
                onClick={() => setDatePreset(preset)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  datePreset === preset ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {preset === "today" ? "Hoy" : preset === "last_7d" ? "7 días" : "30 días"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar campaña..."
          className="w-full max-w-sm rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`px-4 py-3 font-medium text-gray-500 cursor-pointer hover:text-gray-900 transition-colors select-none ${
                      col.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {col.label}
                    <SortIcon col={col.key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    Cargando campañas...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    No se encontraron campañas.
                  </td>
                </tr>
              ) : (
                filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      i === filtered.length - 1 ? "border-0" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 max-w-[200px] truncate" title={c.name}>
                        {c.name}
                      </p>
                      {c.dailyBudget && (
                        <p className="text-xs text-gray-400 mt-0.5">Presupuesto diario: ${c.dailyBudget}</p>
                      )}
                      {c.lifetimeBudget && (
                        <p className="text-xs text-gray-400 mt-0.5">Presupuesto total: ${c.lifetimeBudget}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {OBJECTIVE_LABELS[c.objective] ?? c.objective}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      ${c.spend}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-medium ${parseFloat(c.roas) >= 2 ? "text-emerald-600" : parseFloat(c.roas) > 0 ? "text-amber-500" : "text-gray-400"}`}>
                        {parseFloat(c.roas) > 0 ? `${c.roas}x` : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">{c.clicks}</td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {parseInt(c.impressions).toLocaleString("es")}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {parseFloat(c.cpc) > 0 ? `$${c.cpc}` : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer con totales */}
        {!loading && filtered.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {filtered.length} campaña{filtered.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-gray-500">
              Total invertido:{" "}
              <span className="font-medium text-gray-900">
                ${filtered.reduce((sum, c) => sum + parseFloat(c.spend), 0).toFixed(2)}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
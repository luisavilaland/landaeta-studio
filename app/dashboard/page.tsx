"use client";

import { useEffect, useState } from "react";

type MetaData = {
  spend: string;
  roas: string;
  cvr: string;
  revenue: string;
  clicks: string;
  impressions: string;
  cpc: string;
  cpm: string;
  hasData: boolean;
};

type DatePreset = "today" | "last_7d" | "last_30d";
type Account = { id: string; name: string };

export default function DashboardPage() {
  const [data, setData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [datePreset, setDatePreset] = useState<DatePreset>("last_30d");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  // Cargar cuentas al inicio
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

  // Cargar métricas cuando cambia cuenta o período
  useEffect(() => {
    if (!selectedAccount) return;
    setLoading(true);
    setError("");
    fetch(`/api/meta?date_preset=${datePreset}&account_id=${selectedAccount.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("Error al cargar datos"))
      .finally(() => setLoading(false));
  }, [datePreset, selectedAccount]);

  const metrics = [
    { label: "Invertido", value: loading ? "..." : data?.hasData ? `$${data.spend}` : "—", sub: "Meta Ads" },
    { label: "ROAS", value: loading ? "..." : data?.hasData ? `${data.roas}x` : "—", sub: "Retorno sobre inversión" },
    { label: "CVR", value: loading ? "..." : data?.hasData ? `${data.cvr}%` : "—", sub: "Tasa de conversión" },
    { label: "Revenue", value: loading ? "..." : data?.hasData ? `$${data.revenue}` : "—", sub: "Ingresos generados" },
    { label: "Clicks", value: loading ? "..." : data?.hasData ? data.clicks : "—", sub: "Clics en anuncios" },
    { label: "Impresiones", value: loading ? "..." : data?.hasData ? data.impressions : "—", sub: "Veces mostrado" },
    { label: "CPC", value: loading ? "..." : data?.hasData ? `$${data.cpc}` : "—", sub: "Costo por clic" },
    { label: "CPM", value: loading ? "..." : data?.hasData ? `$${data.cpm}` : "—", sub: "Costo por mil impresiones" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Performance de Meta Ads en tiempo real.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Selector de cliente */}
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

          {/* Filtro de fechas */}
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

      {/* Metrics grid */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
              {m.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{m.value}</p>
            <p className="mt-1 text-xs text-gray-500">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* No data */}
      {!loading && data && !data.hasData && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-4xl mb-4">📭</p>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Sin datos para este período
          </h2>
          <p className="text-sm text-gray-500">
            No hay campañas activas o no hubo actividad en este período.
          </p>
        </div>
      )}
    </div>
  );
}
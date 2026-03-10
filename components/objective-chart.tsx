"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Campaign = {
  id: string;
  objective: string;
  spend: string;
};

interface Props {
  accountId: string;
  datePreset: string;
}

const OBJECTIVE_LABELS: Record<string, string> = {
  OUTCOME_TRAFFIC: "Tráfico",
  OUTCOME_SALES: "Ventas",
  OUTCOME_LEADS: "Leads",
  OUTCOME_ENGAGEMENT: "Interacción",
  OUTCOME_AWARENESS: "Reconocimiento",
  OUTCOME_APP_PROMOTION: "App",
};

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const { name, value, payload: p } = payload[0];
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg text-sm">
      <p className="font-semibold text-gray-900">{name}</p>
      <p className="text-gray-600 mt-1">${parseFloat(value).toFixed(2)} invertido</p>
      <p className="text-gray-400 text-xs">{p.percent}% del total</p>
    </div>
  );
}

export default function ObjectiveChart({ accountId, datePreset }: Props) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accountId) return;
    setLoading(true);
    fetch(`/api/meta/campaigns?account_id=${accountId}&date_preset=${datePreset}`)
      .then((r) => r.json())
      .then((d) => {
        const campaigns: Campaign[] = d.campaigns ?? [];

        // Agrupar spend por objetivo
        const grouped: Record<string, number> = {};
        campaigns.forEach((c) => {
          const label = OBJECTIVE_LABELS[c.objective] ?? c.objective;
          grouped[label] = (grouped[label] ?? 0) + parseFloat(c.spend);
        });

        const total = Object.values(grouped).reduce((s, v) => s + v, 0);

        const data = Object.entries(grouped)
          .filter(([, v]) => v > 0)
          .sort(([, a], [, b]) => b - a)
          .map(([name, value]) => ({
            name,
            value: parseFloat(value.toFixed(2)),
            percent: total > 0 ? ((value / total) * 100).toFixed(1) : "0",
          }));

        setChartData(data);
      })
      .finally(() => setLoading(false));
  }, [accountId, datePreset]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="h-64 flex items-center justify-center text-sm text-gray-400">
          Cargando distribución...
        </div>
      </div>
    );
  }

  if (!chartData.length) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Distribución del spend por objetivo</h3>
        <p className="text-xs text-gray-400 mt-0.5">Cuánto del presupuesto va a cada tipo de campaña</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Gráfico */}
        <div className="flex-shrink-0" style={{ width: 200, height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Leyenda manual */}
        <div className="flex flex-col gap-2 flex-1">
          {chartData.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <span className="text-xs text-gray-400">{item.percent}%</span>
                <span className="text-sm font-medium text-gray-900">${item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
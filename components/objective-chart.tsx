"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type Campaign = {
  objective: string;
  spend: string;
};

interface Props {
  campaigns: Campaign[];
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

export default function ObjectiveChart({ campaigns }: Props) {
  if (!campaigns.length) return null;

  const grouped: Record<string, number> = {};
  campaigns.forEach((c) => {
    const label = OBJECTIVE_LABELS[c.objective] ?? c.objective;
    grouped[label] = (grouped[label] ?? 0) + parseFloat(c.spend);
  });

  const total = Object.values(grouped).reduce((s, v) => s + v, 0);
  const chartData = Object.entries(grouped)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
      percent: total > 0 ? ((value / total) * 100).toFixed(1) : "0",
    }));

  if (!chartData.length) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Distribución por objetivo</h3>
        <p className="text-xs text-gray-400 mt-0.5">Spend por tipo de campaña</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div style={{ width: 180, height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
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

        <div className="w-full flex flex-col gap-2">
          {chartData.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-xs text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{item.percent}%</span>
                <span className="text-xs font-medium text-gray-900">${item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  date: string;
  spend: number;
  revenue: number;
  roas: number;
};

interface Props {
  data: DataPoint[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-UY", { day: "numeric", month: "short" });
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg text-sm">
      <p className="font-semibold text-gray-900 mb-2">{formatDate(label)}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-6">
          <span style={{ color: p.color }} className="font-medium">{p.name}</span>
          <span className="text-gray-900 font-semibold">
            {p.dataKey === "roas" ? `${p.value}x` : `$${p.value.toLocaleString("es")}`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TrendsChart({ data }: Props) {
  if (!data.length) return null;

  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          yAxisId="money"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}`}
          width={55}
        />
        <YAxis
          yAxisId="roas"
          orientation="right"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}x`}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
          formatter={(value) => <span style={{ color: "#6b7280" }}>{value}</span>}
        />
        <Bar
          yAxisId="money"
          dataKey="spend"
          name="Invertido"
          fill="#dbeafe"
          stroke="#93c5fd"
          strokeWidth={1}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          yAxisId="money"
          dataKey="revenue"
          name="Revenue"
          fill="#dcfce7"
          stroke="#86efac"
          strokeWidth={1}
          radius={[4, 4, 0, 0]}
        />
        <Line
          yAxisId="roas"
          type="monotone"
          dataKey="roas"
          name="ROAS"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#2563eb" }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
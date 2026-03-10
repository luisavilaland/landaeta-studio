"use client";

type MetaData = {
  hasData: boolean;
  current: Record<string, string>;
};

interface Props {
  data: MetaData | null;
  loading: boolean;
}

type HealthStatus = "excellent" | "good" | "warning" | "critical";

type HealthIndicator = {
  label: string;
  value: string;
  status: HealthStatus;
  message: string;
};

function getROASHealth(roas: number): HealthStatus {
  if (roas >= 4) return "excellent";
  if (roas >= 2.5) return "good";
  if (roas >= 1.5) return "warning";
  return "critical";
}

function getCPCHealth(cpc: number): HealthStatus {
  if (cpc <= 1) return "excellent";
  if (cpc <= 2.5) return "good";
  if (cpc <= 5) return "warning";
  return "critical";
}

function getCVRHealth(cvr: number): HealthStatus {
  if (cvr >= 3) return "excellent";
  if (cvr >= 1.5) return "good";
  if (cvr >= 0.5) return "warning";
  return "critical";
}

function getCPMHealth(cpm: number): HealthStatus {
  if (cpm <= 10) return "excellent";
  if (cpm <= 30) return "good";
  if (cpm <= 60) return "warning";
  return "critical";
}

function overallHealth(indicators: HealthIndicator[]): HealthStatus {
  const scores = { excellent: 4, good: 3, warning: 2, critical: 1 };
  const avg = indicators.reduce((sum, i) => sum + scores[i.status], 0) / indicators.length;
  if (avg >= 3.5) return "excellent";
  if (avg >= 2.5) return "good";
  if (avg >= 1.5) return "warning";
  return "critical";
}

const STATUS_CONFIG = {
  excellent: {
    label: "Excelente",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  good: {
    label: "Buena",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-500",
    bar: "bg-blue-500",
  },
  warning: {
    label: "A revisar",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  critical: {
    label: "Crítica",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
    bar: "bg-red-500",
  },
};

const SCORE_WIDTH = { excellent: "100%", good: "75%", warning: "50%", critical: "25%" };

export default function AccountHealth({ data, loading }: Props) {
  if (loading || !data?.hasData) return null;

  const roas = parseFloat(data.current.roas ?? "0");
  const cpc = parseFloat(data.current.cpc ?? "0");
  const cvr = parseFloat(data.current.cvr ?? "0");
  const cpm = parseFloat(data.current.cpm ?? "0");

  const indicators: HealthIndicator[] = [
    {
      label: "ROAS",
      value: `${roas}x`,
      status: getROASHealth(roas),
      message:
        roas >= 4 ? "Retorno excelente" :
        roas >= 2.5 ? "Retorno saludable" :
        roas >= 1.5 ? "Retorno bajo, optimizar" :
        "Retorno crítico, pausar y revisar",
    },
    {
      label: "CPC",
      value: `$${cpc}`,
      status: getCPCHealth(cpc),
      message:
        cpc <= 1 ? "Costo por clic muy eficiente" :
        cpc <= 2.5 ? "Costo por clic aceptable" :
        cpc <= 5 ? "Costo por clic elevado" :
        "Costo por clic muy alto",
    },
    {
      label: "CVR",
      value: `${cvr}%`,
      status: getCVRHealth(cvr),
      message:
        cvr >= 3 ? "Tasa de conversión excelente" :
        cvr >= 1.5 ? "Tasa de conversión buena" :
        cvr >= 0.5 ? "Tasa de conversión baja" :
        "Tasa de conversión muy baja",
    },
    {
      label: "CPM",
      value: `$${cpm}`,
      status: getCPMHealth(cpm),
      message:
        cpm <= 10 ? "Costo por mil muy eficiente" :
        cpm <= 30 ? "Costo por mil aceptable" :
        cpm <= 60 ? "Costo por mil elevado" :
        "Costo por mil muy alto",
    },
  ];

  const overall = overallHealth(indicators);
  const config = STATUS_CONFIG[overall];

  return (
    <div className={`mt-6 rounded-2xl border ${config.border} ${config.bg} p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${config.dot} animate-pulse`} />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Salud de la cuenta
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Basado en ROAS, CPC, CVR y CPM del período
            </p>
          </div>
        </div>
        <span className={`text-sm font-bold ${config.color}`}>
          {config.label}
        </span>
      </div>

      {/* Indicators */}
      <div className="grid grid-cols-4 gap-4">
        {indicators.map((ind) => {
          const indConfig = STATUS_CONFIG[ind.status];
          return (
            <div key={ind.label} className="bg-white rounded-xl p-4 border border-white/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">{ind.label}</span>
                <span className={`text-xs font-medium ${indConfig.color}`}>
                  {indConfig.label}
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900 mb-2">{ind.value}</p>
              {/* Barra de salud */}
              <div className="h-1 w-full rounded-full bg-gray-100 mb-2">
                <div
                  className={`h-1 rounded-full transition-all ${indConfig.bar}`}
                  style={{ width: SCORE_WIDTH[ind.status] }}
                />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{ind.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
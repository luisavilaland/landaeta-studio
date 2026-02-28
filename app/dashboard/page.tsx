import { getServerSession } from "next-auth";

const metrics = [
  { label: "Invertido", value: "—", sub: "Meta Ads", color: "text-gray-900" },
  { label: "ROAS", value: "—", sub: "Retorno sobre inversión", color: "text-gray-900" },
  { label: "CVR", value: "—", sub: "Tasa de conversión", color: "text-gray-900" },
  { label: "Ganancia", value: "—", sub: "Estimada", color: "text-gray-900" },
];

export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenido, {session?.user?.name?.split(" ")[0] ?? "Luis"} 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Acá vas a ver el resumen de performance de tus clientes.
          </p>
        </div>

        {/* Date filter — próximamente funcional */}
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
          <span>📅</span>
          <span>Hoy</span>
        </div>
      </div>

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
            <p className={`mt-2 text-3xl font-bold ${m.color}`}>{m.value}</p>
            <p className="mt-1 text-xs text-gray-500">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Coming soon */}
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-4xl mb-4">🚀</p>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Conectando Meta Ads API
        </h2>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          En la próxima etapa conectamos tu cuenta de Meta Ads y estos números se llenan con datos reales.
        </p>
      </div>
    </div>
  );
}
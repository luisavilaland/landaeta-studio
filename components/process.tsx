export default function Process() {
  const steps = [
    {
      title: "Diagnóstico",
      desc: "Auditamos Ads, tracking (GA4/GTM) y embudo. Detectamos quick wins y oportunidades.",
    },
    {
      title: "Implementación",
      desc: "Configuramos medición, eventos, catálogos, audiencias y estructura de campañas.",
    },
    {
      title: "Optimización",
      desc: "Iteramos semanalmente: creatividades, pujas, presupuestos, CRO y audiencias.",
    },
    {
      title: "Reporting & roadmap",
      desc: "Dashboards claros y un plan de mejora continuo con foco en ROAS y crecimiento.",
    },
  ];

  return (
    <section id="process" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Cómo trabajamos</h2>
          <p className="mt-4 text-lg text-gray-600">
            Un proceso simple, transparente y orientado a resultados.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((s) => (
            <div key={s.title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

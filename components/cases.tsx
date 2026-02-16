export default function Cases() {
  const cases = [
    {
      title: "eCommerce B2B (Industria)",
      result: "+28% ingresos en 60 días",
      desc: "Reestructura de campañas + medición GA4/GTM + optimización de catálogo.",
    },
    {
      title: "Retail (Performance Max)",
      result: "-18% CAC",
      desc: "Ajuste de feed, segmentación por margen y landing testing para mejorar CVR.",
    },
    {
      title: "Meta Ads (Creatividades)",
      result: "+35% ROAS",
      desc: "Sistema de testing creativo y auditoría de audiencias para escalar con control.",
    },
  ];

  return (
    <section id="cases" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Resultados</h2>
          <p className="mt-4 text-lg text-gray-600">
            Algunos ejemplos del tipo de impacto que buscamos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <div key={c.title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">{c.title}</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{c.result}</p>
              <p className="mt-3 text-gray-600">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center rounded-md bg-black px-5 py-2.5 text-white hover:bg-gray-900"
          >
            Quiero resultados similares →
          </a>
        </div>
      </div>
    </section>
  );
}

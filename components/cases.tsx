export default function Cases() {
  const cases = [
    {
      tag: "eCommerce B2B · Mayorista",
      sector: "Importadora mayorista",
      result: "3% de ventas totales",
      context: "desde un canal que no existía",
      desc: "Construimos el canal eCommerce desde cero para una importadora sin presencia digital. Estrategia, estructura, campañas y medición — pasaron a generar el 3% de su facturación total por un canal nuevo.",
      services: ["Meta Ads", "Google Ads", "Estrategia Digital"],
    },
    {
      tag: "Innovación · Automotive",
      sector: "Concesionaria automotriz",
      result: "5–8 unidades por mes",
      context: "señadas 100% online",
      desc: "Gestioné el eCommerce de venta de autos para una marca líder del mercado. Los clientes podían señar un vehículo desde el sitio — uno de los proyectos más innovadores del sector en ese momento.",
      services: ["eCommerce Management", "Optimización de Conversión", "UX"],
    },
    {
      tag: "eCommerce B2B · Industrial",
      sector: "Distribuidora industrial",
      result: "+30% crecimiento anual",
      context: "4% de la venta total de la empresa",
      desc: "Canal digital B2B con crecimiento sostenido del 30% anual, representando el 4% de la venta total en un mercado cerrado y altamente competitivo.",
      services: ["eCommerce B2B", "Analytics", "Performance"],
    },
    {
      tag: "Tu negocio · eCommerce",
      sector: "Próximo caso",
      result: "¿Cuál es tu meta?",
      context: "hablemos y lo definimos",
      desc: "Aplicamos toda esta experiencia directamente en tu tienda. Estructura de campañas, medición avanzada y decisiones basadas en datos reales — no suposiciones.",
      services: ["Meta Ads", "Google Ads", "GA4 + GTM"],
      isCta: true,
    },
  ];

  return (
    <section id="cases" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Experiencia que respalda los resultados
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Más de 8 años construyendo y escalando canales eCommerce en LATAM — en empresas reales, con resultados medibles.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cases.map((c) => (
            <div
              key={c.sector}
              className={`relative flex flex-col rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md ${
                c.isCta
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Tag */}
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400">
                {c.tag}
              </p>

              {/* Sector */}
              <p className={`text-lg font-bold ${c.isCta ? "text-blue-700" : "text-gray-900"}`}>
                {c.sector}
              </p>

              {/* Result */}
              <div className="mt-3 mb-4">
                <p className={`text-2xl font-bold leading-tight ${c.isCta ? "text-blue-600" : "text-gray-900"}`}>
                  {c.result}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{c.context}</p>
              </div>

              {/* Divider */}
              <div className="mb-4 h-px bg-gray-100" />

              {/* Description */}
              <p className="flex-1 text-sm text-gray-600 leading-relaxed">
                {c.desc}
              </p>

              {/* Services pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.services.map((s) => (
                  <span
                    key={s}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.isCta
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA card button */}
              {c.isCta && (
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Hablemos →
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
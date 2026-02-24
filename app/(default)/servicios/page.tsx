import CalButton from "@/components/cal-button";

export const metadata = {
  title: "Servicios | Landaeta Studio",
  description:
    "Gestión de Meta Ads, Google Ads, GA4, GTM y dashboards para eCommerce. Servicios de performance y analítica con foco en resultados medibles.",
};

const services = [
  {
    tag: "Paid Social",
    name: "Meta Ads",
    tagline: "Escalá tu facturación con campañas que convierten",
    description:
      "Gestión completa de tus campañas en Meta (Facebook e Instagram). Arrancamos con una auditoría inicial para detectar oportunidades y quick wins, luego estructuramos y optimizamos semanalmente con foco en ROAS y eficiencia del presupuesto.",
    includes: [
      "Auditoría inicial de cuenta y campañas",
      "Estructura de campañas (prospecting + retargeting)",
      "Configuración de audiencias y segmentación",
      "Optimización semanal de pujas y presupuestos",
      "Reporte mensual con KPIs y próximos pasos",
    ],
    notIncludes: "No incluye producción de creatividades.",
    price: "Desde USD 400 / mes",
    cta: "Consultar disponibilidad",
  },
  {
    tag: "Paid Search",
    name: "Google Ads",
    tagline: "Capturá la demanda de tus clientes ideales",
    description:
      "Gestión de campañas en Google adaptada a tu modelo de negocio. Según el tipo de eCommerce implementamos Search, Shopping y/o Performance Max — siempre con foco en capturar intención de compra real y maximizar el retorno.",
    includes: [
      "Auditoría inicial y análisis de competencia",
      "Implementación del tipo de campaña adecuado (Search / Shopping / PMax)",
      "Configuración de feed de productos (para Shopping)",
      "Optimización continua de palabras clave, pujas y anuncios",
      "Reporte mensual con ROAS, CPC y recomendaciones",
    ],
    notIncludes: null,
    price: "Desde USD 400 / mes",
    cta: "Consultar disponibilidad",
  },
  {
    tag: "Analytics",
    name: "GA4 + GTM",
    tagline: "Medí bien antes de invertir más",
    description:
      "Sin medición correcta, cualquier decisión de inversión es a ciegas. Implementamos GA4 y GTM desde cero o auditamos tu configuración actual para garantizar trazabilidad completa del funnel — desde el primer clic hasta la compra.",
    includes: [
      "Auditoría de setup existente (si aplica)",
      "Implementación de GA4 con eventos clave del funnel",
      "Configuración de GTM: triggers, tags y variables",
      "Tracking de conversiones para Meta y Google Ads",
      "Validación en tiempo real y documentación del setup",
    ],
    notIncludes: null,
    price: "Desde USD 350 (único)",
    cta: "Consultar proyecto",
  },
  {
    tag: "Business Intelligence",
    name: "Dashboards & BI",
    tagline: "El pulso de tu negocio en tiempo real",
    description:
      "Dashboards en Looker Studio (y otras plataformas según necesidad) que consolidan tus datos de Ads, eCommerce y Analytics en un solo lugar. Podés ver ROAS, CAC, LTV y tendencias sin necesitar abrir 5 herramientas distintas.",
    includes: [
      "Relevamiento de fuentes de datos y KPIs clave",
      "Conexión de fuentes (Meta Ads, Google Ads, GA4, eCommerce)",
      "Diseño y desarrollo del dashboard en Looker Studio",
      "Capacitación para lectura e interpretación",
      "1 mes de soporte post-entrega",
    ],
    notIncludes: null,
    price: "Desde USD 500 (único)",
    cta: "Consultar proyecto",
  },
  {
    tag: "Consultoría",
    name: "Auditoría & Consultoría",
    tagline: "Claridad en una sola sesión",
    description:
      "Si necesitás una mirada externa sin compromiso de retainer, esta es la opción. Revisamos tu cuenta, estrategia o setup actual y te entregamos conclusiones accionables. Podés optar por una sesión de trabajo o un informe escrito detallado.",
    includes: [
      "Sesión de 60–90 min vía videollamada",
      "Revisión de cuentas de Ads y/o Analytics",
      "Identificación de problemas y oportunidades",
      "Plan de acción priorizado",
      "Informe escrito opcional (+USD 100)",
    ],
    notIncludes: null,
    price: "USD 200 / sesión",
    cta: "Agendar sesión",
  },
  {
    tag: "Pack",
    name: "Pack Completo",
    tagline: "Todo desde el día uno, sin fricciones",
    description:
      "Para eCommerce que quieren arrancar o escalar con todo en orden desde el inicio. Incluye consultoría de diagnóstico, setup de medición, gestión de Ads y dashboard — un solo interlocutor, una sola estrategia.",
    includes: [
      "Consultoría inicial de diagnóstico",
      "Implementación GA4 + GTM completa",
      "Gestión de Meta Ads y/o Google Ads",
      "Dashboard en Looker Studio",
      "Reporte mensual integrado de todas las fuentes",
    ],
    notIncludes: null,
    price: "A consultar según alcance",
    cta: "Hablemos",
    highlight: true,
  },
];

export default function ServiciosPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            Servicios
          </div>
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl mb-4">
            Lo que hacemos y cómo lo hacemos
          </h1>
          <p className="text-lg text-gray-600">
            Servicios de performance y analítica para eCommerce con foco en resultados medibles. Sin paquetes genéricos — cada proyecto se adapta a tu negocio.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {services.map((s) => (
            <div
              key={s.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition-shadow hover:shadow-md ${
                s.highlight
                  ? "border-blue-300 bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "border-gray-200 bg-white"
              }`}
            >
              {s.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-800 px-3 py-1 text-xs font-medium text-blue-100">
                    Recomendado
                  </span>
                </div>
              )}

              {/* Tag + Name */}
              <div className="mb-4">
                <p className={`mb-1 text-xs font-medium uppercase tracking-widest ${s.highlight ? "text-blue-200" : "text-blue-500"}`}>
                  {s.tag}
                </p>
                <h2 className={`text-xl font-bold ${s.highlight ? "text-white" : "text-gray-900"}`}>
                  {s.name}
                </h2>
                <p className={`mt-1 text-sm ${s.highlight ? "text-blue-100" : "text-gray-500"}`}>
                  {s.tagline}
                </p>
              </div>

              {/* Price */}
              <div className={`mb-5 rounded-lg px-4 py-3 ${s.highlight ? "bg-blue-700" : "bg-gray-50"}`}>
                <span className={`text-lg font-bold ${s.highlight ? "text-white" : "text-gray-900"}`}>
                  {s.price}
                </span>
              </div>

              {/* Description */}
              <p className={`mb-5 text-sm leading-relaxed ${s.highlight ? "text-blue-100" : "text-gray-600"}`}>
                {s.description}
              </p>

              {/* Includes */}
              <ul className="mb-4 flex flex-col gap-2 flex-1">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className={`mt-0.5 flex-shrink-0 ${s.highlight ? "text-blue-200" : "text-blue-500"}`}>✓</span>
                    <span className={s.highlight ? "text-blue-100" : "text-gray-600"}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Not includes */}
              {s.notIncludes && (
                <p className={`mb-4 text-xs ${s.highlight ? "text-blue-300" : "text-gray-400"}`}>
                  ⚠ {s.notIncludes}
                </p>
              )}

              {/* CTA */}
              <CalButton
                className={`mt-auto w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  s.highlight
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {s.cta} →
              </CalButton>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-600 mb-1 text-sm">
            ¿No sabés por dónde empezar?
          </p>
          <p className="font-semibold text-gray-900 mb-4">
            Agendá una llamada de diagnóstico gratuita de 30 minutos.
          </p>
          <CalButton className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Agendar diagnóstico gratuito →
          </CalButton>
        </div>

      </div>
    </section>
  );
}
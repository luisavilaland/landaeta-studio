import CalButton from "@/components/cal-button";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">

          {/* Foto */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* Fondo decorativo */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50" />
              <Image
                src="/images/luis-landaeta.jpg"
                alt="Luis Landaeta — Fundador de Landaeta Studio"
                width={480}
                height={560}
                className="rounded-2xl object-cover shadow-lg"
              />
              {/* Badge flotante */}
              <div className="absolute -bottom-5 -right-5 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-lg">
                <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                  Experiencia
                </p>
                <p className="mt-0.5 text-2xl font-bold text-gray-900">
                  8+ años
                </p>
                <p className="text-xs text-gray-500">en eCommerce & Ads</p>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                Sobre mí
              </div>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl leading-tight">
                Me harté de agencias que prometen y no cumplen.
                <span className="text-blue-600"> Por eso creé la mía.</span>
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Vi de cerca cómo muchas agencias tratan a sus clientes como
              ignorantes — promesas irreales para cerrar el contrato, números
              sin contexto, informes que no le sirven a nadie. Clientes que
              pagaban sumas absurdas sin entender qué estaban comprando.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Landaeta Studio nació para hacer lo opuesto. Trabajo con
              emprendedores y negocios chicos que tienen algo genuino para
              ofrecer y la visión de crecer — pero no el presupuesto ni el
              tiempo para lidiar con agencias que los subestiman.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Mi diferencia no es una promesa de resultados mágicos. Es
              transparencia total, comunicación clara y acompañarte en el
              proceso — con datos que entendés, decisiones que tienen sentido
              y sin venderte humo.
            </p>

            {/* Valores */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { icon: "🔍", label: "Transparencia", desc: "Sin letra chica ni promesas vacías" },
                { icon: "💬", label: "Comunicación", desc: "Datos que se entienden, no que impresionan" },
                { icon: "🤝", label: "Acompañamiento", desc: "Tu proceso de crecimiento, no solo tus campañas" },
              ].map((v) => (
                <div key={v.label} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <span className="text-2xl">{v.icon}</span>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{v.label}</p>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <CalButton className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                Hablemos de tu negocio →
              </CalButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
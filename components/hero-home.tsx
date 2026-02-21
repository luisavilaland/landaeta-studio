import Image from "next/image";
import PageIllustration from "@/components/page-illustration";
import CalButton from "@/components/cal-button";

export default function HeroHome() {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Ads + Analítica para tu <br className="max-lg:hidden" />
              eCommerce
            </h1>

            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Mejoramos tu performance en Meta/Google Ads y convertimos datos
                en decisiones, creamos dashboards intuitivos y optimizamos tu
                embudo de ventas.
              </p>

              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  
                    <CalButton className="btn group mb-4 w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto">
                    <span className="relative inline-flex items-center">
                      Agendar llamada{" "}
                      <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </CalButton>

                  <a
                    className="btn w-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="#services"
                  >
                    Ver servicios
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative aspect-video rounded-2xl bg-gray-900 px-5 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,--theme(--color-slate-300/.8),transparent)1]">
              <div className="relative mb-6 flex items-center justify-between before:block before:h-[9px] before:w-[41px] before:bg-[length:16px_9px] before:[background-image:radial-gradient(circle_at_4.5px_4.5px,var(--color-gray-600)_4.5px,transparent_0)] after:w-[41px]">
                <span className="text-[13px] font-medium text-white">
                  landaeta studio • dashboard
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-gray-800 p-3">
                  <p className="text-xs text-gray-400">ROAS</p>
                  <p className="mt-1 text-lg font-semibold text-white">3.4x</p>
                </div>
                <div className="rounded-lg bg-gray-800 p-3">
                  <p className="text-xs text-gray-400">CAC</p>
                  <p className="mt-1 text-lg font-semibold text-white">-18%</p>
                </div>
                <div className="rounded-lg bg-gray-800 p-3">
                  <p className="text-xs text-gray-400">CVR</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    +0.7pp
                  </p>
                </div>

                <div className="col-span-3 rounded-lg bg-gray-800 p-3">
                  <p className="text-xs text-gray-400">Ventas (últimos 30 días)</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    $ 124,580
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Meta Ads • Google Ads • Email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

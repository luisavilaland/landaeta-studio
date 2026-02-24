import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import CalButton from "@/components/cal-button";

export const metadata = {
  title: "Blog | Landaeta Studio",
  description:
    "Artículos sobre Meta Ads, Google Ads, GA4, analytics y eCommerce. Contenido práctico para escalar tu tienda online.",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Meta Ads":    "bg-blue-50 text-blue-600 border-blue-200",
  "Google Ads":  "bg-green-50 text-green-600 border-green-200",
  "Analytics":   "bg-orange-50 text-orange-600 border-orange-200",
  "eCommerce":   "bg-purple-50 text-purple-600 border-purple-200",
  "Métricas":    "bg-rose-50 text-rose-600 border-rose-200",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-UY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            Blog
          </div>
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl mb-4">
            Contenido práctico para escalar tu eCommerce
          </h1>
          <p className="text-lg text-gray-600">
            Sin teoría vacía. Meta Ads, Google Ads, analytics y métricas explicados con ejemplos reales.
          </p>
        </div>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Los artículos están en camino.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Category */}
                <span className={`mb-4 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[post.category] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
                  {post.category}
                </span>

                {/* Title */}
                <h2 className="mb-3 text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="flex-1 text-sm text-gray-600 leading-relaxed mb-4">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="font-semibold text-gray-900 mb-2">
            ¿Querés aplicar esto en tu negocio?
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Agendá una llamada de diagnóstico gratuita y lo vemos juntos.
          </p>
          <CalButton className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Agendar diagnóstico gratuito →
          </CalButton>
        </div>

      </div>
    </section>
  );
}
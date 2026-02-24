import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import CalButton from "@/components/cal-button";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-UY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Meta Ads":   "bg-blue-50 text-blue-600 border-blue-200",
  "Google Ads": "bg-green-50 text-green-600 border-green-200",
  "Analytics":  "bg-orange-50 text-orange-600 border-orange-200",
  "eCommerce":  "bg-purple-50 text-purple-600 border-purple-200",
  "Métricas":   "bg-rose-50 text-rose-600 border-rose-200",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* Back */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Volver al blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className={`mb-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[post.category] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
            {post.category}
          </span>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 leading-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{post.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-10 h-px bg-gray-200" />

        {/* MDX Content */}
        <div className="prose prose-gray prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-600 prose-p:leading-relaxed
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-ul:text-gray-600 prose-ol:text-gray-600
          prose-li:my-1
          prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1
          prose-code:bg-gray-100 prose-code:rounded prose-code:px-1 prose-code:text-sm prose-code:text-gray-800
        ">
          <MDXRemote source={post.content} />
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gray-200" />

        {/* CTA */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8 text-center">
          <p className="font-semibold text-gray-900 mb-2">
            ¿Querés aplicar esto en tu eCommerce?
          </p>
          <p className="text-sm text-gray-600 mb-4">
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
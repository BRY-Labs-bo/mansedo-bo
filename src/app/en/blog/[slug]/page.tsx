import type { Metadata } from "next";
import { BlogArticleView, getArticleMetadata } from "@/components/blog/blog-article-view";
import { site } from "@/config/site";

const LANG = "en";
export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getArticleMetadata(LANG, slug);
  if (!meta) return { title: "Article not found" };
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${site.url}/en/blog/${slug}`,
      languages: {
        es: `${site.url}/blog/${slug}`,
        en: `${site.url}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      url: `${site.url}/en/blog/${slug}`,
      publishedTime: meta.publishedAt?.toISOString(),
      authors: [meta.author],
    },
  };
}

export default async function BlogArticlePageEn({ params }: { params: Params }) {
  const { slug } = await params;
  return <BlogArticleView lang={LANG} slug={slug} />;
}

import type { Metadata } from "next";
import { BlogListView } from "@/components/blog/blog-list-view";
import { site } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";

const LANG = "en";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${getDictionary(LANG).blog.pageTitle} — MANSEDO`,
  description: getDictionary(LANG).blog.pageLead,
  alternates: {
    canonical: `${site.url}/en/blog`,
    languages: { es: `${site.url}/blog`, en: `${site.url}/en/blog` },
  },
};

type SearchParams = Promise<{ categoria?: string; page?: string }>;

export default async function BlogListPageEn({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  return <BlogListView lang={LANG} searchParams={sp} />;
}

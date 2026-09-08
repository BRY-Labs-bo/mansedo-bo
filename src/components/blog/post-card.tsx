import Link from "next/link";
import { formatDate } from "@/lib/date";
import { PostCover } from "@/components/blog/post-cover";

type Props = {
  href: string;
  category: string;
  publishedAt: Date | null;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  variant?: "dark" | "light";
};

export function PostCard({
  href,
  category,
  publishedAt,
  title,
  excerpt,
  coverImage,
  variant = "light",
}: Props) {
  const isDark = variant === "dark";
  return (
    <article className={isDark ? "bg-navy border border-line-d" : "bg-surface border border-line-l"}>
      <Link href={href} className="group block h-full">
        <PostCover src={coverImage} alt={title} aspect="16/10" />
        <div className="p-5 md:p-6">
          <p className={`eyebrow ${isDark ? "text-gold" : "text-gold-txt"}`}>
            {category} · {publishedAt ? formatDate(publishedAt) : "[FECHA]"}
          </p>
          <h3
            className={`mt-3 font-sans font-bold text-[19px] leading-[1.25] ${
              isDark ? "text-txt-d group-hover:text-gold-br" : "text-txt-l group-hover:text-gold-ink"
            }`}
          >
            {title}
          </h3>
          <p className={`mt-3 text-body-sm ${isDark ? "text-mut-d" : "text-mut-l"}`}>{excerpt}</p>
        </div>
      </Link>
    </article>
  );
}

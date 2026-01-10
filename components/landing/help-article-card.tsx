import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import type { HelpArticleMeta } from "@/lib/help";

interface HelpArticleCardProps {
  article: HelpArticleMeta;
  showCategory?: boolean;
}

export function HelpArticleCard({ article, showCategory = false }: HelpArticleCardProps) {
  return (
    <Link
      className="group flex items-center justify-between rounded-xl p-4 transition-all duration-200 hover:scale-[1.01]"
      href={`/help/${article.category}/${article.slug}`}
      style={{
        backgroundColor: "var(--landing-card)",
        border: "1px solid var(--landing-border)",
      }}
    >
      <div className="min-w-0 flex-1">
        {showCategory && (
          <p
            className="mb-1 font-medium text-xs uppercase tracking-wider"
            style={{ color: "var(--landing-accent)" }}
          >
            {article.category.replace("-", " ")}
          </p>
        )}
        <h3 className="truncate font-medium" style={{ color: "var(--landing-text)" }}>
          {article.title}
        </h3>
        <p className="mt-1 truncate text-sm" style={{ color: "var(--landing-text-muted)" }}>
          {article.description}
        </p>
      </div>
      <IconArrowRight
        className="ml-4 size-5 shrink-0 transition-transform group-hover:translate-x-1"
        style={{ color: "var(--landing-accent)" }}
      />
    </Link>
  );
}

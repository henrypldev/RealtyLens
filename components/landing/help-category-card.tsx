import { IconCreditCard, IconRocket, IconUser, IconWand } from "@tabler/icons-react";
import Link from "next/link";
import type { HelpCategory } from "@/lib/help";

const iconMap = {
  IconRocket,
  IconWand,
  IconCreditCard,
  IconUser,
} as const;

interface HelpCategoryCardProps {
  category: HelpCategory;
  articleCount: number;
}

export function HelpCategoryCard({ category, articleCount }: HelpCategoryCardProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] || IconRocket;

  return (
    <Link
      className="group flex flex-col rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02]"
      href={`/help/${category.slug}`}
      style={{
        backgroundColor: "var(--landing-card)",
        border: "1px solid var(--landing-border)",
        boxShadow: "0 4px 20px -4px var(--landing-shadow)",
      }}
    >
      <div
        className="mb-4 flex size-12 items-center justify-center rounded-xl transition-colors"
        style={{
          backgroundColor: "var(--landing-bg)",
          border: "1px solid var(--landing-border)",
        }}
      >
        <Icon className="size-6" style={{ color: "var(--landing-accent)" }} />
      </div>
      <h3 className="font-semibold text-lg" style={{ color: "var(--landing-text)" }}>
        {category.title}
      </h3>
      <p
        className="mt-1 flex-1 text-sm leading-relaxed"
        style={{ color: "var(--landing-text-muted)" }}
      >
        {category.description}
      </p>
      <p className="mt-3 font-medium text-xs" style={{ color: "var(--landing-accent)" }}>
        {articleCount} {articleCount === 1 ? "article" : "articles"}
      </p>
    </Link>
  );
}

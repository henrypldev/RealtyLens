import { IconArrowLeft, IconCreditCard, IconRocket, IconUser, IconWand } from "@tabler/icons-react";
import Link from "next/link";
import type { HelpArticleMeta, HelpCategory } from "@/lib/help";
import { HelpArticleCard } from "./help-article-card";
import { LandingFooter } from "./landing-footer";
import { LandingNav } from "./landing-nav";

const iconMap = {
  IconRocket,
  IconWand,
  IconCreditCard,
  IconUser,
} as const;

interface HelpCategoryPageProps {
  category: HelpCategory;
  articles: HelpArticleMeta[];
}

export function HelpCategoryPage({ category, articles }: HelpCategoryPageProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] || IconRocket;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--landing-bg)" }}>
      <LandingNav />

      <main>
        {/* Category Header */}
        <section className="px-6 pt-20 pb-8 md:pt-28">
          <div className="mx-auto max-w-3xl">
            {/* Back link */}
            <Link
              className="mb-6 inline-flex items-center gap-2 text-sm transition-colors hover:opacity-70"
              href="/help"
              style={{ color: "var(--landing-text-muted)" }}
            >
              <IconArrowLeft className="size-4" />
              Help Center
            </Link>

            <div className="flex items-start gap-4">
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--landing-card)",
                  border: "1px solid var(--landing-border)",
                }}
              >
                <Icon className="size-7" style={{ color: "var(--landing-accent)" }} />
              </div>
              <div>
                <h1
                  className="font-bold text-3xl tracking-tight sm:text-4xl"
                  style={{ color: "var(--landing-text)" }}
                >
                  {category.title}
                </h1>
                <p className="mt-2 text-lg" style={{ color: "var(--landing-text-muted)" }}>
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <div
              className="rounded-2xl p-2"
              style={{
                backgroundColor: "var(--landing-bg-alt)",
                border: "1px solid var(--landing-border)",
              }}
            >
              {articles.length > 0 ? (
                <div className="space-y-2">
                  {articles.map((article) => (
                    <HelpArticleCard article={article} key={article.slug} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p style={{ color: "var(--landing-text-muted)" }}>
                    No articles in this category yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Back to Help Center */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-70"
              href="/help"
              style={{ color: "var(--landing-accent)" }}
            >
              <IconArrowLeft className="size-4" />
              Back to Help Center
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

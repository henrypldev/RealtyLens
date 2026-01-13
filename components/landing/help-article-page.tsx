import { IconArrowLeft, IconClock } from '@tabler/icons-react'
import Link from 'next/link'
import type { HelpArticle, HelpArticleMeta, HelpCategory } from '@/lib/help'
import { HelpArticleCard } from './help-article-card'
import { LandingFooter } from './landing-footer'
import { LandingNav } from './landing-nav'

interface HelpArticlePageProps {
  article: HelpArticle
  category: HelpCategory
  relatedArticles: HelpArticleMeta[]
}

export function HelpArticlePage({ article, category, relatedArticles }: HelpArticlePageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--landing-bg)' }}>
      <LandingNav />

      <main>
        {/* Article Header */}
        <section className="px-6 pt-20 pb-8 md:pt-28">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <Link
              className="mb-6 inline-flex items-center gap-2 text-sm transition-colors hover:opacity-70"
              href={`/help/${category.slug}`}
              style={{ color: 'var(--landing-text-muted)' }}
            >
              <IconArrowLeft className="size-4" />
              {category.title}
            </Link>

            <h1
              className="font-bold text-3xl leading-tight tracking-tight sm:text-4xl"
              style={{ color: 'var(--landing-text)' }}
            >
              {article.title}
            </h1>

            <p
              className="mt-4 text-lg leading-relaxed"
              style={{ color: 'var(--landing-text-muted)' }}
            >
              {article.description}
            </p>

            <div
              className="mt-6 flex items-center gap-2 text-sm"
              style={{ color: 'var(--landing-text-muted)' }}
            >
              <IconClock className="size-4" />
              <span>{article.readingTime}&nbsp;min read</span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="px-6 pb-16">
          <article className="mx-auto max-w-3xl">
            <div
              className="prose prose-lg max-w-none"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Sanitized markdown content
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={
                {
                  '--tw-prose-body': 'var(--landing-text-muted)',
                  '--tw-prose-headings': 'var(--landing-text)',
                  '--tw-prose-links': 'var(--landing-accent)',
                  '--tw-prose-bold': 'var(--landing-text)',
                  '--tw-prose-bullets': 'var(--landing-accent)',
                  '--tw-prose-counters': 'var(--landing-accent)',
                  '--tw-prose-quotes': 'var(--landing-text)',
                  '--tw-prose-quote-borders': 'var(--landing-accent)',
                  '--tw-prose-code': 'var(--landing-text)',
                  '--tw-prose-pre-code': 'var(--landing-text-muted)',
                  '--tw-prose-pre-bg': 'var(--landing-bg-alt)',
                } as React.CSSProperties
              }
            />
          </article>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="px-6 py-16" style={{ backgroundColor: 'var(--landing-bg-alt)' }}>
            <div className="mx-auto max-w-3xl">
              <h2
                className="mb-6 font-semibold text-sm uppercase tracking-wider"
                style={{ color: 'var(--landing-text-muted)' }}
              >
                Related Articles
              </h2>
              <div className="space-y-3">
                {relatedArticles.map((relatedArticle) => (
                  <HelpArticleCard article={relatedArticle} key={relatedArticle.slug} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Help Center */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-70"
              href="/help"
              style={{ color: 'var(--landing-accent)' }}
            >
              <IconArrowLeft className="size-4" />
              Back to Help Center
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}

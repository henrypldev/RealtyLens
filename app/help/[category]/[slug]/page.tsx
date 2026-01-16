import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HelpArticlePage } from '@/components/landing/help-article-page'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { constructMetadata, getMetadataBaseUrl } from '@/lib/constructMetadata'
import {
  getAllHelpArticlePaths,
  getCategoryBySlug,
  getHelpArticle,
  getRelatedArticles,
} from '@/lib/help'

interface HelpArticlePageProps {
  params: Promise<{ category: string; slug: string }>
}

export function generateStaticParams() {
  const paths = getAllHelpArticlePaths()
  return paths.map(({ category, slug }) => ({
    category,
    slug,
  }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: HelpArticlePageProps): Promise<Metadata> {
  const { category: categorySlug, slug } = await params
  const article = await getHelpArticle(categorySlug, slug)

  if (!article) {
    return constructMetadata({
      title: 'Article Not Found | RealtyLens Help',
      noIndex: true,
    })
  }

  return constructMetadata({
    title: `${article.title} | RealtyLens Help`,
    description: article.description,
    canonical: `/help/${categorySlug}/${slug}`,
    ogImageParams: {
      title: article.title,
      description: article.description,
      type: 'help',
    },
  })
}

export default async function HelpArticle({ params }: HelpArticlePageProps) {
  const { category: categorySlug, slug } = await params

  const article = await getHelpArticle(categorySlug, slug)
  const category = getCategoryBySlug(categorySlug)

  if (!(article && category)) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(slug, categorySlug, 3)
  const baseUrl = getMetadataBaseUrl()

  // Breadcrumb items for structured data
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Help Center', url: `${baseUrl}/help` },
    { name: category.title, url: `${baseUrl}/help/${categorySlug}` },
    { name: article.title, url: `${baseUrl}/help/${categorySlug}/${slug}` },
  ]

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        publishedTime={new Date().toISOString()}
        author="RealtyLens Team"
        url={`${baseUrl}/help/${categorySlug}/${slug}`}
        section={category.title}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <HelpArticlePage article={article} category={category} relatedArticles={relatedArticles} />
    </>
  )
}

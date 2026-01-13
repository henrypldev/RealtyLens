import { Suspense } from 'react'
import { HelpPage } from '@/components/landing/help-page'
import { constructMetadata } from '@/lib/constructMetadata'
import {
  getAllHelpArticles,
  getArticlesByCategory,
  getPopularArticles,
  helpCategories,
} from '@/lib/help'

export const metadata = constructMetadata({
  title: 'Help Center | RealtyLens',
  description:
    'Get help with RealtyLens. Browse our knowledge base for guides, tutorials, and answers to frequently asked questions.',
  canonical: '/help',
})

export default function Help() {
  const articles = getAllHelpArticles()
  const popularArticles = getPopularArticles()

  // Calculate article count per category
  const articleCountByCategory: Record<string, number> = {}
  for (const category of helpCategories) {
    articleCountByCategory[category.slug] = getArticlesByCategory(category.slug).length
  }

  return (
    <Suspense>
      <HelpPage
        articleCountByCategory={articleCountByCategory}
        articles={articles}
        categories={[...helpCategories]}
        popularArticles={popularArticles}
      />
    </Suspense>
  )
}

import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { getMetadataBaseUrl } from '@/lib/constructMetadata'
import { getAllHelpArticles, helpCategories } from '@/lib/help'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getMetadataBaseUrl()
  const now = new Date()

  // Static pages with their priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Blog posts
  const blogPosts = getAllPosts()
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Help category pages
  const helpCategoryPages: MetadataRoute.Sitemap = helpCategories.map((category) => ({
    url: `${baseUrl}/help/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Help article pages
  const helpArticles = getAllHelpArticles()
  const helpArticlePages: MetadataRoute.Sitemap = helpArticles.map((article) => ({
    url: `${baseUrl}/help/${article.category}/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages, ...helpCategoryPages, ...helpArticlePages]
}

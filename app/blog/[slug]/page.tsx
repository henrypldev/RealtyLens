import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostPage } from '@/components/landing/blog-post-page'
import { BlogPostingJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { constructMetadata, getMetadataBaseUrl } from '@/lib/constructMetadata'

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Return 404 for slugs not generated at build time
export const dynamicParams = false

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return constructMetadata({
      title: 'Post Not Found | RealtyLens',
      noIndex: true,
    })
  }

  return constructMetadata({
    title: `${post.title} | RealtyLens Blog`,
    description: post.description,
    canonical: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.date,
    authors: [post.author],
    section: post.category,
    ogImageParams: {
      title: post.title,
      description: post.description,
      type: 'blog',
    },
  })
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, post.category, 3)
  const baseUrl = getMetadataBaseUrl()

  // Breadcrumb items for structured data
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
    { name: post.title, url: `${baseUrl}/blog/${slug}` },
  ]

  return (
    <>
      <BlogPostingJsonLd
        title={post.title}
        description={post.description}
        publishedTime={post.date}
        author={post.author}
        url={`${baseUrl}/blog/${slug}`}
        image={post.image}
        section={post.category}
        wordCount={post.readingTime * 200}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <BlogPostPage post={post} relatedPosts={relatedPosts} />
    </>
  )
}

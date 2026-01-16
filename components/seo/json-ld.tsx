import { getMetadataBaseUrl } from '@/lib/constructMetadata'
import { siteConfig } from '@/lib/siteconfig'

type JsonLdProps = {
  data: Record<string, unknown>
}

function JsonLd({ data }: JsonLdProps) {
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify safely escapes the data for JSON-LD injection
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

// Organization Schema - Use in root layout
export function OrganizationJsonLd() {
  const baseUrl = getMetadataBaseUrl()

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: siteConfig.description,
    email: siteConfig.email.from,
    sameAs: [`https://twitter.com/${siteConfig.twitterHandle?.replace('@', '')}`],
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.email.from,
      contactType: 'customer service',
    },
  }

  return <JsonLd data={data} />
}

// WebSite Schema with SearchAction - Use in root layout
export function WebSiteJsonLd() {
  const baseUrl = getMetadataBaseUrl()

  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/help?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <JsonLd data={data} />
}

// Article Schema - Use in blog posts
type ArticleJsonLdProps = {
  title: string
  description: string
  publishedTime: string
  modifiedTime?: string
  author: string
  url: string
  image?: string
  section?: string
}

export function ArticleJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  author,
  url,
  image,
  section,
}: ArticleJsonLdProps) {
  const baseUrl = getMetadataBaseUrl()

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || `${baseUrl}/og-image.png`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(section && { articleSection: section }),
  }

  return <JsonLd data={data} />
}

// BlogPosting Schema - More specific for blog posts
type BlogPostingJsonLdProps = ArticleJsonLdProps & {
  wordCount?: number
  keywords?: string[]
}

export function BlogPostingJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  author,
  url,
  image,
  section,
  wordCount,
  keywords,
}: BlogPostingJsonLdProps) {
  const baseUrl = getMetadataBaseUrl()

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image || `${baseUrl}/og-image.png`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(section && { articleSection: section }),
    ...(wordCount && { wordCount }),
    ...(keywords && { keywords: keywords.join(', ') }),
  }

  return <JsonLd data={data} />
}

// Breadcrumb Schema
type BreadcrumbItem = {
  name: string
  url: string
}

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={data} />
}

// FAQ Schema - Use in help pages
type FAQItem = {
  question: string
  answer: string
}

type FAQPageJsonLdProps = {
  items: FAQItem[]
}

export function FAQPageJsonLd({ items }: FAQPageJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return <JsonLd data={data} />
}

// HowTo Schema - Great for tutorial/guide content
type HowToStep = {
  name: string
  text: string
  image?: string
}

type HowToJsonLdProps = {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string // ISO 8601 duration format, e.g., "PT30M"
  image?: string
}

export function HowToJsonLd({ name, description, steps, totalTime, image }: HowToJsonLdProps) {
  const baseUrl = getMetadataBaseUrl()

  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image: image || `${baseUrl}/og-image.png`,
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  }

  return <JsonLd data={data} />
}

// SoftwareApplication Schema - For the main product
export function SoftwareApplicationJsonLd() {
  const baseUrl = getMetadataBaseUrl()

  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    url: baseUrl,
    applicationCategory: 'PhotographyApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '99',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '99',
        priceCurrency: 'USD',
        unitText: 'per project',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  }

  return <JsonLd data={data} />
}

// Product Schema - Alternative for pricing page
type ProductJsonLdProps = {
  name: string
  description: string
  price: string
  currency?: string
  image?: string
}

export function ProductJsonLd({
  name,
  description,
  price,
  currency = 'USD',
  image,
}: ProductJsonLdProps) {
  const baseUrl = getMetadataBaseUrl()

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || `${baseUrl}/og-image.png`,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
  }

  return <JsonLd data={data} />
}

'use client'

import { Check, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import type { PolarProduct } from '@/lib/polar'

function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

function PricingCard({ product, isPopular }: { product: PolarProduct; isPopular: boolean }) {
  const features =
    product.benefits.length > 0
      ? product.benefits
      : [`Up to ${product.maxImages} photos per project`]

  return (
    <div
      className={`relative rounded-2xl p-8 shadow-xl max-w-md w-full ${
        isPopular
          ? 'bg-primary text-primary-foreground shadow-primary/20'
          : 'bg-card text-foreground border border-border'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-foreground px-4 py-1 text-xs font-semibold text-primary">
          Most Popular
        </div>
      )}
      <div className="mb-6">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
            isPopular ? 'bg-primary-foreground/20' : 'bg-muted'
          }`}
        >
          <ImageIcon
            className={`h-6 w-6 ${isPopular ? 'text-primary-foreground' : 'text-foreground'}`}
          />
        </div>
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-4xl font-bold">
            {formatPrice(product.priceCents, product.currency)}
          </span>
          <span
            className={`ml-1 ${isPopular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
          >
            /project
          </span>
        </div>
        {product.description && (
          <p
            className={`mt-2 text-sm ${isPopular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
          >
            {product.description}
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              className={`h-5 w-5 shrink-0 ${isPopular ? 'text-primary-foreground' : 'text-primary'}`}
            />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full min-h-11 ${
          isPopular
            ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
        render={<Link href="/sign-in">Start Project</Link>}
        nativeButton={false}
      />
    </div>
  )
}

function PricingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="relative rounded-2xl p-8 bg-card border border-border max-w-md w-full animate-pulse"
        >
          <div className="mb-6">
            <div className="w-12 h-12 rounded-xl mb-4 bg-muted" />
            <div className="h-6 w-24 bg-muted rounded" />
            <div className="mt-2 h-10 w-20 bg-muted rounded" />
            <div className="mt-2 h-4 w-40 bg-muted rounded" />
          </div>
          <div className="space-y-3 mb-8">
            {[0, 1, 2].map((j) => (
              <div key={j} className="h-4 bg-muted rounded" />
            ))}
          </div>
          <div className="h-11 bg-muted rounded" />
        </div>
      ))}
    </div>
  )
}

export function PricingSection() {
  const [products, setProducts] = useState<PolarProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="pricing" className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Pricing</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Simple per-project pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No subscriptions. No commitments. Just pay per project.
          </p>
        </div>

        {loading ? (
          <PricingSkeleton />
        ) : products.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <PricingCard
                key={product.id}
                product={product}
                isPopular={index === products.length - 1}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No pricing plans available.</p>
        )}
      </div>
    </section>
  )
}

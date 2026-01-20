'use client'

import { IconArrowRight, IconCheck, IconMinus, IconPhoto, IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import posthog from 'posthog-js'
import { useEffect, useState } from 'react'
import type { PolarProduct } from '@/lib/polar'
import { LandingFooter } from './landing-footer'
import { LandingNav } from './landing-nav'

function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

const faqs = [
  {
    question: 'How does the pricing work?',
    answer:
      'We charge per project, not per month. Choose a plan based on how many images you need to process. No subscriptions, no hidden fees.',
  },
  {
    question: 'What image formats do you support?',
    answer:
      'We support all common image formats including JPG, PNG, and WEBP. Maximum file size is 10MB per image. Enhanced images are delivered in high-resolution JPG format.',
  },
  {
    question: 'How long does processing take?',
    answer:
      'Photo enhancement typically takes under 30 seconds per image. Video creation usually takes 5-10 minutes depending on the number of images and selected options.',
  },
  {
    question: 'Can I try before I buy?',
    answer:
      'Yes! New users get free credits to try out the platform. You can enhance a few images to see the quality before committing to a full property project.',
  },
  {
    question: 'How many edits can I make per photo?',
    answer:
      'You can try multiple style variations on each photo until you get the perfect result. Edit until you love it—one flat price.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "If you're not satisfied with the results, contact us within 24 hours of processing and we'll work with you to make it right or provide a refund.",
  },
]

function PricingCard({ product, isPopular }: { product: PolarProduct; isPopular: boolean }) {
  const features =
    product.benefits.length > 0
      ? product.benefits
      : [`Up to ${product.maxImages} photos per project`]

  return (
    <div
      className="relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: isPopular ? 'var(--landing-card)' : 'var(--landing-bg)',
        boxShadow: isPopular
          ? '0 20px 40px -12px var(--landing-shadow)'
          : '0 4px 24px -4px var(--landing-shadow)',
        border: isPopular ? '2px solid var(--landing-accent)' : '1px solid var(--landing-border)',
      }}
    >
      {isPopular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 font-semibold text-xs"
          style={{
            backgroundColor: 'var(--landing-accent)',
            color: 'var(--landing-accent-foreground)',
          }}
        >
          Most Popular
        </div>
      )}

      <div
        className="relative mb-6 inline-flex size-14 items-center justify-center rounded-xl"
        style={{
          backgroundColor: isPopular ? 'var(--landing-accent)' : 'var(--landing-bg-alt)',
          border: isPopular ? 'none' : '1px solid var(--landing-border)',
        }}
      >
        <IconPhoto
          className="size-7"
          style={{
            color: isPopular ? 'var(--landing-accent-foreground)' : 'var(--landing-accent)',
          }}
        />
      </div>

      <h3 className="font-semibold text-xl" style={{ color: 'var(--landing-text)' }}>
        {product.name}
      </h3>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-bold text-4xl tabular-nums" style={{ color: 'var(--landing-text)' }}>
          {formatPrice(product.priceCents, product.currency)}
        </span>
        <span className="text-sm" style={{ color: 'var(--landing-text-muted)' }}>
          per project
        </span>
      </div>

      <ul className="mt-8 flex-1 space-y-4">
        {features.map((feature) => (
          <li className="flex items-start gap-3" key={feature}>
            <IconCheck
              className="mt-0.5 size-5 shrink-0"
              style={{ color: 'var(--landing-accent)' }}
            />
            <span className="text-sm" style={{ color: 'var(--landing-text-muted)' }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full font-medium text-base transition-all duration-200 hover:scale-[1.02]"
        href="/sign-in"
        onClick={() => {
          posthog.capture('pricing_cta_clicked', {
            plan_name: product.name,
            price: product.priceCents,
          })
        }}
        style={{
          backgroundColor: isPopular ? 'var(--landing-accent)' : 'var(--landing-bg-alt)',
          color: isPopular ? 'var(--landing-accent-foreground)' : 'var(--landing-text)',
          border: isPopular ? 'none' : '1px solid var(--landing-border-strong)',
        }}
      >
        Get Started
        <IconArrowRight className="size-5" />
      </Link>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="rounded-xl transition-colors"
      style={{
        backgroundColor: isOpen ? 'var(--landing-card)' : 'transparent',
        border: '1px solid var(--landing-border)',
      }}
    >
      <button
        className="flex w-full items-center justify-between p-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="font-medium" style={{ color: 'var(--landing-text)' }}>
          {question}
        </span>
        {isOpen ? (
          <IconMinus className="size-5 shrink-0" style={{ color: 'var(--landing-text-muted)' }} />
        ) : (
          <IconPlus className="size-5 shrink-0" style={{ color: 'var(--landing-text-muted)' }} />
        )}
      </button>
      {isOpen && (
        <div
          className="px-5 pb-5 text-sm leading-relaxed"
          style={{ color: 'var(--landing-text-muted)' }}
        >
          {answer}
        </div>
      )}
    </div>
  )
}

function PricingSkeleton() {
  return (
    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-8 animate-pulse"
          style={{
            backgroundColor: 'var(--landing-bg)',
            border: '1px solid var(--landing-border)',
          }}
        >
          <div
            className="size-14 rounded-xl mb-6"
            style={{ backgroundColor: 'var(--landing-border)' }}
          />
          <div className="h-6 w-24 rounded" style={{ backgroundColor: 'var(--landing-border)' }} />
          <div
            className="mt-4 h-10 w-20 rounded"
            style={{ backgroundColor: 'var(--landing-border)' }}
          />
          <div className="mt-8 space-y-4">
            {[0, 1, 2].map((j) => (
              <div
                key={j}
                className="h-4 rounded"
                style={{ backgroundColor: 'var(--landing-border)' }}
              />
            ))}
          </div>
          <div
            className="mt-8 h-12 rounded-full"
            style={{ backgroundColor: 'var(--landing-border)' }}
          />
        </div>
      ))}
    </div>
  )
}

export function PricingPage() {
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--landing-bg)' }}>
      <LandingNav />

      <main>
        <section className="px-6 pt-20 pb-16 text-center md:pt-28 md:pb-24">
          <div className="mx-auto max-w-3xl">
            <p
              className="font-semibold text-sm uppercase tracking-wider"
              style={{ color: 'var(--landing-accent)' }}
            >
              Pricing
            </p>
            <h1
              className="mt-3 font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl"
              style={{ color: 'var(--landing-text)' }}
            >
              Simple, transparent
              <br />
              pricing
            </h1>
            <p
              className="mt-4 text-lg leading-relaxed md:text-xl"
              style={{ color: 'var(--landing-text-muted)' }}
            >
              Pay per project. No subscriptions, no hidden fees.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          {loading ? (
            <PricingSkeleton />
          ) : products.length > 0 ? (
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              {products.map((product, index) => (
                <PricingCard
                  key={product.id}
                  product={product}
                  isPopular={index === products.length - 1}
                />
              ))}
            </div>
          ) : (
            <p className="text-center" style={{ color: 'var(--landing-text-muted)' }}>
              No pricing plans available.
            </p>
          )}
        </section>

        <section className="px-6 py-24" style={{ backgroundColor: 'var(--landing-bg-alt)' }}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p
                className="font-semibold text-sm uppercase tracking-wider"
                style={{ color: 'var(--landing-accent)' }}
              >
                FAQ
              </p>
              <h2
                className="mt-3 font-bold text-3xl tracking-tight sm:text-4xl"
                style={{ color: 'var(--landing-text)' }}
              >
                Frequently asked questions
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {faqs.map((faq) => (
                <FaqItem answer={faq.answer} key={faq.question} question={faq.question} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div
            className="mx-auto max-w-4xl rounded-3xl px-8 py-16 text-center md:px-16"
            style={{
              backgroundColor: 'var(--landing-card)',
              boxShadow: '0 25px 50px -12px var(--landing-shadow)',
              border: '1px solid var(--landing-border)',
            }}
          >
            <h2
              className="font-bold text-3xl tracking-tight sm:text-4xl"
              style={{ color: 'var(--landing-text)' }}
            >
              Ready to get started?
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-lg leading-relaxed"
              style={{ color: 'var(--landing-text-muted)' }}
            >
              Transform your property photos today. No credit card required to try.
            </p>
            <div className="mt-8">
              <Link
                className="inline-flex h-12 items-center gap-2 rounded-full px-8 font-medium text-base transition-all duration-200 hover:scale-[1.03]"
                href="/sign-in"
                style={{
                  backgroundColor: 'var(--landing-accent)',
                  color: 'var(--landing-accent-foreground)',
                }}
              >
                Start for Free
                <IconArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}

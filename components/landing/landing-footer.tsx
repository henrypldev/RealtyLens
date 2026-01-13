import { IconBrandGithub } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteconfig'

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ],
  company: [
    // { label: "About", href: "/about" },
    // { label: "Blog", href: "/blog" },
    // { label: "Help Center", href: "/help" },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Source Code', href: siteConfig.sourceCode, external: true },
  ],
}

export function LandingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={36}
                height={36}
                className="block dark:hidden"
              />
              <Image
                src="/logo-dark-theme.png"
                alt={siteConfig.name}
                width={36}
                height={36}
                className="hidden dark:block"
              />
              <span className="text-xl font-semibold text-foreground">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered photo enhancement for real estate professionals.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index.toString()}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index.toString()}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      className="inline-flex items-center gap-1 text-sm transition-colors hover:opacity-70"
                      href={link.href}
                      rel="noopener noreferrer"
                      style={{ color: 'var(--landing-text-muted)' }}
                      target="_blank"
                    >
                      <IconBrandGithub className="size-4" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      className="text-sm transition-colors hover:opacity-70"
                      href={link.href}
                      style={{ color: 'var(--landing-text-muted)' }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} RealtyLens. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

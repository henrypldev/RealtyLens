import { IconSearch } from "@tabler/icons-react";
import type { BlogPostMeta } from "@/lib/blog";
import { BlogCard } from "./blog-card";
import { LandingFooter } from "./landing-footer";
import { LandingNav } from "./landing-nav";

interface BlogPageProps {
  posts: BlogPostMeta[];
  categories: string[];
}

export function BlogPage({ posts, categories }: BlogPageProps) {
  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--landing-bg)" }}
    >
      <LandingNav />

      <main>
        {/* Hero Section */}
        <section className="px-6 pt-20 pb-12 text-center md:pt-28 md:pb-16">
          <div className="mx-auto max-w-3xl">
            <p
              className="font-semibold text-sm uppercase tracking-wider"
              style={{ color: "var(--landing-accent)" }}
            >
              Our Blog
            </p>
            <h1
              className="mt-3 font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl"
              style={{ color: "var(--landing-text)" }}
            >
              Insights & Resources
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed md:text-xl"
              style={{ color: "var(--landing-text-muted)" }}
            >
              Tips, guides, and industry insights to help you create stunning
              property listings. Learn from experts and elevate your real estate
              photography.
            </p>
          </div>
        </section>

        {/* Category Pills */}
        <section className="px-6 pb-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                className="rounded-full px-4 py-2 font-medium text-sm transition-colors"
                style={{
                  backgroundColor: "var(--landing-accent)",
                  color: "var(--landing-accent-foreground)",
                }}
                type="button"
              >
                All Posts
              </button>
              {categories.map((category) => (
                <button
                  className="rounded-full px-4 py-2 font-medium text-sm transition-colors hover:opacity-80"
                  key={category}
                  style={{
                    backgroundColor: "var(--landing-card)",
                    color: "var(--landing-text)",
                    border: "1px solid var(--landing-border)",
                  }}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="px-6 pb-16">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 flex items-center justify-between">
                <h2
                  className="font-semibold text-sm uppercase tracking-wider"
                  style={{ color: "var(--landing-text-muted)" }}
                >
                  Featured
                </h2>
              </div>
              <div className="space-y-8">
                {featuredPosts.map((post) => (
                  <BlogCard featured key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section
          className="px-6 py-16"
          style={{ backgroundColor: "var(--landing-bg-alt)" }}
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
              <h2
                className="font-semibold text-sm uppercase tracking-wider"
                style={{ color: "var(--landing-text-muted)" }}
              >
                All Articles
              </h2>
              <div className="relative">
                <IconSearch
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  style={{ color: "var(--landing-text-muted)" }}
                />
                <input
                  aria-label="Search articles"
                  className="h-10 w-48 rounded-full pr-4 pl-9 text-sm outline-none transition-all placeholder:opacity-50 focus:w-64 focus:ring-2"
                  placeholder="Search…"
                  style={{
                    backgroundColor: "var(--landing-card)",
                    color: "var(--landing-text)",
                    border: "1px solid var(--landing-border)",
                  }}
                  type="text"
                />
              </div>
            </div>

            {regularPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p style={{ color: "var(--landing-text-muted)" }}>
                  No articles found. Check back soon for new content.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="px-6 py-24">
          <div
            className="mx-auto max-w-4xl rounded-3xl px-8 py-16 text-center md:px-16"
            style={{
              backgroundColor: "var(--landing-card)",
              boxShadow: "0 25px 50px -12px var(--landing-shadow)",
              border: "1px solid var(--landing-border)",
            }}
          >
            <h2
              className="font-bold text-3xl tracking-tight sm:text-4xl"
              style={{ color: "var(--landing-text)" }}
            >
              Stay in the loop
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-lg leading-relaxed"
              style={{ color: "var(--landing-text-muted)" }}
            >
              Get the latest tips, guides, and product updates delivered to your
              inbox. No spam, unsubscribe anytime.
            </p>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                aria-label="Email address"
                className="h-12 flex-1 rounded-full px-5 text-base outline-none transition-all placeholder:opacity-50 focus:ring-2"
                placeholder="your@email.com"
                style={{
                  backgroundColor: "var(--landing-bg)",
                  color: "var(--landing-text)",
                  border: "1px solid var(--landing-border)",
                }}
                type="email"
              />
              <button
                className="h-12 rounded-full px-6 font-medium text-base transition-all duration-200 hover:scale-[1.03]"
                style={{
                  backgroundColor: "var(--landing-accent)",
                  color: "var(--landing-accent-foreground)",
                }}
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

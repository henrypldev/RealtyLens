import { IconArrowRight, IconCalendar, IconClock } from "@tabler/icons-react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (featured) {
    return (
      <Link
        className="group block overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.01]"
        href={`/blog/${post.slug}`}
        style={{
          backgroundColor: "var(--landing-card)",
          boxShadow: "0 20px 40px -12px var(--landing-shadow)",
          border: "1px solid var(--landing-border)",
        }}
      >
        <div className="grid gap-0 md:grid-cols-2">
          {/* Image */}
          <div
            className="relative aspect-[4/3] md:aspect-auto"
            style={{ backgroundColor: "var(--landing-bg-alt)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="font-bold text-6xl opacity-10"
                style={{ color: "var(--landing-accent)" }}
              >
                AI
              </div>
            </div>
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span
                className="rounded-full px-3 py-1 font-medium text-xs"
                style={{
                  backgroundColor: "var(--landing-accent)",
                  color: "var(--landing-accent-foreground)",
                }}
              >
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 md:p-10">
            <div
              className="mb-4 flex items-center gap-4 text-sm"
              style={{ color: "var(--landing-text-muted)" }}
            >
              <span className="flex items-center gap-1.5">
                <IconCalendar className="size-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <IconClock className="size-4" />
                {post.readingTime}&nbsp;min read
              </span>
            </div>

            <h2
              className="font-bold text-2xl leading-tight tracking-tight md:text-3xl"
              style={{ color: "var(--landing-text)" }}
            >
              {post.title}
            </h2>

            <p
              className="mt-4 line-clamp-3 text-base leading-relaxed"
              style={{ color: "var(--landing-text-muted)" }}
            >
              {post.description}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span
                className="font-semibold text-sm transition-colors group-hover:opacity-80"
                style={{ color: "var(--landing-accent)" }}
              >
                Read article
              </span>
              <IconArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                style={{ color: "var(--landing-accent)" }}
              />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
      href={`/blog/${post.slug}`}
      style={{
        backgroundColor: "var(--landing-card)",
        boxShadow: "0 10px 30px -8px var(--landing-shadow)",
        border: "1px solid var(--landing-border)",
      }}
    >
      {/* Image placeholder */}
      <div className="relative aspect-[16/10]" style={{ backgroundColor: "var(--landing-bg-alt)" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-bold text-4xl opacity-10" style={{ color: "var(--landing-accent)" }}>
            AI
          </div>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="rounded-full px-2.5 py-1 font-medium text-xs"
            style={{
              backgroundColor: "var(--landing-accent)",
              color: "var(--landing-accent-foreground)",
            }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div
          className="mb-3 flex items-center gap-3 text-xs"
          style={{ color: "var(--landing-text-muted)" }}
        >
          <span className="flex items-center gap-1">
            <IconCalendar className="size-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <IconClock className="size-3.5" />
            {post.readingTime}&nbsp;min
          </span>
        </div>

        <h3
          className="font-semibold text-lg leading-snug tracking-tight"
          style={{ color: "var(--landing-text)" }}
        >
          {post.title}
        </h3>

        <p
          className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed"
          style={{ color: "var(--landing-text-muted)" }}
        >
          {post.description}
        </p>

        <div className="mt-4 flex items-center gap-1.5">
          <span
            className="font-medium text-sm transition-colors group-hover:opacity-80"
            style={{ color: "var(--landing-accent)" }}
          >
            Read more
          </span>
          <IconArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            style={{ color: "var(--landing-accent)" }}
          />
        </div>
      </div>
    </Link>
  );
}

export const siteConfig = {
  name: "Proppi",
  title: "Proppi - AI-Powered Real Estate Photo Editor",
  description:
    "Transform your real estate photos with AI. Professional virtual staging, sky replacement, and photo enhancement for property listings.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://www.proppi.tech",

  // SEO
  ogImage: "/og-image.png",
  locale: "en",
  keywords: [
    "real estate",
    "AI photo editor",
    "property photos",
    "virtual staging",
    "real estate photography",
    "property listing photos",
    "AI image enhancement",
  ],
  authors: [{ name: "Proppi", url: "https://www.proppi.tech" }],
  creator: "Proppi",
  twitterHandle: "@codehagen",

  // Email settings
  email: {
    from: "noreply@updates.proppi.tech",
    replyTo: "christer@proppi.tech",
  },

  // Links
  links: {
    dashboard: "/dashboard",
    settings: "/dashboard/settings",
    help: "/help",
  },
} as const;

export type SiteConfig = typeof siteConfig;

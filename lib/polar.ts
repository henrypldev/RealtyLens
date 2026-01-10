import { Polar } from "@polar-sh/sdk";

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.POLAR_SANDBOX ? "sandbox" : "production",
});

export const POLAR_CONFIG = {
  ORGANIZATION_ID: process.env.POLAR_ORGANIZATION_ID!,
  PRODUCT_ID_IMAGE: process.env.POLAR_PRODUCT_ID_IMAGE!,
  PRODUCT_ID_VIDEO: process.env.POLAR_PRODUCT_ID_VIDEO!,

  PROJECT_PRICE_USD_CENTS: 9900,
  VIDEO_PRICE_USD_CENTS: 9900,

  SUCCESS_URL: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
} as const;

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

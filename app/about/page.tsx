import { AboutPage } from "@/components/landing/about-page";
import { constructMetadata } from "@/lib/constructMetadata";

export const metadata = constructMetadata({
  title: "About - RealtyLens",
  description:
    "Learn about RealtyLens, the AI-powered photo enhancement platform for real estate professionals.",
  canonical: "/about",
});

export default function Page() {
  return <AboutPage />;
}

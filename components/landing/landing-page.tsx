"use client";

import { BeforeAfterSection } from "./landing-before-after";
import { LandingCta } from "./landing-cta";
import { LandingFeatures } from "./landing-features";
import { LandingFooter } from "./landing-footer";
import { LandingHero } from "./landing-hero";
import { LandingHowItWorks } from "./landing-how-it-works";
import { LandingNav } from "./landing-nav";
import { PricingSection } from "./landing-pricing";

export function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--landing-bg)" }}>
      <LandingNav />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <BeforeAfterSection />
        <PricingSection />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}

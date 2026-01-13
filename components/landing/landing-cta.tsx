"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";

function CtaAuthButton() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div
        className="h-14 w-48 animate-pulse rounded-full"
        style={{ backgroundColor: "var(--landing-border)" }}
      />
    );
  }

  const href = session ? "/dashboard" : "/sign-in";
  const text = session ? "Go to Dashboard" : "Get Started Free";

  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button
        size="lg"
        className="w-full sm:w-auto min-h-12 bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8"
        render={
          <Link href={href}>
            {text}

            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        }
      />
    </div>
  );
}

export function LandingCta() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-12 sm:py-20 lg:py-24">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground text-balance">
              Start Creating Stunning Listings Today
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Join thousands of real estate professionals. Create professional photos in seconds,
              not hours.
            </p>
            <Suspense
              fallback={
                <div
                  className="mx-auto h-14 w-48 animate-pulse rounded-full"
                  style={{ backgroundColor: "var(--landing-border)" }}
                />
              }
            >
              <CtaAuthButton />
            </Suspense>
            <p className="mt-4 text-sm text-primary-foreground/70">
              No credit card required • Free trial included • Cancel anytime
            </p>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

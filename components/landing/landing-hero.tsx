"use client";

import { IconArrowRight, IconPlayerPlay } from "@tabler/icons-react";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";

function HeroAuthButton() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div
        className="h-12 w-36 animate-pulse rounded-full"
        style={{ backgroundColor: "var(--landing-border)" }}
      />
    );
  }

  const href = session ? "/dashboard" : "/sign-in";
  const text = session ? "Go to Dashboard" : "Get Started";

  return (
    <Button asChild>
      <Link
        className="inline-flex h-12 items-center gap-2 rounded-full px-7 font-medium text-base transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
        href={href}
      >
        {text}
        <IconArrowRight className="size-5" />
      </Link>
    </Button>
  );
}

export function LandingHero() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            #1 AI Photo Editor for Real Estate
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
            Create Stunning Property Photos <span className="text-primary">Instantly with AI</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Transform photos 10x faster. No design skills needed. Join thousands of real estate
            professionals who save hours every week.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Suspense
              fallback={
                <div
                  className="h-12 w-36 animate-pulse rounded-full"
                  style={{ backgroundColor: "var(--landing-border)" }}
                />
              }
            >
              <HeroAuthButton />
            </Suspense>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-h-12 text-base px-8 bg-transparent"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • Free trial included
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border bg-card">
              <img
                src="/modern-real-estate-photo-editing-software-dashboar.jpg"
                alt="RealtyLens app dashboard showing AI photo enhancement"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden lg:block">
              <div className="bg-card rounded-xl p-4 shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">AI</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Enhancement Complete</p>
                    <p className="text-xs text-muted-foreground">Processed in 2.3 seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

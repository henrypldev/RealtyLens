"use client";

import { Download, Upload, Wand2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Photos",
    description:
      "Drag and drop your property photos or select them from your device. We support all common image formats.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Choose a Style",
    description:
      "Select from our collection of professional style templates designed for different property types and aesthetics.",
  },
  {
    icon: Download,
    step: "03",
    title: "Download & Share",
    description:
      "Get your enhanced photos instantly. Download in high resolution, ready for your listings and marketing.",
  },
];

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">How It Works</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Three simple steps to perfect photos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No complicated software or design experience required. Just upload, select, and
            download.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary text-primary-foreground mb-6">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

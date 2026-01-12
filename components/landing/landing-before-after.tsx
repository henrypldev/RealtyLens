"use client";

import { useState } from "react";

export function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">
            See the Difference
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Before & After
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Drag the slider to see the dramatic transformation our AI can achieve.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-border shadow-xl">
            {/* After image (full) */}
            <img
              src="/after.jpg"
              alt="After AI enhancement"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Before image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src="/before.jpg"
                alt="Before AI enhancement"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Slider control */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-primary-foreground cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-primary-foreground shadow-lg flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-foreground/80 text-background text-sm font-medium rounded-full">
              Before
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
              After
            </div>
          </div>

          {/* Slider input */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            aria-label="Before and after comparison slider"
          />
        </div>
      </div>
    </section>
  );
}

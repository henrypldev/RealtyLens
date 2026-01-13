'use client'

import { Globe, Layers, Palette, Shield, Sparkles, Zap } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Enhancement',
    description:
      'Our advanced AI transforms ordinary photos into stunning, professional-quality images automatically.',
  },
  {
    icon: Palette,
    title: 'Multiple Style Templates',
    description:
      'Choose from a variety of professionally designed styles to match your brand and property type.',
  },
  {
    icon: Zap,
    title: 'Results in Seconds',
    description: 'No waiting around. Get your enhanced photos back in seconds, not hours or days.',
  },
  {
    icon: Layers,
    title: 'Batch Processing',
    description: 'Upload multiple photos at once and process entire property shoots in one go.',
  },
  {
    icon: Globe,
    title: 'No Software Required',
    description:
      'Everything runs in your browser. No downloads, no installations, no technical skills needed.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Your photos are encrypted and automatically deleted after processing. Your data stays yours.',
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Features</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Everything you need to create stunning listings
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed specifically for real estate professionals who want to save
            time and impress clients.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

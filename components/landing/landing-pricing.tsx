import { Check, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PricingSection() {
  const plans = [
    {
      name: 'Image Enhancement',
      price: '$99',
      period: '/project',
      description: 'Professional AI enhancement for your property photos.',
      icon: ImageIcon,
      features: [
        'Up to 50 photos per project',
        'AI sky replacement',
        'Color correction & HDR',
        'Object removal',
        'Virtual staging options',
        '4K resolution output',
        '24-hour turnaround',
      ],
      cta: 'Start Project',
    },
    // {
    //   name: "Video Enhancement",
    //   price: "$99",
    //   period: "/project",
    //   description: "Transform your property videos with AI enhancement.",
    //   icon: Video,
    //   features: [
    //     "Up to 3 minutes of footage",
    //     "AI color grading",
    //     "Stabilization & smoothing",
    //     "Sky enhancement",
    //     "Audio noise reduction",
    //     "4K resolution output",
    //     "48-hour turnaround",
    //   ],
    //   cta: "Start Project",
    //   popular: false,
    // },
  ]

  return (
    <section id="pricing" className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Pricing</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Simple per-project pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No subscriptions. No commitments. Just pay per project.
          </p>
        </div>

        <div className="flex justify-center gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative rounded-2xl p-8 bg-primary text-primary-foreground shadow-xl shadow-primary/20 max-w-md w-full"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-primary-foreground/20">
                  <plan.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-primary-foreground/80">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-primary-foreground/80">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary-foreground" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full min-h-11 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

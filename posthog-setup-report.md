# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into your RealtyLens Next.js project. The integration includes:

- **Client-side initialization** via `instrumentation-client.ts` using the Next.js 15.3+ pattern
- **Server-side tracking** capability via `lib/posthog-server.ts` for backend events
- **Reverse proxy configuration** in `next.config.ts` to route analytics through your domain (`/ingest/*`)
- **User identification** on sign-up, sign-in, and invitation acceptance
- **Session reset** on sign-out to properly handle multi-user devices
- **Error tracking** enabled via `capture_exceptions: true`
- **Environment variables** configured in `.env` for PostHog API key and host

## Events Instrumented

| Event Name | Description | File Path |
|------------|-------------|-----------|
| `user_signed_up` | User successfully created a new account | `app/(auth)/sign-up/page.tsx` |
| `user_signed_in` | User successfully signed into their account | `app/(auth)/sign-in/page.tsx` |
| `user_signed_out` | User signed out of their account | `components/dashboard/sign-out-button.tsx` |
| `onboarding_completed` | User completed their profile setup during onboarding | `components/onboarding/onboarding-form.tsx` |
| `project_created` | User created a new photo enhancement project | `components/projects/new-project-dialog.tsx` |
| `images_added_to_project` | User added additional images to an existing project | `components/dashboard/add-images-dialog.tsx` |
| `image_edited` | User used the mask editor to remove or add objects in an image | `components/dashboard/image-mask-editor.tsx` |
| `video_images_selected` | User selected images for video creation | `components/video/video-creation/steps/select-images-step.tsx` |
| `team_member_invited` | User created an invitation link for a team member | `components/settings/invite-member-dialog.tsx` |
| `invitation_accepted` | User accepted a workspace invitation and joined the team | `app/invite/[token]/invite-accept-form.tsx` |
| `contact_form_submitted` | User submitted the contact form | `components/landing/contact-page.tsx` |
| `pricing_cta_clicked` | User clicked Get Started button on pricing page | `components/landing/pricing-page.tsx` |

## Files Created/Modified

### New Files
- `instrumentation-client.ts` - PostHog client-side initialization
- `lib/posthog-server.ts` - Server-side PostHog client
- `.env` - Environment variables for PostHog

### Modified Files
- `next.config.ts` - Added reverse proxy rewrites and `skipTrailingSlashRedirect`
- `app/(auth)/sign-up/page.tsx` - Added user identification and sign-up event
- `app/(auth)/sign-in/page.tsx` - Added user identification and sign-in event
- `components/dashboard/sign-out-button.tsx` - Added sign-out event and session reset
- `components/onboarding/onboarding-form.tsx` - Added onboarding completed event
- `components/projects/new-project-dialog.tsx` - Added project created event
- `components/dashboard/add-images-dialog.tsx` - Added images added event
- `components/dashboard/image-mask-editor.tsx` - Added image edited event
- `components/video/video-creation/steps/select-images-step.tsx` - Added video images selected event
- `components/settings/invite-member-dialog.tsx` - Added team member invited event
- `app/invite/[token]/invite-accept-form.tsx` - Added invitation accepted event
- `components/landing/contact-page.tsx` - Added contact form submitted event
- `components/landing/pricing-page.tsx` - Added pricing CTA clicked event

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/289356/dashboard/1040057) - Core analytics dashboard with key metrics

### Insights
- [User Sign-ups Over Time](https://us.posthog.com/project/289356/insights/mq3a0ENC) - Track new user registrations
- [Sign-up to Onboarding Funnel](https://us.posthog.com/project/289356/insights/fZbnOCva) - Conversion from sign-up to onboarding completion
- [Projects Created Over Time](https://us.posthog.com/project/289356/insights/ThLg4ud8) - Track project creation engagement
- [Sign-up to First Project Funnel](https://us.posthog.com/project/289356/insights/Zi8clz42) - Full conversion funnel from sign-up to first project
- [Key User Actions](https://us.posthog.com/project/289356/insights/s6atkk9i) - Overview of key business actions

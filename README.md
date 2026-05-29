# Inglevo

Inglevo is a SaaS web app for LATAM professionals who want to practice professional English and improve interview readiness for remote roles with U.S. companies or international clients.

Core loop:

```text
usuario responde entrevista -> IA corrige -> respuesta mejorada -> guarda historial
```

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth + Database
- OpenAI API
- Stripe placeholder
- Zod
- React Hook Form
- Lucide icons

## Installation

```bash
npm install
cp .env.example .env.local
```

## Environment Variables

Configure these in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRO_PRICE_ID`
- `STRIPE_CAREER_SPRINT_PRICE_ID`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_ANALYTICS_PROVIDER`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

The app does not block without keys:

- Missing `OPENAI_API_KEY`: returns mock feedback.
- Missing Stripe keys: checkout shows `Checkout todavía no está configurado.`
- Missing Supabase keys: app runs in demo mode and does not persist real user data.
- Missing analytics keys: analytics is disabled safely.

## Analytics

Analytics is optional and supports Plausible or PostHog without blocking the app.

Set one provider:

```bash
NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

or:

```bash
NEXT_PUBLIC_ANALYTICS_PROVIDER=posthog
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Tracked funnel events:

- `signup_started`
- `signup_completed`
- `onboarding_completed`
- `interview_started`
- `feedback_generated`
- `practice_saved`
- `readiness_viewed`
- `asset_created`
- `upgrade_clicked`

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase

Apply schema:

1. Open Supabase SQL Editor.
2. Run `supabase/migrations/001_initial.sql`.
3. Run `supabase/seed.sql`.

The schema includes RLS for profiles, practice sessions, templates, and subscriptions.

## Functional

- Landing page.
- Pricing page with Stripe placeholder.
- Supabase signup/login/logout.
- Protected `/app/*` routes.
- Onboarding flow.
- Dashboard with practice metrics.
- Interview Simulator.
- `/api/coach-feedback` with Zod validation, OpenAI call, mock fallback, and Supabase save.
- Templates Library with category filter and copy button.
- Practice History with empty state and feedback summary.
- Settings page for basic profile fields.

## Placeholders

- Stripe checkout until keys and price IDs are configured.
- Career Sprint beta plan.
- CV/LinkedIn review inside Career Sprint.
- Demo mode when Supabase is not configured.

## Production Pending

- Configure real Supabase project and auth settings.
- Configure OpenAI production key and monitor usage.
- Configure Stripe products, prices, webhooks, and subscription sync.
- Add production observability.
- Deploy to Vercel.

# Inglevo — Agent Instructions

## Qué es este proyecto

Web app SaaS de inglés profesional para profesionales LATAM que quieren trabajo remoto con empresas de EE. UU. o clientes internacionales.

## Loop central

Prioridad absoluta:

usuario responde pregunta de entrevista → IA evalúa → respuesta mejorada → guarda historial

Ese loop es el producto.

## Stack

- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth + Database
- OpenAI API
- Stripe
- Vercel

## Idioma

- UI en español
- ejercicios en inglés
- respuestas mejoradas en inglés
- feedback puede estar en español

## Rutas del proyecto

### Públicas

- `/` landing
- `/pricing` precios
- `/login` login
- `/signup` registro

### App protegida

- `/app` dashboard
- `/app/onboarding` onboarding
- `/app/interview` simulador de entrevistas
- `/app/templates` biblioteca de templates
- `/app/history` historial de prácticas
- `/app/settings` configuración básica

### API

- `/api/coach-feedback`
- `/api/stripe/create-checkout-session`

## Decisiones de producto

- Priorizar claridad y velocidad sobre features.
- El MVP debe funcionar aunque falten algunas API keys.
- Si falta OPENAI_API_KEY, usar mock feedback.
- Si falta Stripe, dejar checkout como placeholder.
- Si falta Supabase, dejar instrucciones claras y estructura lista.
- Cuando algo no esté claro, tomar la mejor decisión de producto y documentarla.

## Disclaimer obligatorio

Agregar más adelante en footer y pricing:

Inglevo helps you practice professional English and improve interview readiness. It does not guarantee employment, income, job placement, sponsorship, visas or immigration outcomes.

## Reglas de código

- TypeScript estricto en todo.
- Zod para validación de inputs.
- Server components por defecto.
- Client components solo cuando sea necesario.
- Nunca exponer API keys en cliente.
- OpenAI siempre desde server route.
- Stripe siempre desde server route.
- Supabase RLS obligatorio.
- Comentarios solo donde agregan valor real.
- No generar código que no fue pedido.

## Token efficiency rules

- No repetir contexto ya establecido en este AGENTS.md.
- Un paso a la vez.
- Completar y testear antes de avanzar.
- Si algo falla, documentar el error específico antes de intentar fix.
- Si Git está inicializado, sugerir commit después de cada paso completado. No hacer commit automático sin confirmación.

## Lo que NO construir en v0.1

- dLocal / Yape / Plin / OXXO
- live classes / cohorts
- CV builder con PDF export
- voice real-time
- weekly email reports
- gamificación avanzada
- job board
- feedback humano
- mobile app nativa
- visa/legal advisor
- employment guarantee

Todo lo anterior va en roadmap, no en build actual.

## Estructura de carpetas esperada

```txt
inglevo/
├── app/
│   ├── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── app/
│   │   ├── page.tsx
│   │   ├── onboarding/
│   │   │   └── page.tsx
│   │   ├── interview/
│   │   │   └── page.tsx
│   │   ├── templates/
│   │   │   └── page.tsx
│   │   ├── history/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   └── api/
│       ├── coach-feedback/
│       │   └── route.ts
│       └── stripe/
│           └── create-checkout-session/
│               └── route.ts
├── components/
│   ├── landing/
│   ├── dashboard/
│   ├── interview/
│   ├── templates/
│   ├── shared/
│   └── ui/
├── data/
│   ├── interview-scenarios.ts
│   └── templates.ts
├── lib/
│   ├── supabase/
│   ├── openai.ts
│   ├── stripe.ts
│   ├── validations.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── supabase/
│   ├── migrations/
│   │   └── 001_initial.sql
│   └── seed.sql
├── middleware.ts
├── .env.example
├── AGENTS.md
├── CLAUDE.md
├── ROADMAP.md
└── README.md
```

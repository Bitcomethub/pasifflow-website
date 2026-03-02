# Pasiflow Website — Project Guide

## Overview

Pasiflow is a full-stack real estate investment platform targeting Turkish investors buying US properties (Detroit focus). It provides dashboards for investors, agents, and admins with multi-language support, AI chat assistant, and a mobile API.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1 (App Router) + React 19 |
| Language | TypeScript (strict mode, ES6 target) |
| Styling | Tailwind CSS 4.1 + shadcn/ui (New York style) + Radix UI |
| Database | PostgreSQL (Railway) via Prisma 5.22 ORM |
| Auth | JWT (jsonwebtoken, 7-day expiry) + bcryptjs (12 rounds) |
| i18n | next-intl (Turkish `tr` + English `en`) |
| AI Chat | OpenAI API (GPT — "Pasi" assistant) |
| Email | Nodemailer (SMTP/Gmail) |
| Maps | Mapbox GL + Geocoder |
| Animation | Framer Motion |
| Charts | Recharts |
| Validation | Zod + React Hook Form |

## Project Structure

```
app/
├── [locale]/(marketing)/   # Public pages (landing, about, contact, locations)
├── [locale]/agent/          # Agent portal (dashboard, earnings, referrals)
├── [locale]/dashboard/      # Client/investor dashboard
├── admin/                   # Admin panel (users, properties, financials)
├── api/                     # REST API routes
│   ├── auth/                #   Login (signup disabled)
│   ├── admin/users/         #   Admin user CRUD
│   ├── chat/                #   OpenAI chat endpoint
│   ├── leads/               #   Lead capture + email
│   └── mobile/              #   Mobile app API (auth, dashboard, properties, payments, etc.)
├── globals.css              # Tailwind + CSS variables
├── robots.ts                # SEO
└── sitemap.ts               # Dynamic sitemap
actions/admin/               # Server actions (property, financial, maintenance)
components/
├── ui/                      # 57 shadcn/ui primitives
├── admin/                   # Admin sidebar
├── dashboard/               # Client dashboard components
├── agent-portal/            # Agent portal components
├── ai-assistant.tsx         # Pasi chatbot UI
├── header.tsx / footer.tsx  # Global layout
├── hero-section.tsx         # Landing hero
├── investment-calculator.tsx # ROI calculator
├── detroit-map.tsx          # Mapbox property map
└── ...                      # Feature-specific components
hooks/                       # use-mobile, use-toast
lib/
├── db.ts                    # Prisma client singleton
├── auth.ts                  # JWT verify/extract utilities
├── users.ts                 # User DB queries
├── mail.ts                  # SMTP configuration
├── utils.ts                 # clsx helpers
├── animations.ts            # Framer Motion presets
├── location-data.ts         # Detroit location data
└── detroit-data.ts          # Market statistics
i18n/request.ts              # next-intl locale config
messages/                    # tr.json, en.json translation files
prisma/
├── schema.prisma            # 13 models (see Database section)
├── seed.ts                  # Demo data seeder
└── dev.db                   # Local SQLite (dev fallback)
middleware.ts                # next-intl locale routing
```

## Database Models (Prisma)

Core models and their relationships:

- **User** → has many LLCs, Documents; optional AgentProfile
- **LLC** → belongs to User; has many Properties, Documents
- **Property** → belongs to LLC; has Payments, Leases, MaintenanceRequests, Ledgers, Documents, AgentSales
- **Payment** → belongs to Property (status: PAID | LATE | PENDING)
- **Lease** → belongs to Property (status: ACTIVE | TERMINATED | RENEWING)
- **MaintenanceRequest** → belongs to Property + Vendor; has images, invoices
- **Vendor** → has many MaintenanceRequests
- **Document** → polymorphic (linked to User, LLC, Property, Lease, or MaintenanceRequest)
- **Ledger** → belongs to Property (type: INCOME | EXPENSE)
- **Lead** → standalone (name, email, phone, budget, source)
- **AgentProfile** → belongs to User; has AgentSales, AgentCommissions
- **AgentSale** → belongs to AgentProfile, optional Property link
- **AgentCommission** → belongs to AgentProfile (type: REFERRAL | PASSIVE | BONUS)

## Authentication & Roles

- **No self-registration** — Admin creates all accounts
- **Roles**: `USER` (investor), `AGENT` (sales), `ADMIN` (full access)
- **JWT stored in cookies**, validated in middleware and API routes
- **Protected routes**:
  - `/admin/*` → ADMIN only
  - `/[locale]/agent/*` → AGENT only
  - `/[locale]/dashboard/*` → USER only

### Demo Credentials (from seed)

| Role | Email | Password |
|---|---|---|
| Admin | erman@pasiflow.com | Pasiflow2026! |
| Investor | investor@pasiflow.com | PasiInvestor2025! |
| Agent | agent@pasiflow.com | PasiAgent2025! |

## Environment Variables

Required in `.env`:

```
DATABASE_URL          # PostgreSQL connection string (Railway)
JWT_SECRET            # Min 32 chars for HS256 signing
OPENAI_API_KEY        # For Pasi AI chat
SMTP_HOST             # smtp.gmail.com
SMTP_PORT             # 587
SMTP_USER             # Gmail address
SMTP_PASSWORD         # Gmail app password
ADMIN_EMAIL           # Notification recipient
```

## Commands

```bash
npm run dev            # Start dev server (localhost:3000)
npm run build          # prisma generate + db push + next build
npm start              # Production server
npm run db:seed        # Seed demo data
npx prisma studio      # Visual database browser
```

## Development Rules

### Code Conventions
- Use TypeScript strict mode — no `any` types without justification
- Path alias: `@/*` maps to project root (e.g., `@/lib/db`, `@/components/ui/button`)
- Server components by default; add `"use client"` only when needed (hooks, event handlers, browser APIs)
- Server actions use `"use server"` directive and live in `actions/` directory
- Use Zod for all input validation (API routes and server actions)

### Styling
- Tailwind utility classes only — no inline styles or CSS modules
- shadcn/ui components as base — customize via CSS variables in `globals.css`
- Mobile-first responsive design
- Dark mode supported via next-themes (CSS variable system)

### Database
- Always use `@/lib/db` for Prisma client (singleton pattern prevents connection exhaustion)
- Never import `PrismaClient` directly — use the shared instance
- Run `npx prisma generate` after schema changes
- Use `prisma db push` for schema sync (no versioned migrations currently)

### Internationalization
- All user-facing text must use `useTranslations()` from next-intl
- Translation keys go in `messages/tr.json` and `messages/en.json`
- Marketing routes are under `[locale]/(marketing)/`
- Admin panel is NOT localized (Turkish only)
- Middleware handles locale detection and URL prefixing

### API Routes
- JWT validation required on all protected endpoints
- Use `NextResponse.json()` for responses
- Mobile API lives under `/api/mobile/` with Bearer token auth
- Chat endpoint has rate limiting (20 req/min per IP)
- Lead endpoint validates with Zod and sends email notification

### Security
- Passwords hashed with bcryptjs (12 salt rounds)
- No credentials in client-side code
- CORS headers on mobile API routes
- Input sanitization on all user-facing endpoints
- Self-registration intentionally disabled

## Deployment

- **Platform**: Vercel (serverless)
- **Database**: Railway PostgreSQL
- **Build**: `npm run build` runs Prisma generate + schema push + Next.js build
- **Images**: Remote patterns configured for `images.unsplash.com`

## Key Files to Know

| File | Purpose |
|---|---|
| `lib/db.ts` | Prisma singleton — import this, not PrismaClient |
| `lib/auth.ts` | JWT verification and token extraction |
| `lib/mail.ts` | SMTP email configuration |
| `middleware.ts` | Locale routing (next-intl) |
| `prisma/schema.prisma` | All database models |
| `prisma/seed.ts` | Demo data seeder |
| `components/ai-assistant.tsx` | Pasi chatbot component |
| `app/api/chat/route.ts` | OpenAI integration endpoint |
| `app/api/leads/route.ts` | Lead capture with email notification |
| `actions/admin/property-actions.ts` | Property CRUD server actions |

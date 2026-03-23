# ThumbnailAI – AI‑Powered YouTube Thumbnail Generator SaaS

A production‑ready SaaS application that generates high‑converting YouTube thumbnails using AI, with a credit‑based monetization system, Stripe subscriptions, and modern tech stack.

## 🚀 Features

- **AI‑Powered Generation**: Generate thumbnails from text prompts using AI (OpenAI DALL·E / Stability AI).
- **Credit System**: Free users get 5 credits; 1 credit per generation.
- **Monetization**: Subscription plans (Basic, Pro, Pay‑as‑you‑go) via Stripe.
- **Authentication**: NextAuth with Google OAuth + Email login.
- **Dashboard**: Intuitive UI for generating, downloading, and managing thumbnails.
- **History**: View all past generations with re‑download options.
- **Billing**: Upgrade/downgrade plans, buy credits, manage subscription.
- **Security**: Rate limiting, input validation, secure API routes.
- **Deployment**: Optimized for Vercel + PostgreSQL (Neon/Supabase).

## 🧱 Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS** + **ShadCN UI**
- **Prisma ORM**
- **PostgreSQL** (Neon / Supabase)
- **NextAuth** (Google + Email)
- **Stripe** (subscriptions, payments, webhooks)
- **Zustand** (state management)
- **Cloud Storage** (Cloudinary / AWS S3)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)
- Stripe account (for payments)
- Google OAuth credentials (for authentication)
- OpenAI API key (or other AI provider)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/thumbnailai.git
cd thumbnailai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your own keys:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/thumbnailai"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# AI (OpenAI)
OPENAI_API_KEY="sk-..."

# Cloud Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database setup

Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂 Database Schema

Key models:

- **User**: id, email, name, credits, subscription fields
- **Thumbnail**: id, userId, prompt, imageUrl, creditsUsed
- **Subscription**: id, userId, stripeCustomerId, plan, status
- **Account** / **Session** (NextAuth)

See `prisma/schema.prisma` for full schema.

## 🔐 Authentication

- Google OAuth: Set up a project in [Google Cloud Console](https://console.cloud.google.com/).
- Email (optional): Configure an SMTP server for magic links.

## 💳 Stripe Integration

### Setup

1. Create a Stripe account and obtain API keys.
2. Create products and prices in Stripe Dashboard for:
   - Basic plan (price_basic_monthly)
   - Pro plan (price_pro_monthly)
   - Pay‑as‑you‑go credit pack
3. Set up webhook endpoint (`/api/stripe/webhook`) in Stripe Dashboard.
4. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

### Webhook Events Handled

- `checkout.session.completed`: Activate subscription, add credits.
- `customer.subscription.updated`: Update subscription status.
- `customer.subscription.deleted`: Mark subscription as canceled.
- `invoice.payment_succeeded`: Refill credits on renewal.

## 🤖 AI Generation

The API route `/api/generate-thumbnail`:

1. Validates user authentication and credits.
2. Deducts 1 credit atomically.
3. Calls AI service (currently mock; integrate OpenAI/DALL·E).
4. Stores thumbnail record with metadata.
5. Returns image URL.

To integrate a real AI provider, replace the `generateThumbnail` function in `app/api/generate-thumbnail/route.ts`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub.
2. Import project in Vercel.
3. Add environment variables in Vercel dashboard.
4. Deploy.

### Database (Neon / Supabase)

- Use [Neon](https://neon.tech) or [Supabase](https://supabase.com) for managed PostgreSQL.
- Set `DATABASE_URL` to your cloud database connection string.

### Stripe Webhook in Production

- Set `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your production domain.
- In Stripe Dashboard, set webhook endpoint to `https://yourdomain.com/api/stripe/webhook`.

## 📁 Project Structure

```
thumbnailai/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth routes
│   │   ├── generate-thumbnail/     # AI generation
│   │   └── stripe/                 # Stripe checkout & webhook
│   ├── dashboard/                  # Dashboard page
│   ├── billing/                    # Billing page
│   ├── history/                    # History page
│   └── page.tsx                    # Landing page
├── components/ui/                  # ShadCN UI components
├── lib/
│   ├── auth.ts                     # NextAuth config
│   ├── prisma.ts                   # Prisma client
│   └── stripe.ts                   # Stripe utilities
├── prisma/
│   └── schema.prisma              # Database schema
├── public/
└── middleware.ts                   # Rate limiting & security
```

## 🔧 Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm start` – Start production server
- `npm run lint` – Run ESLint
- `npx prisma studio` – Open Prisma Studio for database management

## 📈 Growth Features (Planned)

- Referral system (give free credits)
- Share generated thumbnails on social media
- A/B testing for thumbnail variants
- Analytics dashboard (CTR prediction)
- Team/workspace collaboration

## 🛡 Security Considerations

- Input validation with Zod
- Rate limiting per IP (middleware)
- Secure API routes (authentication required)
- CSP headers
- Stripe webhook signature verification
- Environment variables for secrets

## 📄 License

MIT

## 👥 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org)
- [ShadCN UI](https://ui.shadcn.com)
- [Stripe](https://stripe.com)
- [Prisma](https://prisma.io)
- [OpenAI](https://openai.com)

---

**ThumbnailAI** – Boost your YouTube CTR with AI‑generated thumbnails.

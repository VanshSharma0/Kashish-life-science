This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Razorpay setup

Create a `.env.local` file from `.env.example` and set:

```bash
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
```

Notes:
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are used by server routes (`/api/razorpay`, `/api/verify`).
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` is used by the browser checkout script.
- Use test keys in development and switch to live keys only in production.

## Admin dashboard setup

The `/admin` area now uses email/password auth with DB-backed admin users.

Set these in `.env.local`:

```bash
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-strong-password
ADMIN_NAME=Primary Admin
```

This account acts as a recovery super user:
- Logging in with `ADMIN_EMAIL` + `ADMIN_PASSWORD` auto-creates or repairs the account as `super_admin`.
- If those env vars are not set, fallback credentials are:
  - `admin@kashishlife.com`
  - `admin12345`

## Auth email configuration (Firebase)

Email login verification link and forgot-password emails are handled by Firebase Auth.

Set:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

And in Firebase console, add your app domain to **Authentication -> Settings -> Authorized domains**.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

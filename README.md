# Easner Checkout Playground

A demo merchant site for testing [Easner Checkout](https://easner.com/business). No login required — open and test one-time, subscription, and custom payment flows.

This project mirrors how a real business integrates Easner on their own website:

1. **Server** creates checkout sessions with the secret key
2. **Browser** loads `js.easner.com/v1/checkout.js` and opens the overlay with only the publishable key + `client_secret`
3. **Webhook** fulfils orders on `checkout.completed` (and subscription lifecycle events)

## Setup

```bash
cp .env.example .env.local
```

Add your keys from the Easner Business dashboard:

```env
EASNER_SECRET_KEY=easner_sk_test_...
NEXT_PUBLIC_EASNER_PUBLISHABLE_KEY=easner_pk_test_...
EASNER_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://playground.easner.com
```

For local development, use `http://localhost:3000` instead.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) locally, or [https://playground.easner.com](https://playground.easner.com) in production.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home |
| `/shop` | One-time payments (e-commerce) |
| `/pricing` | Subscription payments (SaaS) |
| `/book` | Custom payments (bookings, downloads) |
| `/thanks` | Success redirect (`?session_id={CHECKOUT_SESSION_ID}`) |
| `/cancel` | Cancel redirect |

## Dashboard configuration

Configure these in your Easner Business dashboard:

- **Success URL:** `https://playground.easner.com/thanks?session_id={CHECKOUT_SESSION_ID}`
- **Cancel URL:** `https://playground.easner.com/cancel`
- **Webhook URL:** `https://playground.easner.com/api/webhooks/easner`

## Integration flow

```
Browser                Your server              Easner API
   |                        |                        |
   |-- Buy / Subscribe ---->|                        |
   |                        |-- POST /checkout/sessions -->
   |                        |<-- client_secret --------|
   |<-- client_secret ------|                        |
   |-- EasnerCheckout.openOverlay ------------------>|
   |                        |<-- checkout.completed --|
   |                        |   (webhook + metadata)  |
```

**Golden rule:** amount and secret key never go in the browser.

## Webhook testing

The playground includes `POST /api/webhooks/easner` which verifies the `easner-signature` HMAC-SHA256 header and logs events to the server console. Point your Easner webhook to this endpoint when testing locally (use a tunnel like ngrok if needed).

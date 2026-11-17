# Easner Playground

Checkout demos and an Easner Connect walkthrough on a sample course platform. Connect uses the live Easner API and `https://js.easner.com/v1/connect.js`. Test keys only. No live money.

## Prerequisites

1. An Easner business in **Connect mode**.
2. A **test** secret key (`easner_sk_test_…`) with `payees.read`, `payees.write`, `payees.credit`, and `payouts.write`.
3. Allowed websites for the Connect sheet. Follow [Connect security](https://docs.easner.com/connect-security). The playground origin is `https://playground.easner.com`.
4. Copy `.env.example` to `.env`. Set `EASNER_SECRET_KEY` and a long `PLAYGROUND_STATE_SECRET`. Do not commit `.env`.

Docs: [Connect](https://docs.easner.com/connect), [Quickstart](https://docs.easner.com/connect-quickstart), [Creator recipe](https://docs.easner.com/connect-recipes), [Payees](https://docs.easner.com/payees), [Earnings](https://docs.easner.com/connect-earnings), [Payouts](https://docs.easner.com/connect-payouts), [Components](https://docs.easner.com/connect-components).

## Run

```bash
npm install
npm run dev
```

Open `/`. Checkout is at `/checkout`. Connect is at `/connect`, the creator earnings screen a platform would show its customer. `/shop`, `/pricing`, and `/book` are the same checkout surfaces.

The server creates the test payee and records one lesson credit. The page does not include a platform-owner console. Device demos (QR, Easner app, connect sheet) run on **https://playground.easner.com**, where the allowed website matches.

## Customer demo

On **https://playground.easner.com/connect**:

1. The page shows Ada’s lesson earnings.
2. Set **Email** to the address on the Easner account that will approve the link.
3. **Get paid with Easner.** The real sheet opens.
4. On a phone, open the Easner app and enter the code or scan the QR. On a laptop, Approve as a test payee is the same sheet.
5. The page finishes the link. The account shows as connected.
6. **Withdraw.** The payout appears in the list on this page. Test payouts settle on their own within a minute. See [Connect](https://docs.easner.com/connect).

`npm run smoke:connect` still uses `POST /v1/test/payees/:id/approve_link` because it cannot scan a QR code. That call is not part of the page.

## Environment

| Name | Purpose |
| --- | --- |
| `EASNER_SECRET_KEY` | Test secret. Server only. |
| `EASNER_API_BASE` | Defaults to `https://api.easner.com`. |
| `PLAYGROUND_STATE_SECRET` | Signs payee and PKCE cookies. |
| `NEXT_PUBLIC_APP_URL` | Public origin for Checkout return URLs and the Connect `redirect_uri`. |
| `EASNER_WEBHOOK_SECRET` | Checkout webhooks. |
| `EASNER_PUBLISHABLE_KEY` | Checkout.js. |

## Smoke test

```bash
npm run smoke:connect
```

Funds the test balance, creates a payee, checks the same reference returns the same id, credits earnings, approves the link with the test API, creates a payout, settles, and polls status. It does not print the key.

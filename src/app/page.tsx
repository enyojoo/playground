import Link from "next/link";

const scenarios = [
  {
    href: "/shop",
    title: "One-time payments",
    description:
      "E-commerce style checkout. Charge once and fulfil orders on checkout.completed using order_id metadata.",
    badge: "mode: payment",
  },
  {
    href: "/pricing",
    title: "Subscriptions",
    description:
      "SaaS pricing page. Create recurring sessions and unlock access on checkout.completed. Handle renewals via webhooks.",
    badge: "mode: subscription",
  },
  {
    href: "/book",
    title: "Custom payments",
    description:
      "Pay-for-access flows like bookings and downloads. Key fulfilment by your own metadata ids.",
    badge: "mode: payment + metadata",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
          Easner Checkout Playground
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900">
          Test checkout like a real merchant site
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-600">
          This site mirrors how a business integrates Easner Checkout on their
          own website. Sessions are created on the server; only the{" "}
          <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
            client_secret
          </code>{" "}
          and publishable key reach the browser.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {scenarios.map((scenario) => (
          <Link
            key={scenario.href}
            href={scenario.href}
            className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="inline-flex rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600">
              {scenario.badge}
            </span>
            <h2 className="mt-4 text-lg font-semibold text-stone-900 group-hover:underline">
              {scenario.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {scenario.description}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-stone-200 bg-white p-8">
        <h2 className="text-lg font-semibold text-stone-900">
          Dashboard URLs to configure
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Add these redirect URLs in your Easner Business dashboard for this
          playground:
        </p>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="font-medium text-stone-700">Success URL</dt>
            <dd className="mt-1 font-mono text-stone-600">
              /thanks?session_id={"{"}CHECKOUT_SESSION_ID{"}"}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-stone-700">Cancel URL</dt>
            <dd className="mt-1 font-mono text-stone-600">/cancel</dd>
          </div>
          <div>
            <dt className="font-medium text-stone-700">Webhook endpoint</dt>
            <dd className="mt-1 font-mono text-stone-600">/api/webhooks/easner</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

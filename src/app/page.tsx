import Link from "next/link";

const sections = [
  {
    href: "/shop",
    title: "Shop",
    description: "Physical goods and one-off purchases. Pay once at checkout.",
  },
  {
    href: "/pricing",
    title: "Pricing",
    description: "Monthly plans for teams and individuals. Subscribe and get started.",
  },
  {
    href: "/book",
    title: "Book & Download",
    description: "Reserve a session, grab a workshop seat, or download instantly.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">
          Welcome to Playground
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-600">
          A sample store for goods, subscriptions, bookings, and digital
          downloads. Browse below and check out when you are ready.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-stone-900 group-hover:underline">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

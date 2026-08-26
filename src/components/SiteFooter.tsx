import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Playground simulates a merchant site integrating{" "}
          <span className="font-medium text-stone-700">Easner Checkout</span>.
        </p>
        <div className="flex gap-4">
          <Link href="/thanks" className="hover:text-stone-800">
            /thanks
          </Link>
          <Link href="/cancel" className="hover:text-stone-800">
            /cancel
          </Link>
        </div>
      </div>
    </footer>
  );
}

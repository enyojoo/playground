import type { CheckoutItemType } from "@/lib/checkout-items";

type CheckoutFormProps = {
  itemType: CheckoutItemType;
  itemId: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
  fullWidth?: boolean | "mobile";
};

function widthClass(fullWidth?: boolean | "mobile"): string {
  if (fullWidth === true) return "w-full";
  if (fullWidth === "mobile") return "w-full sm:w-auto";
  return "w-auto";
}

export function CheckoutForm({
  itemType,
  itemId,
  label,
  variant = "primary",
  className = "",
  fullWidth = false,
}: CheckoutFormProps) {
  const baseStyles =
    "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

  const variantStyles =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-hover"
      : "border border-border bg-surface text-foreground hover:bg-background";

  return (
    <form action="/api/checkout" method="POST" className={className}>
      <input type="hidden" name="itemType" value={itemType} />
      <input type="hidden" name="itemId" value={itemId} />
      <button
        type="submit"
        className={`${baseStyles} ${variantStyles} ${widthClass(fullWidth)}`}
      >
        {label}
      </button>
    </form>
  );
}

import Link from "next/link";

type BackLinkProps = {
  href?: string;
  label?: string;
};

export function BackLink({ href = "/", label = "Back" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center text-sm font-medium text-muted transition-colors hover:text-foreground"
    >
      ← {label}
    </Link>
  );
}

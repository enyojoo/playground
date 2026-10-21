type SurfaceBadgeProps = {
  label: string;
};

export function SurfaceBadge({ label }: SurfaceBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
      {label}
    </span>
  );
}

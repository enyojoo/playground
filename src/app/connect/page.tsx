import { ConnectCreator } from "@/components/ConnectCreator";
import { BackLink } from "@/components/BackLink";
import { PageShell } from "@/components/PageShell";
import { CONNECT } from "@/lib/brand";

export default function ConnectPage() {
  return (
    <PageShell>
      <BackLink />
      <div className="mt-2 max-w-3xl">
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {CONNECT.headline}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {CONNECT.pageLead}
        </p>
      </div>
      <ConnectCreator />
    </PageShell>
  );
}
"use client";

import { useCallback, useEffect, useState } from "react";

import { useEasnerConnectReady } from "@/hooks/use-easner-connect-ready";
import {
  formatUsd,
  getConnect,
  payoutBadge,
  postConnect,
} from "@/lib/connect-client";
import { CONNECT } from "@/lib/brand";
import type { Payee, PayeeBalance, Payout } from "@/lib/connect-types";

type Snapshot = {
  payee: Payee;
  balance: PayeeBalance;
  payouts: Payout[];
  link: { code: string; url: string } | null;
};

type Notice = { code: string; message: string } | null;

const buttonClass =
  "inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50";

export function ConnectCreator() {
  const scriptState = useEasnerConnectReady();
  const scriptReady = scriptState === "ready";
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const refresh = useCallback(async () => {
    try {
      const next = await getConnect<Snapshot>("/api/connect/creator/status");
      setSnapshot(next);
      if (next.link?.code) {
        setCode(next.link.code);
      }
    } catch (error) {
      const errorCode = error instanceof Error && "code" in error ? String(error.code) : "";
      setNotice({
        code: errorCode || "playground_error",
        message: error instanceof Error ? error.message : "Could not load earnings",
      });
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refresh();
    }, 0);
    const interval = window.setInterval(() => {
      void refresh();
    }, 4000);
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, [refresh]);

  function fail(error: unknown) {
    const errorCode = error instanceof Error && "code" in error ? String(error.code) : "playground_error";
    setNotice({
      code: errorCode,
      message: error instanceof Error ? error.message : "Request failed",
    });
  }

  async function getPaid() {
    setBusy("connect");
    setNotice(null);
    try {
      if (!window.EasnerConnect) {
        throw new Error("Easner Connect has not loaded yet.");
      }

      if (email.trim()) {
        await postConnect("/api/connect/creator/email", { email: email.trim() });
      }

      const session = await postConnect<{
        client_secret: string;
        code: string;
      }>("/api/connect/creator/link-session");
      setCode(session.code);

      window.EasnerConnect.connect({
        clientSecret: session.client_secret,
        onLinked: (result) => {
          void (async () => {
            try {
              await postConnect("/api/connect/creator/redeem", {
                code: result?.code,
                state: result?.state,
              });
              await refresh();
            } catch (error) {
              fail(error);
            }
          })();
        },
        onError: (error) => {
          setNotice({
            code: error?.code || "connect_error",
            message: error?.message || "Easner could not finish linking. Try again.",
          });
        },
      });
    } catch (error) {
      fail(error);
    } finally {
      setBusy(null);
    }
  }

  async function withdraw() {
    setBusy("withdraw");
    setNotice(null);
    try {
      if (!window.EasnerConnect) {
        throw new Error("Easner Connect has not loaded yet.");
      }

      const session = await postConnect<{ client_secret: string }>(
        "/api/connect/creator/withdraw-session",
      );

      window.EasnerConnect.withdraw({
        clientSecret: session.client_secret,
        onPaid: () => {
          void refresh();
        },
        onError: (error) => {
          setNotice({
            code: error?.code || "connect_error",
            message: error?.message || "Easner could not start the withdrawal. Try again.",
          });
        },
        onClose: () => {
          void refresh();
        },
      });
    } catch (error) {
      fail(error);
    } finally {
      setBusy(null);
    }
  }

  const linked = snapshot?.payee.status === "linked";
  const canWithdraw = linked && (snapshot?.balance.withdrawable ?? 0) > 0;

  return (
    <div className="mt-8 space-y-6">
      {notice ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-950">
          <p className="font-semibold">{CONNECT.errorTitle}</p>
          <p className="mt-1">{notice.message}</p>
        </div>
      ) : null}

      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-heading text-lg font-semibold">
          {linked ? "Connected" : CONNECT.linkTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{CONNECT.linkBody}</p>
        <label className="mt-4 block text-sm">
          <span className="font-medium">Email</span>
          <input
            type="email"
            className="mt-1 w-full max-w-md rounded-lg border border-border bg-background px-3 py-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            disabled={linked}
            required
          />
        </label>
        <button
          type="button"
          className={`${buttonClass} mt-5`}
          disabled={!scriptReady || busy !== null || !email.trim() || linked}
          onClick={() => void getPaid()}
        >
          {busy === "connect" ? "Opening…" : "Get paid with Easner"}
        </button>
        {scriptState === "loading" ? (
          <p className="mt-2 text-xs text-muted">{CONNECT.scriptLoading}</p>
        ) : null}
        {scriptState === "error" ? (
          <p className="mt-2 text-xs text-red-900">{CONNECT.scriptError}</p>
        ) : null}
        {code ? (
          <p className="mt-4 text-sm text-muted">
            {CONNECT.appCodeLabel}{" "}
            <span className="font-mono text-lg tracking-[0.25em] text-foreground">{code}</span>
          </p>
        ) : null}
        {snapshot ? (
          <p className="mt-3 text-sm text-muted">
            {linked ? CONNECT.connected : CONNECT.notConnected}
          </p>
        ) : null}
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-heading text-lg font-semibold">{CONNECT.balanceLabel}</h2>
        <p className="mt-2 text-3xl font-semibold">{formatUsd(snapshot?.balance.withdrawable)}</p>
        <p className="mt-1 text-sm text-muted">{CONNECT.balanceHint}</p>
        <button
          type="button"
          className={`${buttonClass} mt-5`}
          disabled={!scriptReady || busy !== null || !canWithdraw}
          onClick={() => void withdraw()}
        >
          {busy === "withdraw" ? "Opening…" : "Withdraw"}
        </button>
        <ul className="mt-6 divide-y divide-border">
          {(snapshot?.payouts ?? []).map((payout) => (
            <li key={payout.id} className="flex items-center justify-between py-3 text-sm">
              <span>
                {formatUsd(payout.amount)}
                <span className="ml-2 text-muted">{payout.status}</span>
              </span>
              <span className="text-xs font-semibold">{payoutBadge(payout.status)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

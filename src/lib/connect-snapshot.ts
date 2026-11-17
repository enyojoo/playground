import "server-only";

import {
  getPayee,
  getPayeeBalance,
  listPayouts,
  type Payee,
  type PayeeBalance,
  type Payout,
} from "@/lib/easner-connect";
import { publicLink, readStoredLink } from "@/lib/connect-cookies";

export async function connectSnapshot(payeeId: string): Promise<{
  payee: Payee;
  balance: PayeeBalance;
  payouts: Payout[];
  link: ReturnType<typeof publicLink>;
}> {
  const [payee, balance, payouts, link] = await Promise.all([
    getPayee(payeeId),
    getPayeeBalance(payeeId),
    listPayouts(payeeId),
    readStoredLink(),
  ]);

  return {
    payee,
    balance,
    payouts: payouts.data,
    link: publicLink(link),
  };
}

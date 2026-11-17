export type Payee = {
  id: string;
  object: "payee";
  reference: string;
  name: string | null;
  email: string | null;
  country: string | null;
  status: "pending_link" | "linked" | "unlinked" | "restricted";
  type: "individual" | "business" | null;
  income_type: "royalties" | "services" | "other_income" | null;
  livemode: boolean;
  created?: string;
};

export type PayeeBalance = {
  object: "payee_balance";
  payee: string;
  currency: "USD";
  available: number;
  on_hold?: number;
  pending?: number;
  in_flight?: number;
  offset?: number;
  withdrawable: number;
  minimum_payout?: number;
  reason?: string | null;
  next_action: "link" | "payout" | "wait_for_hold" | "contact_support" | "none";
  livemode: boolean;
};

export type Payout = {
  id: string;
  object: "payout";
  payee: string;
  amount: number;
  currency: "USD";
  status:
    | "pending"
    | "held"
    | "in_flight"
    | "completed"
    | "failed"
    | "cancelled"
    | "declined";
  pending_reason?: "funds" | "limit" | "tax_form" | null;
  source?: "payee_balance" | "platform_balance";
  livemode: boolean;
};

export type PayoutList = {
  object: "list";
  data: Payout[];
  has_more: boolean;
  url: string;
};

export type LinkSession = {
  id: string;
  object: "link_session";
  url: string;
  code: string;
  client_secret: string;
  expires_at?: string;
};

export type PayoutSession = {
  id: string;
  object: "payout_session";
  client_secret: string;
  payee: string;
  source: "payee_balance" | "platform_balance";
  amount?: number | null;
  currency: "USD";
  expires_at?: string;
};

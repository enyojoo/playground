/** Fixed demo creator used by the Connect walkthrough. */
export const DEMO_CREATOR = {
  reference: "creator_ada",
  name: "Ada",
  email: "ada@example.com",
  incomeType: "royalties" as const,
  /** $250.00 lesson credit, in cents. */
  lessonAmountCents: 25_000,
  /** Ends in 13 cents so test settlement follows the failure path. */
  failureAmountCents: 10_013,
  /** $100,000.00 virtual test balance. */
  fundAmountCents: 10_000_000,
} as const

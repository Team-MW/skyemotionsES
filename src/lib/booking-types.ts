export type PaidSessionView = {
  id: string;
  email: string | null;
  name: string | null;
  amountTotal: number | null;
  currency: string | null;
  productSummary: string;
  bookingComplete: boolean;
};

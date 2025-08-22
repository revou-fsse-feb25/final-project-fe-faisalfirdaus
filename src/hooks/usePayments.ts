"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { api, apiPost } from "@/lib/api";
import type { PaymentListItemDto } from "@/lib/types";

const qk = {
  list: (bookingReference: string) => ["payments", bookingReference] as const,
};

export function usePaymentAttempts(bookingReference: string) {
  return useQuery({
    queryKey: qk.list(bookingReference),
    queryFn: () =>
      api<PaymentListItemDto[]>(
        `/bookings/${bookingReference}/payments`,
        {},
        { auth: true }
      ),
    enabled: !!bookingReference,
  });
}

export function useCreatePaymentAttempt() {
  return useMutation({
    mutationFn: (args: {
      bookingReference: string;
      payload?: Record<string, unknown>;
    }) =>
      apiPost<{ redirectUrl: string; paymentId: number }>(
        `/bookings/${args.bookingReference}/payments`,
        args.payload ?? {},
        true
      ),
  });
}

export function useRetryPaymentAttempt() {
  return useMutation({
    mutationFn: (bookingReference: string) =>
      apiPost<{ redirectUrl: string; paymentId: number }>(
        `/bookings/${bookingReference}/payments/retry`,
        {},
        true
      ),
  });
}

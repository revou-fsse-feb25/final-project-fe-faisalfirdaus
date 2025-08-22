"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, apiPost } from "@/lib/api";
import type { BookingDetailDto } from "@/lib/types";

const qk = {
  my: (params?: any) => ["my-bookings", params] as const,
  byRef: (ref: string) => ["booking", ref] as const,
  adminList: (params?: any) => ["admin-bookings", params] as const,
};

export function useMyBookings(params?: {
  cursor?: string;
  limit?: number;
  status?: string;
}) {
  const path = "/me/bookings" + (params ? "" : "");
  // If you add query params for /me/bookings, use withQuery
  return useQuery({
    queryKey: qk.my(params),
    queryFn: () => api<BookingDetailDto[]>(path, {}, { auth: true }),
  });
}

export function useBookingByReference(
  bookingReference: string,
  opts?: { refetchInterval?: number }
) {
  return useQuery({
    queryKey: qk.byRef(bookingReference),
    queryFn: () =>
      api<BookingDetailDto>(
        `/bookings/${bookingReference}`,
        {},
        { auth: true }
      ),
    enabled: !!bookingReference,
    refetchInterval: opts?.refetchInterval, // e.g. poll in checkout until confirmed
  });
}

export function useCreateBookingHold() {
  return useMutation({
    mutationFn: (body: { showtimeId: number; seats: number[] }) =>
      apiPost<BookingDetailDto>("/bookings", body, true),
  });
}

export function useCancelMyBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { bookingReference: string; reason?: string }) =>
      apiPost<{ cancelled: boolean }>(
        `/bookings/${args.bookingReference}/cancel`,
        { reason: args.reason },
        true
      ),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["booking", vars.bookingReference] });
      qc.invalidateQueries({ queryKey: ["my-bookings"] });
    },
  });
}

/* ------------------------------ Admin booking ----------------------------- */

export function useAdminBookings(params?: {
  cursor?: string;
  limit?: number;
  status?: string;
}) {
  // Implement your backend /bookings (admin list) path if exposed
  const path = "/bookings";
  return useQuery({
    queryKey: qk.adminList(params),
    queryFn: () =>
      api<{ items: BookingDetailDto[]; nextCursor?: string | null }>(
        path,
        {},
        { auth: true }
      ),
  });
}

export function useAdminCancelBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { bookingReference: string; reason?: string }) =>
      apiPost<{ cancelled: boolean }>(
        `/admin/bookings/${args.bookingReference}/cancel`,
        { reason: args.reason },
        true
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-bookings"] }),
  });
}

export function useAdminClaimBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bookingReference: string) =>
      apiPost<{ claimed: boolean }>(
        `/bookings/${bookingReference}/claim`,
        undefined,
        true
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-bookings"] }),
  });
}

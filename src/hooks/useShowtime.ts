"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, apiDelete, apiPatch, apiPost } from "@/lib/api";
import type {
  ShowtimeDetailDto,
  ShowtimeSeatAvailabilityDto,
} from "@/lib/types";

const qk = {
  detail: (id: number) => ["showtime", id] as const,
  seats: (id: number) => ["showtime-seats", id] as const,
  adminList: (params?: any) => ["admin-showtimes", params] as const,
};

export function useShowtimeDetail(showtimeId: number) {
  return useQuery({
    queryKey: qk.detail(showtimeId),
    queryFn: () => api<ShowtimeDetailDto>(`/showtimes/${showtimeId}`),
    enabled: !!showtimeId,
  });
}

export function useShowtimeSeats(
  showtimeId: number,
  opts?: { refetchInterval?: number }
) {
  return useQuery({
    queryKey: qk.seats(showtimeId),
    queryFn: () =>
      api<ShowtimeSeatAvailabilityDto[]>(`/showtimes/${showtimeId}/seats`),
    refetchInterval: opts?.refetchInterval ?? 5000,
    enabled: !!showtimeId,
  });
}

/* --------------------------- Admin CRUD showtimes -------------------------- */

export function useCreateShowtime() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      movie_id: number;
      studio_id: number;
      show_datetime: string; // ISO
      price: number;
      is_active?: boolean;
    }) => apiPost<ShowtimeDetailDto>("/showtimes", body, true),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-showtimes"] }),
  });
}

export function useUpdateShowtime(showtimeId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (
      body: Partial<{
        movie_id: number;
        studio_id: number;
        show_datetime: string;
        price: number;
        is_active: boolean;
      }>
    ) => apiPatch<ShowtimeDetailDto>(`/showtimes/${showtimeId}`, body, true),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["showtime", showtimeId] });
      qc.invalidateQueries({ queryKey: ["admin-showtimes"] });
    },
  });
}

export function useDeleteShowtime() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (showtimeId: number) =>
      apiDelete<{ deleted: boolean }>(`/showtimes/${showtimeId}`, true),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-showtimes"] }),
  });
}

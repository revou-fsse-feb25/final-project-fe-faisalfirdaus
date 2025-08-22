"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { api, apiDelete, apiPatch, apiPost } from "@/lib/api";
import type { SeatLayoutItemDto, StudioDetailDto } from "@/lib/types";

const qk = {
  detail: (id: number) => ["studio", id] as const,
  layout: (id: number) => ["studio-seats", id] as const,
};

export function useStudioDetail(studioId: number) {
  return useQuery({
    queryKey: qk.detail(studioId),
    queryFn: () => api<StudioDetailDto>(`/studios/${studioId}`),
    enabled: !!studioId,
  });
}

export function useSeatLayout(studioId: number) {
  return useQuery({
    queryKey: qk.layout(studioId),
    queryFn: () => api<SeatLayoutItemDto[]>(`/studios/${studioId}/seats`),
    enabled: !!studioId,
  });
}

/* -------------------------------- Admin CRUD ------------------------------- */

export function useCreateStudio() {
  return useMutation({
    mutationFn: (args: {
      theaterId: number;
      body: { studio_name: string; total_seats: number; studio_type: string };
    }) =>
      apiPost<StudioDetailDto>(
        `/theaters/${args.theaterId}/studios`,
        args.body,
        true
      ),
  });
}

export function useUpdateStudio(studioId: number) {
  return useMutation({
    mutationFn: (
      body: Partial<{
        studio_name: string;
        total_seats: number;
        studio_type: string;
      }>
    ) => apiPatch<StudioDetailDto>(`/studios/${studioId}`, body, true),
  });
}

export function useDeleteStudio() {
  return useMutation({
    mutationFn: (studioId: number) =>
      apiDelete<{ deleted: boolean }>(`/studios/${studioId}`, true),
  });
}

export function useBlockSeats(studioId: number) {
  return useMutation({
    mutationFn: (body: {
      seats: { row: string; numbers: number[] }[];
      block: boolean;
    }) =>
      apiPost<{ updated: number }>(
        `/studios/${studioId}/seats/block`,
        body,
        true
      ),
  });
}

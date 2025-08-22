"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, apiDelete, apiPatch, apiPost, withQuery } from "@/lib/api";
import type { TheaterDetailDto, TheaterListItemDto } from "@/lib/types";

const qk = {
  list: (params?: any) => ["theaters", params] as const,
  detail: (id: number) => ["theater", id] as const,
};

export function useTheatersList(params?: { city?: string }) {
  const path = withQuery("/theaters", params);
  return useQuery({
    queryKey: qk.list(params),
    queryFn: () => api<TheaterListItemDto[]>(path),
  });
}

export function useTheaterDetail(theaterId: number) {
  return useQuery({
    queryKey: qk.detail(theaterId),
    queryFn: () => api<TheaterDetailDto>(`/theaters/${theaterId}`),
    enabled: !!theaterId,
  });
}

/* -------------------------------- Admin CRUD ------------------------------- */

export function useCreateTheater() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      name: string;
      address: string;
      city: string;
      phone: string;
    }) => apiPost<TheaterDetailDto>("/theaters", body, true),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["theaters"] }),
  });
}

export function useUpdateTheater(theaterId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (
      body: Partial<{
        name: string;
        address: string;
        city: string;
        phone: string;
      }>
    ) => apiPatch<TheaterDetailDto>(`/theaters/${theaterId}`, body, true),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["theater", theaterId] });
      qc.invalidateQueries({ queryKey: ["theaters"] });
    },
  });
}

export function useDeleteTheater() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (theaterId: number) =>
      apiDelete<{ deleted: boolean }>(`/theaters/${theaterId}`, true),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["theaters"] }),
  });
}

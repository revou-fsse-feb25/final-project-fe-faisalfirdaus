"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, apiDelete, apiPatch, apiPost } from "@/lib/api";
import type { GenreResponseDto } from "@/lib/types";

const qk = {
  list: ["genres"] as const,
};

export function useGenres() {
  return useQuery({
    queryKey: qk.list,
    queryFn: () => api<GenreResponseDto[]>("/genres"),
  });
}

/* -------------------------------- Admin CRUD ------------------------------- */

export function useCreateGenre() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { name: string }) =>
      apiPost<GenreResponseDto>("/genres", body, true),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
}

export function useUpdateGenre(genreId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { name: string }) =>
      apiPatch<GenreResponseDto>(`/genres/${genreId}`, body, true),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
}

export function useDeleteGenre() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (genreId: number) =>
      apiDelete<{ deleted: boolean }>(`/genres/${genreId}`, true),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
}

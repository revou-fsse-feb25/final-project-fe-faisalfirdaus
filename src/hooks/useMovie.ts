// "use client";

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { api, apiDelete, apiPatch, apiPost, withQuery } from "@/lib/api";
// import type {
//   MoviesListResponseDto,
//   MovieDetailResponseDto,
//   MovieShowtimeDatesResponseDto,
//   MovieShowtimesResponseDto,
// } from "@/lib/types";

// const qk = {
//   list: (params?: Record<string, any>) => ["movies", params] as const,
//   detail: (id: number | string) => ["movie", Number(id)] as const,
//   dates: (id: number | string) => ["movie-dates", Number(id)] as const,
//   showtimes: (id: number | string, date?: string) =>
//     ["movie-showtimes", Number(id), date] as const,
// };

// export function useMoviesList(params?: {
//   status?: string;
//   cursor?: string;
//   limit?: number;
// }) {
//   const path = withQuery("/movies", params);
//   return useQuery({
//     queryKey: qk.list(params),
//     queryFn: () => api<MoviesListResponseDto>(path),
//   });
// }

// export function useMovieDetail(movieId: number | string) {
//   return useQuery({
//     queryKey: qk.detail(movieId),
//     queryFn: () => api<MovieDetailResponseDto>(`/movies/${movieId}`),
//     enabled: !!movieId,
//   });
// }

// export function useMovieShowtimeDates(
//   movieId: number | string,
//   params?: { from?: string; to?: string }
// ) {
//   const path = withQuery(`/movies/${movieId}/showtimes/dates`, params);
//   return useQuery({
//     queryKey: qk.dates(movieId),
//     queryFn: () => api<MovieShowtimeDatesResponseDto[]>(path),
//     enabled: !!movieId,
//   });
// }

// export function useMovieShowtimesForDate(
//   movieId: number | string,
//   date?: string
// ) {
//   const path = withQuery(`/movies/${movieId}/showtimes`, { date });
//   return useQuery({
//     queryKey: qk.showtimes(movieId, date),
//     queryFn: () => api<MovieShowtimesResponseDto[]>(path),
//     enabled: !!movieId && !!date,
//   });
// }

// /* ---------------------------- Admin mutations ---------------------------- */

// export function useCreateMovie() {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (body: {
//       title: string;
//       description: string;
//       duration_minutes: number;
//       poster_url: string;
//       status: string; // MovieStatus
//       is_active?: boolean;
//     }) => apiPost<MovieDetailResponseDto>("/movies", body, true),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["movies"] });
//     },
//   });
// }

// export function useUpdateMovie(movieId: number) {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (
//       body: Partial<{
//         title: string;
//         description: string;
//         duration_minutes: number;
//         poster_url: string;
//         status: string;
//         is_active: boolean;
//       }>
//     ) => apiPatch<MovieDetailResponseDto>(`/movies/${movieId}`, body, true),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["movie", movieId] });
//       qc.invalidateQueries({ queryKey: ["movies"] });
//     },
//   });
// }

// export function useDeleteMovie() {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (movieId: number) =>
//       apiDelete<{ deleted: boolean }>(`/movies/${movieId}`, true),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["movies"] }),
//   });
// }

// export function useAddGenreToMovie(movieId: number) {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (genreId: number) =>
//       apiPost<{ added: boolean }>(
//         `/movies/${movieId}/genres/${genreId}`,
//         undefined,
//         true
//       ),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["movie", movieId] }),
//   });
// }

// export function useRemoveGenreFromMovie(movieId: number) {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (genreId: number) =>
//       apiDelete<{ removed: boolean }>(
//         `/movies/${movieId}/genres/${genreId}`,
//         true
//       ),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ["movie", movieId] }),
//   });
// }

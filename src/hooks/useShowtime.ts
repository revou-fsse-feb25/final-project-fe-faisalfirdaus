// // "use client";

// // import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// // import { api, apiDelete, apiPatch, apiPost } from "@/lib/api";
// // import type {
// //   ShowtimeDetailDto,
// //   ShowtimeSeatAvailabilityDto,
// // } from "@/lib/types";

// // const qk = {
// //   detail: (id: number) => ["showtime", id] as const,
// //   seats: (id: number) => ["showtime-seats", id] as const,
// //   adminList: (params?: any) => ["admin-showtimes", params] as const,
// // };

// // export function useShowtimeDetail(showtimeId: number) {
// //   return useQuery({
// //     queryKey: qk.detail(showtimeId),
// //     queryFn: () => api<ShowtimeDetailDto>(`/showtimes/${showtimeId}`),
// //     enabled: !!showtimeId,
// //   });
// // }

// // export function useShowtimeSeats(
// //   showtimeId: number,
// //   opts?: { refetchInterval?: number }
// // ) {
// //   return useQuery({
// //     queryKey: qk.seats(showtimeId),
// //     queryFn: () =>
// //       api<ShowtimeSeatAvailabilityDto[]>(`/showtimes/${showtimeId}/seats`),
// //     refetchInterval: opts?.refetchInterval ?? 5000,
// //     enabled: !!showtimeId,
// //   });
// // }

// // /* --------------------------- Admin CRUD showtimes -------------------------- */

// // export function useCreateShowtime() {
// //   const qc = useQueryClient();
// //   return useMutation({
// //     mutationFn: (body: {
// //       movie_id: number;
// //       studio_id: number;
// //       show_datetime: string; // ISO
// //       price: number;
// //       is_active?: boolean;
// //     }) => apiPost<ShowtimeDetailDto>("/showtimes", body, true),
// //     onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-showtimes"] }),
// //   });
// // }

// // export function useUpdateShowtime(showtimeId: number) {
// //   const qc = useQueryClient();
// //   return useMutation({
// //     mutationFn: (
// //       body: Partial<{
// //         movie_id: number;
// //         studio_id: number;
// //         show_datetime: string;
// //         price: number;
// //         is_active: boolean;
// //       }>
// //     ) => apiPatch<ShowtimeDetailDto>(`/showtimes/${showtimeId}`, body, true),
// //     onSuccess: () => {
// //       qc.invalidateQueries({ queryKey: ["showtime", showtimeId] });
// //       qc.invalidateQueries({ queryKey: ["admin-showtimes"] });
// //     },
// //   });
// // }

// // export function useDeleteShowtime() {
// //   const qc = useQueryClient();
// //   return useMutation({
// //     mutationFn: (showtimeId: number) =>
// //       apiDelete<{ deleted: boolean }>(`/showtimes/${showtimeId}`, true),
// //     onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-showtimes"] }),
// //   });
// // }

// "use client";

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { api, apiDelete, apiPatch, apiPost, withQuery } from "@/lib/api";
// import type {
//   ShowtimeDetailDto,
//   ShowtimeSeatAvailabilityDto,
// } from "@/lib/types";

// /** ------------------------------- Query Keys ------------------------------ */
// const qk = {
//   list: (params?: Record<string, unknown>) => ["showtimes", params] as const,
//   detail: (id: number) => ["showtime", id] as const,
//   seats: (id: number) => ["showtime-seats", id] as const,
//   adminList: (params?: Record<string, unknown>) =>
//     ["admin-showtimes", params] as const,
// };

// /** ------------------------------ List (Admin) ----------------------------- */
// /**
//  * GET /showtimes
//  * Optional filters: cursor, limit, movie_id, theater_id, date_from, date_to, is_active
//  * Auth required (admin).
//  */
// export type ShowtimesListParams = {
//   cursor?: string;
//   limit?: number;
//   movie_id?: number;
//   theater_id?: number;
//   date_from?: string; // ISO
//   date_to?: string; // ISO
//   is_active?: boolean;
// };

// type AdminShowtimesListResponse = {
//   items: ShowtimeDetailDto[];
//   nextCursor?: string | null;
// };

// export function useAdminShowtimes(params?: ShowtimesListParams) {
//   const path = withQuery("/showtimes", params);
//   return useQuery({
//     queryKey: qk.adminList(params),
//     queryFn: () => api<AdminShowtimesListResponse>(path, {}, { auth: true }),
//   });
// }

// /** Optional alias so older imports `useShowtimes` still work */
// export const useShowtimes = useAdminShowtimes;

// /** --------------------------------- Detail -------------------------------- */
// /** GET /showtimes/:showtimeId */
// export function useShowtimeDetail(showtimeId: number) {
//   return useQuery({
//     queryKey: qk.detail(showtimeId),
//     queryFn: () => api<ShowtimeDetailDto>(`/showtimes/${showtimeId}`),
//     enabled: !!showtimeId,
//   });
// }

// /** ----------------------------- Seat Availability ----------------------------- */
// /** GET /showtimes/:showtimeId/seats — live availability */
// export function useShowtimeSeats(
//   showtimeId: number,
//   opts?: { refetchInterval?: number }
// ) {
//   return useQuery({
//     queryKey: qk.seats(showtimeId),
//     queryFn: () =>
//       api<ShowtimeSeatAvailabilityDto[]>(`/showtimes/${showtimeId}/seats`),
//     refetchInterval: opts?.refetchInterval ?? 5000,
//     enabled: !!showtimeId,
//   });
// }

// /** --------------------------- Admin: Create/Update/Delete --------------------------- */
// /** POST /showtimes */
// export function useCreateShowtime() {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (body: {
//       movie_id: number;
//       studio_id: number;
//       show_datetime: string; // ISO
//       price: number;
//       is_active?: boolean;
//     }) => apiPost<ShowtimeDetailDto>("/showtimes", body, true),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["admin-showtimes"] });
//       qc.invalidateQueries({ queryKey: ["showtimes"] });
//     },
//   });
// }

// /** PATCH /showtimes/:showtimeId */
// export function useUpdateShowtime(showtimeId: number) {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (
//       body: Partial<{
//         movie_id: number;
//         studio_id: number;
//         show_datetime: string; // ISO
//         price: number;
//         is_active: boolean;
//       }>
//     ) => apiPatch<ShowtimeDetailDto>(`/showtimes/${showtimeId}`, body, true),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: qk.detail(showtimeId) });
//       qc.invalidateQueries({ queryKey: ["admin-showtimes"] });
//       qc.invalidateQueries({ queryKey: ["showtimes"] });
//     },
//   });
// }

// /** DELETE /showtimes/:showtimeId */
// export function useDeleteShowtime() {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (showtimeId: number) =>
//       apiDelete<{ deleted: boolean }>(`/showtimes/${showtimeId}`, true),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["admin-showtimes"] });
//       qc.invalidateQueries({ queryKey: ["showtimes"] });
//     },
//   });
// }

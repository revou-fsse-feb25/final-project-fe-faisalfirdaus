// "use client";

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { api } from "@/lib/api";
// import type { Me, UpdateMeDto } from "@/lib/types";

// /**
//  * Fetch and update the authenticated user's profile.
//  * - GET /users/profile
//  * - PATCH /users/profile
//  */
// export function useMe() {
//   const qc = useQueryClient();

//   const { data, isLoading, isFetching, error, refetch } = useQuery({
//     queryKey: ["me"],
//     queryFn: () => api<Me>("/users/profile", {}, { auth: true }),
//     // If the user is not authenticated, your API should return 401.
//     // The api() wrapper should handle that gracefully (no infinite retries).
//   });

//   const update = useMutation({
//     mutationFn: async (body: UpdateMeDto) => {
//       const res = await api<Me>(
//         "/users/profile",
//         {
//           method: "PATCH",
//           body: JSON.stringify(body),
//         },
//         { auth: true }
//       );
//       return res;
//     },
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["me"] });
//     },
//   });

//   const user = data ?? null;
//   const isHydrating = isLoading || isFetching;
//   const isAuthenticated = !!user;

//   return {
//     user,
//     isHydrating,
//     isAuthenticated,
//     error,
//     refetch,
//     update: update.mutateAsync,
//     isUpdating: update.isPending,
//   };
// }

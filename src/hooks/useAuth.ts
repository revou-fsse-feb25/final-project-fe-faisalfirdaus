// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "@/lib/api";
// import { setAuthCookies, clearAuthCookies } from "@/lib/auth";
// import type {
//   LoginResponseDto,
//   RegisterResponseDto,
//   RefreshResponseDto,
// } from "@/lib/types";
// import { useMe } from "./useMe";

// export type LoginDto = {
//   email: string;
//   password: string;
// };

// export type RegisterDto = {
//   username: string;
//   email: string;
//   password: string;
//   phone?: string; // keep nullable handling at the form/schema level
// };

// /**
//  * Auth hook (login/register/logout/refresh) + exposed user state.
//  * Uses /auth/* endpoints and composes useMe() for current user info.
//  */
// export function useAuth() {
//   const qc = useQueryClient();

//   // Current user state from /users/profile
//   const { user, isHydrating, isAuthenticated } = useMe();

//   const login = useMutation({
//     mutationFn: async (body: LoginDto) => {
//       const res = await api<LoginResponseDto>("/auth/login", {
//         method: "POST",
//         body: JSON.stringify(body),
//       });
//       // Set simple cookies for middleware UX gating (role + auth presence)
//       setAuthCookies(res.user.role);
//       return res;
//     },
//     onSuccess: () => {
//       // refetch /users/profile
//       qc.invalidateQueries({ queryKey: ["me"] });
//     },
//   });

//   const register = useMutation({
//     mutationFn: async (body: RegisterDto) => {
//       const res = await api<RegisterResponseDto>("/auth/register", {
//         method: "POST",
//         body: JSON.stringify(body),
//       });
//       return res;
//     },
//   });

//   const logout = useMutation({
//     mutationFn: async () => {
//       // If your backend expects a refresh token in body, pass it here.
//       // Otherwise if the backend reads cookies, this is fine.
//       await api<{ success: true }>("/auth/logout", { method: "POST" });
//       clearAuthCookies();
//       // Clear all cached queries so user state resets immediately
//       qc.clear();
//     },
//   });

//   const refresh = useMutation({
//     // If your backend returns tokens-only: use RefreshResponseDto
//     mutationFn: async () => {
//       const res = await api<RefreshResponseDto>("/auth/refresh", {
//         method: "POST",
//       });
//       // You won't have role here (tokens-only), so don't set role cookie.
//       // The next /users/profile fetch will restore user state.
//       return res;
//     },
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["me"] });
//     },
//   });

//   return {
//     // user state
//     user,
//     isAuthenticated,
//     isHydrating,

//     // auth mutations
//     login,
//     register,
//     logout,
//     refresh,
//   };
// }

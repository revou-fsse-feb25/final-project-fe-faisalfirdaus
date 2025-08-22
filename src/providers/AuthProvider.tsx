// providers/AuthProvider.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { clearTokens, setTokens } from "@/lib/auth";
import type { LoginResponseDto } from "@/lib/types";

type User = LoginResponseDto["user"] | null;

type AuthContextType = {
  user: User;
  ready: boolean; // becomes true after initial refresh/profile attempt finishes
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthCtx = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(null);
  const [ready, setReady] = useState(false);

  const setGateCookies = (role: string) => {
    document.cookie = `auth=1; path=/; max-age=${60 * 60 * 24 * 7}`;
    document.cookie = `role=${role}; path=/; max-age=${60 * 60 * 24 * 7}`;
  };
  const clearGateCookies = () => {
    document.cookie = "auth=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
  };

  useEffect(() => {
    (async () => {
      try {
        const refresh_token =
          typeof window !== "undefined"
            ? localStorage.getItem("refresh_token")
            : null;

        if (!refresh_token) {
          setReady(true);
          return;
        }

        const refreshed = await api<{
          access_token: string;
          refresh_token: string;
        }>("/auth/refresh", {
          method: "POST",
          body: JSON.stringify({ refresh_token }),
        });
        setTokens(refreshed.access_token, refreshed.refresh_token);

        const me = await api<LoginResponseDto["user"]>(
          "/users/profile",
          {},
          { auth: true }
        );
        setUser(me);
        setGateCookies(me.role);
      } catch {
        clearTokens();
        clearGateCookies();
        setUser(null);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  async function login(email: string, password: string) {
    const res = await api<LoginResponseDto>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setTokens(res.access_token, res.refresh_token);
    setUser(res.user);

    setGateCookies(res.user.role);
  }

  async function logout() {
    try {
      const refresh_token =
        typeof window !== "undefined"
          ? localStorage.getItem("refresh_token")
          : null;

      if (refresh_token) {
        await api("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refresh_token }),
        }).catch(() => {});
      }
    } finally {
      clearTokens();
      clearGateCookies();
      setUser(null);
    }
  }

  const value = useMemo<AuthContextType>(
    () => ({ user, ready, login, logout }),
    [user, ready]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

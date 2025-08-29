// providers/AuthProviders.tsx
"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Me } from "@/lib/types";
import {
  loadSessionFromStorage,
  saveSession,
  clearSession,
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getMe,
  refreshTokens,
  getUser,
} from "@/lib/auth-client";

interface AuthCtx {
  me: Me | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (p: {
    username: string;
    email: string;
    password: string;
    phone?: string | null;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProviders({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadSessionFromStorage();
    (async () => {
      try {
        const user = getUser();
        if (user) setMe(user);
        else {
          const profile = await getMe().catch(() => null);
          if (profile) setMe(profile);
        }
      } finally {
        setReady(true);
      }
    })();
  }, []);

  async function login(email: string, password: string) {
    const r = await apiLogin(email, password);
    setMe(r.user);
    toast.success("Logged in");
  }

  async function register(p: {
    username: string;
    email: string;
    password: string;
    phone?: string | null;
  }) {
    await apiRegister(p);
    toast.success("Account created — please log in");
  }

  async function logout() {
    await apiLogout();
    setMe(null);
    toast("Logged out");
  }

  async function refresh() {
    await refreshTokens();
    toast("Session refreshed");
  }

  const value = useMemo(
    () => ({ me, ready, login, register, logout, refresh }),
    [me, ready]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProviders");
  return v;
}

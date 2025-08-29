import { LoginResponseDto, RefreshResponseDto, Me } from "./types";

const DEFAULT_API =
  "https://final-project-be-faisalfirdaus-production.up.railway.app";
const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  DEFAULT_API;

const LS_ACCESS = "access_token";
const LS_REFRESH = "refresh_token";
const LS_USER = "me_v1";

// In-memory shadow (faster read; cleared on tab close)
let accessToken: string | null = null;
let refreshToken: string | null = null;
let currentUser: Me | null = null;

// --- Util: JWT exp (if standard JWT)
function getJwtExp(token?: string | null): number | null {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    const json = JSON.parse(atob(payload));
    return typeof json?.exp === "number" ? json.exp : null;
  } catch {
    return null;
  }
}

function secondsUntilExpiry(token?: string | null) {
  const exp = getJwtExp(token);
  if (!exp) return 999999; // unknown; treat as long
  return exp - Math.floor(Date.now() / 1000);
}

// --- Persistence helpers
export function loadSessionFromStorage() {
  if (typeof window === "undefined") return;
  accessToken = localStorage.getItem(LS_ACCESS);
  refreshToken = localStorage.getItem(LS_REFRESH);
  try {
    const raw = localStorage.getItem(LS_USER);
    currentUser = raw ? (JSON.parse(raw) as Me) : null;
  } catch {
    currentUser = null;
  }
}

export function saveSession(
  tokens: { access?: string; refresh?: string },
  me?: Me | null
) {
  if (typeof window === "undefined") return;
  if (typeof tokens.access === "string") {
    accessToken = tokens.access;
    localStorage.setItem(LS_ACCESS, tokens.access);
  }
  if (typeof tokens.refresh === "string") {
    refreshToken = tokens.refresh;
    localStorage.setItem(LS_REFRESH, tokens.refresh);
  }
  if (me !== undefined) {
    currentUser = me;
    if (me) localStorage.setItem(LS_USER, JSON.stringify(me));
    else localStorage.removeItem(LS_USER);
  }
}

export function clearSession() {
  accessToken = null;
  refreshToken = null;
  currentUser = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem(LS_ACCESS);
    localStorage.removeItem(LS_REFRESH);
    localStorage.removeItem(LS_USER);
  }
}

// --- Low-level request
async function baseFetch(path: string, init: RequestInit = {}) {
  const url = path.startsWith("http") ? path : new URL(path, API).toString();
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body)
    headers.set("Content-Type", "application/json");
  return fetch(url, { ...init, headers });
}

// --- Auto auth fetch (adds bearer; refresh on 401)
export async function authFetch(
  path: string,
  init: RequestInit = {},
  retry = true
) {
  // Refresh proactively if exp < 30s
  if (secondsUntilExpiry(accessToken) < 30) {
    await refreshTokens().catch(() => {});
  }
  const headers = new Headers(init.headers);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  let res = await baseFetch(path, { ...init, headers });

  if (res.status === 401 && retry && refreshToken) {
    const refreshed = await refreshTokens().catch(() => null);
    if (refreshed) {
      const headers2 = new Headers(init.headers);
      headers2.set("Authorization", `Bearer ${accessToken}`);
      res = await baseFetch(path, { ...init, headers: headers2 });
    }
  }
  return res;
}

// --- Auth endpoints
export async function login(
  email: string,
  password: string
): Promise<LoginResponseDto> {
  const res = await baseFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  const json = (await res.json()) as LoginResponseDto;
  saveSession(
    { access: json.access_token, refresh: json.refresh_token },
    json.user
  );
  return json;
}

export async function register(body: {
  username: string;
  email: string;
  password: string;
  phone?: string | null;
}) {
  const res = await baseFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function refreshTokens(): Promise<RefreshResponseDto> {
  if (!refreshToken) throw new Error("No refresh token");
  const res = await baseFetch("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!res.ok) {
    clearSession();
    throw new Error(await res.text());
  }
  const json = (await res.json()) as RefreshResponseDto;
  saveSession({ access: json.access_token, refresh: json.refresh_token });
  return json;
}

export async function logout() {
  try {
    await baseFetch("/auth/logout", { method: "POST" });
  } finally {
    clearSession();
  }
}

export async function getMe(): Promise<Me> {
  const res = await authFetch("/users/profile");
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function getAccessToken() {
  return accessToken;
}
export function getUser() {
  return currentUser;
}

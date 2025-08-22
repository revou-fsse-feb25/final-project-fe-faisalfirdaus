import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setTokens,
} from "./auth";
import type { RefreshResponseDto } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/, "") || "";

export function withQuery(
  path: string,
  query?: Record<string, string | number | boolean | undefined | null>
) {
  if (!query) return path;
  const usp = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    usp.set(k, String(v));
  });
  const qs = usp.toString();
  return qs ? `${path}?${qs}` : path;
}

let refreshInFlight: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      clearTokens();
      return null;
    }

    const data = (await res.json()) as RefreshResponseDto;
    setTokens(data.access_token, data.refresh_token);
    setAccessToken(data.access_token);
    return data.access_token;
  })();

  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}

export async function api<T>(
  path: string,
  init: RequestInit = {},
  opts?: { auth?: boolean; baseUrl?: string }
): Promise<T> {
  const base = (opts?.baseUrl ?? API_BASE).replace(/\/+$/, "");
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type"))
    headers.set("Content-Type", "application/json");

  if (opts?.auth) {
    const at = getAccessToken();
    if (at) headers.set("Authorization", `Bearer ${at}`);
  }

  let res = await fetch(url, { ...init, headers });

  if (res.status === 401 && opts?.auth) {
    const newAT = await refreshAccessToken();
    if (newAT) {
      headers.set("Authorization", `Bearer ${newAT}`);
      res = await fetch(url, { ...init, headers });
    }
  }

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const err = await res.json();
      message = (err?.message as string) || message;
      throw Object.assign(new Error(message), {
        status: res.status,
        details: err,
      });
    } catch (e) {
      const text = await res.text().catch(() => "");
      if (text && text !== message) {
        throw Object.assign(new Error(text), { status: res.status });
      }
      throw Object.assign(new Error(message), { status: res.status });
    }
  }

  const txt = await res.text();
  return (txt ? JSON.parse(txt) : undefined) as T;
}

export const apiGet = <T>(path: string, auth = false) =>
  api<T>(path, {}, { auth });
export const apiPost = <T>(path: string, body?: unknown, auth = false) =>
  api<T>(
    path,
    { method: "POST", body: body ? JSON.stringify(body) : undefined },
    { auth }
  );
export const apiPatch = <T>(path: string, body?: unknown, auth = false) =>
  api<T>(
    path,
    { method: "PATCH", body: body ? JSON.stringify(body) : undefined },
    { auth }
  );
export const apiDelete = <T>(path: string, auth = false) =>
  api<T>(path, { method: "DELETE" }, { auth });

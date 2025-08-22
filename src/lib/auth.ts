let _accessToken: string | null = null;
let _refreshToken: string | null = null;

const REFRESH_KEY = "refresh_token";

export function setTokens(access: string, refresh: string) {
  _accessToken = access;
  _refreshToken = refresh;
  try {
    localStorage.setItem(REFRESH_KEY, refresh);
  } catch {
    // ignore
  }
}

export function setAccessToken(token: string) {
  _accessToken = token;
}

export function getAccessToken() {
  return _accessToken;
}

export function getRefreshToken(): string | null {
  if (_refreshToken) return _refreshToken;
  try {
    _refreshToken = localStorage.getItem(REFRESH_KEY);
  } catch {
    _refreshToken = null;
  }
  return _refreshToken;
}

export function clearTokens() {
  _accessToken = null;
  _refreshToken = null;
  try {
    localStorage.removeItem(REFRESH_KEY);
  } catch {
    // ignore
  }
}

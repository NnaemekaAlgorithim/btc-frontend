import type { User } from "./api";

export function saveAuth(token: string, user: User) {
  localStorage.setItem("btc_token", token);
  localStorage.setItem("btc_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("btc_token");
  localStorage.removeItem("btc_user");
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("btc_user");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("btc_token");
}

export function formatBTC(val: string | number): string {
  const n = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(n)) return "0.00000000000";
  return n.toFixed(11);
}

export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  const masked = name.slice(0, 2) + "****" + name.slice(-1);
  return `${masked}@${domain}`;
}

import { authFetch } from "@/lib/auth-client";

export async function getMyBookings() {
  const res = await authFetch("/me/bookings");
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

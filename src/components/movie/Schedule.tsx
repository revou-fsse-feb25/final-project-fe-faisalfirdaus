"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/** ---------- API BASE ---------- */
const DEFAULT_API =
  "https://final-project-be-faisalfirdaus-production.up.railway.app";

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  DEFAULT_API;

/** ---------- Original helpers (unchanged styling) ---------- */
type Showtime = {
  id: number;
  time: string;
  studio: string;
  format: string;
  price: number;
};
type MovieSchedule = {
  id: number;
  theatre: string;
  address: string;
  entries: Showtime[];
};
type DaySchedule = MovieSchedule[];
type SchedulesByDate = Record<string, DaySchedule>;

function fmtKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function addDays(base: Date, n: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}
function monthShort(d: Date) {
  return d.toLocaleString(undefined, { month: "short" });
}
function weekdayShort(d: Date) {
  return d.toLocaleString(undefined, { weekday: "short" });
}
function parseYMD(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

/** ---------- Minimal API response types (no zod) ---------- */
type APIDateItem = { date: string; count: number };
type APIShowtimeEntry = {
  showtimeId: number;
  timeHHmm: string;
  studioName: string;
  studioType: string; // "Regular" | "IMAX" | "Premier" | string
  price: number;
};
type APIShowtimeGroup = {
  theater_id: number;
  theater_name: string;
  entries: APIShowtimeEntry[];
};

const Schedule = ({ movieId }: { movieId: number | string }) => {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  // Keep same state shapes to preserve styling/structure
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selection, setSelection] = useState<{
    theatre?: string;
    fmt?: string;
    screen?: string;
    time?: string;
    showtimeId?: number;
  }>({});

  // ---------- NEW: fetch dates + showtimes from API ----------
  const [apiDates, setApiDates] = useState<APIDateItem[]>([]);
  const [schedulesByDate, setSchedulesByDate] = useState<SchedulesByDate>({});
  const [loadingDates, setLoadingDates] = useState(false);
  const [loadingShows, setLoadingShows] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // load available dates
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingDates(true);
        const url = new URL(
          `/movies/${movieId}/showtimes/dates`,
          API
        ).toString();
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(await res.text());
        const json: APIDateItem[] = await res.json();
        if (cancelled) return;
        setApiDates(json || []);
        // If today's not available, pick first available
        const first = json?.[0]?.date;
        if (first) setSelectedDate(parseYMD(first));
        setError(null);
      } catch (e: any) {
        setError(String(e?.message || "Failed to load dates"));
      } finally {
        if (!cancelled) setLoadingDates(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [movieId]);

  // load showtimes for selected date
  useEffect(() => {
    const key = fmtKey(selectedDate);
    // if already loaded for this date, skip
    if (schedulesByDate[key]) return;

    let cancelled = false;
    (async () => {
      try {
        setLoadingShows(true);
        const url = new URL(`/movies/${movieId}/showtimes`, API);
        url.searchParams.set("date", key); // YYYY-MM-DD
        const res = await fetch(url.toString(), { cache: "no-store" });
        if (!res.ok) throw new Error(await res.text());
        const json: APIShowtimeGroup[] = await res.json();
        if (cancelled) return;

        // Map API -> existing UI model without changing styling
        const mapped: DaySchedule =
          (json || []).map((group) => ({
            id: group.theater_id,
            theatre: group.theater_name,
            address: "", // (API doesn't provide; keep layout same)
            entries: group.entries.map((e) => ({
              id: e.showtimeId,
              time: e.timeHHmm,
              studio: e.studioName,
              format: e.studioType,
              price: e.price,
            })),
          })) ?? [];

        setSchedulesByDate((prev) => ({ ...prev, [key]: mapped }));
        setSelection({});
        setError(null);
      } catch (e: any) {
        setError(String(e?.message || "Failed to load showtimes"));
        setSchedulesByDate((prev) => ({ ...prev, [key]: [] }));
      } finally {
        if (!cancelled) setLoadingShows(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [movieId, selectedDate, schedulesByDate]);

  const key = fmtKey(selectedDate);
  const day = schedulesByDate[key] || [];

  // Keep original date strip UX, but drive it from API dates if available
  const dateStrip = useMemo(() => {
    if (apiDates.length > 0) {
      // Use up to 10 API-provided dates to keep the same look
      return apiDates.slice(0, 10).map((d) => parseYMD(d.date));
    }
    // Fallback to original 10-day strip around selected
    return Array.from({ length: 10 }, (_, i) => addDays(selectedDate, i - 2));
  }, [apiDates, selectedDate]);

  function onPickSeats() {
    if (selection.showtimeId) {
      // Go directly to seat selection for this showtime
      router.push(`/showtimes/${selection.showtimeId}`);
      return;
    }
    if (!selection.theatre) return; // keep original guard
    const params = new URLSearchParams({
      date: selectedDate.toISOString(),
      theatre: selection.theatre!,
      fmt: selection.fmt || "",
      screen: selection.screen || "",
      time: selection.time || "",
    });
    router.push(`/layout?${params.toString()}`);
  }

  return (
    <div className="mx-auto w-full  bg-neutral-950 p-4 text-neutral-100">
      {/* Title row */}
      <div className="mb-3 flex items-end justify-between border-b border-neutral-700 pb-2">
        <h4 className="font-bold tracking-wider text-red-400">SCHEDULES</h4>
      </div>

      {/* Date strip */}
      <div className="flex items-center justify-center gap-3 border-b border-neutral-700 pb-3">
        <ul className="flex flex-wrap items-center gap-3">
          {loadingDates && (
            <li className="text-xs text-neutral-400">Loading dates…</li>
          )}
          {!loadingDates && dateStrip.length === 0 && (
            <li className="text-xs text-neutral-400">No available dates</li>
          )}
          {dateStrip.map((d) => {
            const active = fmtKey(d) === key;
            return (
              <li key={fmtKey(d)}>
                <button
                  onClick={() => setSelectedDate(d)}
                  className={`grid w-[68px] grid-rows-[auto_auto_auto] place-items-center rounded border px-2 py-1 text-xs leading-none ${
                    active
                      ? "border-white bg-transparent text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.5)]"
                      : "border-transparent text-neutral-300 hover:border-neutral-600"
                  }`}
                >
                  <span className="opacity-80">{monthShort(d)}</span>
                  <em className="not-italic opacity-70">{weekdayShort(d)}</em>
                  <strong className="text-lg">
                    {String(d.getDate()).padStart(2, "0")}
                  </strong>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Movie list */}
      <ul className="mt-6 space-y-8">
        {loadingShows && (
          <li className="text-sm text-neutral-400">Loading showtimes…</li>
        )}
        {!loadingShows && day.length === 0 && (
          <li className="text-sm text-neutral-400">
            No showtimes for this date.
          </li>
        )}

        {day.map((m, idx) => (
          <li key={m.id}>
            {/* Header row */}
            <div className="flex items-baseline justify-between border-b border-neutral-800 pb-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-extrabold tracking-wide">
                  {m.theatre}
                </h3>
              </div>
              <div>
                <span className="text-sm text-neutral-300">{m.address}</span>
              </div>
            </div>

            {/* Format rows (grouped by fmt+screen) */}
            <div className="mt-3 space-y-4">
              {Object.values(
                m.entries.reduce<Record<string, Showtime[]>>((acc, cur) => {
                  const k = `${cur.format}|${cur.studio}`;
                  (acc[k] ||= []).push(cur);
                  return acc;
                }, {})
              ).map((group, i) => (
                <div key={i}>
                  <div className="mb-2 flex items-center gap-2 text-sm text-neutral-200">
                    <span className="text-lg leading-none">▸</span>
                    <span className="font-medium">{group[0].format}</span>
                    <span className="ml-2 text-neutral-400">
                      {group[0].studio}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.map((s) => {
                      const active =
                        selection.theatre === m.theatre &&
                        selection.time === s.time &&
                        selection.screen === s.studio;
                      return (
                        <button
                          key={s.id}
                          onClick={() =>
                            setSelection({
                              theatre: m.theatre,
                              fmt: s.format,
                              screen: s.studio,
                              time: s.time,
                              showtimeId: s.id,
                            })
                          }
                          className={`rounded border px-2.5 py-1 text-sm leading-none ${
                            active
                              ? "border-white text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.5)]"
                              : "border-neutral-600 bg-neutral-900 text-neutral-100 hover:bg-neutral-800"
                          }`}
                          title={`Rp ${s.price.toLocaleString("id-ID")}`}
                        >
                          {s.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* Summary bar (unchanged styling) */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-neutral-800 pt-4 sm:flex-row sm:items-center">
        <div className="text-sm text-neutral-300">
          <span className="font-semibold text-neutral-100">SUMMARY :</span>{" "}
          Location: <span>FX Sudirman</span> | Date:{" "}
          <span>
            {selectedDate.toLocaleDateString(undefined, {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <br />
          Theatre: <span>{selection.theatre ?? "-"}</span> | Class:{" "}
          <span>{selection.fmt ?? "-"}</span> | Time:{" "}
          <span>{selection.time ?? "-"}</span>
        </div>
        <button
          disabled={!selection.theatre}
          className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition enabled:hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onPickSeats}
        >
          PICK YOUR SEATS
        </button>
      </div>
    </div>
  );
};

export default Schedule;

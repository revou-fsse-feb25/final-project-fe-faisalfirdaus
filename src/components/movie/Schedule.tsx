// "use client";
// import React, { useMemo, useRef, useState } from "react";

// /**
//  * ShowtimesSchedule.tsx — CGV-like schedule list with a horizontal date scroller
//  * and movie showtime lists + interactive summary.
//  *
//  * No external libs. Tailwind-only. Works in Next.js/React.
//  */

// type Showtime = {
//   id: string;
//   time: string; // "HH:MM"
//   screen: string; // e.g., "Audi 1"
//   fmt: string; // e.g., "2D"
// };

// type MovieSchedule = {
//   id: string;
//   title: string;
//   genre: string;
//   durationMin: number;
//   entries: Showtime[];
// };

// type DaySchedule = MovieSchedule[];

// type SchedulesByDate = Record<string, DaySchedule>;

// function fmtDateKey(d: Date) {
//   const y = d.getFullYear();
//   const m = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${y}-${m}-${day}`;
// }

// function monthShort(d: Date) {
//   return d.toLocaleString(undefined, { month: "short" });
// }
// function weekdayShort(d: Date) {
//   return d.toLocaleString(undefined, { weekday: "short" });
// }

// function addDays(base: Date, n: number) {
//   const d = new Date(base);
//   d.setDate(d.getDate() + n);
//   return d;
// }

// export default function Schedule() {
//   const today = new Date();
//   const [selectedDate, setSelectedDate] = useState<Date>(today);
//   const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
//   const [selectedFmt, setSelectedFmt] = useState<string | null>(null);
//   const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);

//   // --- Sample data (replace with API data) ---
//   const schedules: SchedulesByDate = useMemo(() => {
//     const kToday = fmtDateKey(today);
//     const k2 = fmtDateKey(addDays(today, 1));
//     const k3 = fmtDateKey(addDays(today, 2));
//     return {
//       [kToday]: [
//         {
//           id: "25019500",
//           title: "SORE ISTRI DARI MASA DEPAN",
//           genre: "DRAMA",
//           durationMin: 119,
//           entries: [
//             { id: "8944876", time: "11:00", screen: "Satin 4", fmt: "2D" },
//             { id: "8944877", time: "13:25", screen: "Satin 4", fmt: "2D" },
//             { id: "8944878", time: "15:50", screen: "Satin 4", fmt: "2D" },
//           ],
//         },
//         {
//           id: "25032500",
//           title: "WEAPONS",
//           genre: "HORROR",
//           durationMin: 128,
//           entries: [
//             { id: "8944891", time: "11:20", screen: "Audi 1", fmt: "2D" },
//             { id: "8944892", time: "13:55", screen: "Audi 1", fmt: "2D" },
//             { id: "8944893", time: "16:30", screen: "Audi 1", fmt: "2D" },
//             { id: "8944894", time: "19:05", screen: "Audi 1", fmt: "2D" },
//             { id: "8944895", time: "21:40", screen: "Audi 1", fmt: "2D" },
//             { id: "8944879", time: "18:15", screen: "Satin 4", fmt: "2D" },
//             { id: "8944880", time: "20:50", screen: "Satin 4", fmt: "2D" },
//           ],
//         },
//         {
//           id: "25027300",
//           title: "PANGGIL AKU AYAH",
//           genre: "DRAMA",
//           durationMin: 120,
//           entries: [
//             { id: "8944866", time: "11:30", screen: "Audi 2", fmt: "2D" },
//             { id: "8944867", time: "13:55", screen: "Audi 2", fmt: "2D" },
//             { id: "8944868", time: "16:20", screen: "Audi 2", fmt: "2D" },
//             { id: "8944869", time: "18:45", screen: "Audi 2", fmt: "2D" },
//             { id: "8944870", time: "21:10", screen: "Audi 2", fmt: "2D" },
//           ],
//         },
//         {
//           id: "25031900",
//           title: "MY DAUGHTER IS A ZOMBIE",
//           genre: "COMEDY",
//           durationMin: 114,
//           entries: [
//             { id: "8944871", time: "12:00", screen: "Satin 3", fmt: "2D" },
//             { id: "8944872", time: "14:20", screen: "Satin 3", fmt: "2D" },
//             { id: "8944873", time: "16:40", screen: "Satin 3", fmt: "2D" },
//             { id: "8944874", time: "19:00", screen: "Satin 3", fmt: "2D" },
//             { id: "8944875", time: "21:20", screen: "Satin 3", fmt: "2D" },
//           ],
//         },
//       ],
//       [k2]: [
//         {
//           id: "25019500",
//           title: "SORE ISTRI DARI MASA DEPAN",
//           genre: "DRAMA",
//           durationMin: 119,
//           entries: [
//             { id: "x1", time: "10:30", screen: "Satin 4", fmt: "2D" },
//             { id: "x2", time: "13:00", screen: "Satin 4", fmt: "2D" },
//           ],
//         },
//       ],
//       [k3]: [],
//     };
//   }, [today]);

//   const scrollRef = useRef<HTMLDivElement | null>(null);

//   const dateRange = useMemo(() => {
//     // 28-day window (can tweak)
//     return Array.from({ length: 28 }, (_, i) => addDays(today, i));
//   }, [today]);

//   const key = fmtDateKey(selectedDate);
//   const daySchedules = schedules[key] || [];

//   function onPickDate(d: Date) {
//     setSelectedDate(d);
//     // reset selections
//     setSelectedMovie(null);
//     setSelectedFmt(null);
//     setSelectedScreen(null);
//     setSelectedTime(null);
//   }

//   function onPickShowtime(m: MovieSchedule, s: Showtime) {
//     setSelectedMovie(m.title);
//     setSelectedFmt(s.fmt);
//     setSelectedScreen(s.screen);
//     setSelectedTime(s.time);
//   }

//   function scrollDates(dir: 1 | -1) {
//     const el = scrollRef.current;
//     if (!el) return;
//     const step = 6 * 88; // ~6 items * (80px width + gap/padding)
//     el.scrollBy({ left: dir * step, behavior: "smooth" });
//   }

//   return (
//     <div className="showtimes-wrapper w-full max-w-5xl mx-auto text-white">
//       <h4 className="mb-3 text-xl font-bold tracking-wide">SCHEDULES</h4>

//       {/* Date scroller */}
//       <div className="sect-schedule rounded-xl bg-neutral-900 p-4 ring-1 ring-black/30">
//         <div className="date-schedule relative">
//           <div className="flex items-center justify-between">
//             <button
//               type="button"
//               onClick={() => scrollDates(-1)}
//               className="btn-prev rounded-md bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700"
//             >
//               View previous date
//             </button>
//             <button
//               type="button"
//               onClick={() => scrollDates(1)}
//               className="btn-next rounded-md bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700"
//             >
//               View Next Date
//             </button>
//           </div>

//           <div
//             ref={scrollRef}
//             className="mt-3 flex gap-2 overflow-x-auto scroll-smooth px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//           >
//             {dateRange.map((d) => {
//               const active = fmtDateKey(d) === key;
//               return (
//                 <button
//                   key={fmtDateKey(d)}
//                   onClick={() => onPickDate(d)}
//                   className={`w-20 shrink-0 rounded-lg border px-2 py-2 text-center transition ${
//                     active
//                       ? "border-red-500 bg-red-600/10 text-white"
//                       : "border-transparent bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
//                   }`}
//                 >
//                   <span className="block text-xs opacity-80">
//                     {monthShort(d)}
//                   </span>
//                   <em className="block text-xs not-italic opacity-70">
//                     {weekdayShort(d)}
//                   </em>
//                   <strong className="block text-lg leading-tight">
//                     {String(d.getDate()).padStart(2, "0")}
//                   </strong>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Movie + showtimes list */}
//         <div className="schedule-container mt-6">
//           <div className="schedule-json">
//             {daySchedules.length === 0 ? (
//               <div className="rounded-md border border-neutral-800 bg-neutral-800/40 p-4 text-center text-sm text-neutral-300">
//                 No schedules for this date.
//               </div>
//             ) : (
//               <div className="schedule-section">
//                 <div className="schedule-lists">
//                   <ul className="space-y-6">
//                     {daySchedules.map((movie) => (
//                       <li
//                         key={movie.id}
//                         className="rounded-lg bg-neutral-800/40 p-4 ring-1 ring-black/20"
//                       >
//                         <div className="schedule-title text-base font-semibold">
//                           <a href="#" className="hover:underline">
//                             {movie.title}
//                           </a>{" "}
//                           <span className="ml-2 text-sm font-normal text-neutral-300">
//                             {movie.genre} / {movie.durationMin} Minutes
//                           </span>
//                         </div>

//                         {/* Single format group (simple). If you need multi-format, group by fmt+screen */}
//                         <ul className="mt-3 space-y-2">
//                           {/* Group rows by screen+fmt */}
//                           {Object.values(
//                             movie.entries.reduce<Record<string, Showtime[]>>(
//                               (acc, cur) => {
//                                 const key = `${cur.fmt}|${cur.screen}`;
//                                 (acc[key] ||= []).push(cur);
//                                 return acc;
//                               },
//                               {}
//                             )
//                           ).map((group, idx) => (
//                             <li key={idx} className="schedule-type">
//                               <div className="mb-2 text-sm text-neutral-300">
//                                 <i className="fa fa-caret-right mr-1" />{" "}
//                                 {group[0].fmt}{" "}
//                                 <span className="audi-nm ml-2 rounded bg-neutral-700 px-2 py-0.5 text-xs text-neutral-200">
//                                   {group[0].screen}
//                                 </span>
//                               </div>
//                               <ul className="showtime-lists flex flex-wrap gap-2">
//                                 {group.map((s) => {
//                                   const active =
//                                     selectedMovie === movie.title &&
//                                     selectedTime === s.time &&
//                                     selectedScreen === s.screen;
//                                   return (
//                                     <li key={s.id}>
//                                       <button
//                                         onClick={() => onPickShowtime(movie, s)}
//                                         className={`rounded-md border px-3 py-2 text-sm transition ${
//                                           active
//                                             ? "border-red-500 bg-red-600/15 text-white"
//                                             : "border-neutral-700 bg-neutral-900 text-neutral-100 hover:bg-neutral-800"
//                                         }`}
//                                       >
//                                         {s.time}
//                                       </button>
//                                     </li>
//                                   );
//                                 })}
//                               </ul>
//                             </li>
//                           ))}
//                         </ul>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Summary */}
//           <div className="showtimes-sum mt-6 flex flex-col items-start justify-between gap-4 rounded-lg bg-neutral-800/40 p-4 ring-1 ring-black/20 sm:flex-row sm:items-center">
//             <div className="sum-text text-sm text-neutral-200">
//               <span className="font-semibold tracking-wide text-neutral-100">
//                 SUMMARY :
//               </span>{" "}
//               Location: <span id="sum-location">FX Sudirman</span> | Date:{" "}
//               <span id="sum-showdate">
//                 {selectedDate.toLocaleDateString(undefined, {
//                   weekday: "short",
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               </span>
//               <br />
//               Movie: <span id="sum-movie">{selectedMovie ?? "-"}</span> | Class:{" "}
//               <span id="sum-suite">{selectedFmt ?? "-"}</span> | Time:{" "}
//               <span id="sum-showtime">{selectedTime ?? "-"}</span>
//             </div>

//             <form
//               action="#"
//               method="get"
//               onSubmit={(e) => e.preventDefault()}
//               className="shrink-0"
//             >
//               <input
//                 type="hidden"
//                 name="showdate"
//                 value={fmtDateKey(selectedDate)}
//               />
//               <input type="hidden" name="cinema" value="049" />
//               <button
//                 type="submit"
//                 disabled={!selectedMovie}
//                 className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition enabled:hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 PICK YOUR SEATS
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";

// const Schedule = () => {
//   const dates = [
//     { d: "Jum", n: 15, active: true },
//     { d: "Sab", n: 16 },
//     { d: "Min", n: 17 },
//     { d: "Sen", n: 18 },
//     { d: "Sel", n: 19 },
//     { d: "Rab", n: 20 },
//     { d: "Kam", n: 21 },
//   ];

//   return (
//     <div data-testid="movie-content-schedule" className="tab-pane">
//       <div className="overflow-x-auto scroll-smooth pb-2 -mx-1">
//         <div className="flex gap-3 px-1">
//           {dates.map((x, i) => (
//             <button
//               key={i}
//               className={`min-w-[88px] rounded-xl px-3 py-2 text-center text-sm border transition
//                 ${
//                   x.active
//                     ? "bg-white text-black border-white"
//                     : "bg-white/10 text-white/80 border-white/10"
//                 }
//               `}
//             >
//               <p className="leading-4">{x.d}</p>
//               <time className="text-lg font-semibold leading-5">{x.n}</time>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mt-4 flex flex-wrap gap-3">
//         {["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"].map((c, i) => (
//           <button
//             key={i}
//             className={`rounded-full border px-4 py-1.5 text-sm ${
//               i === 0
//                 ? "bg-white text-black border-white"
//                 : "bg-transparent text-white/90 border-white/20"
//             }`}
//           >
//             {c}
//           </button>
//         ))}
//       </div>

//       <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold">AEON MALL TANJUNG BARAT XXI</h3>
//           <select className="rounded-md bg-black/40 px-2 py-1 text-sm outline-none border border-white/10">
//             <option>Reguler 2D</option>
//             <option>IMAX</option>
//             <option>The Premiere</option>
//           </select>
//         </div>

//         <div className="mt-3 flex flex-wrap gap-3">
//           {["12:15", "15:05", "17:55", "20:45"].map((t) => (
//             <button
//               key={t}
//               className="rounded-md bg-emerald-700/90 px-4 py-2 text-sm font-semibold hover:bg-emerald-700"
//             >
//               {t}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Schedule;

"use client";
import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
/**
 * Screenshot-styled schedule list, but keeping the same dark color palette.
 * - Title bar with right-side note
 * - Slim horizontal rules between movies
 * - Date strip with boxed active day
 * - Show time pills with thin borders
 */

type Showtime = { id: string; time: string; studio: string; format: string };

type MovieSchedule = {
  id: string;
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

export default function ShowtimesStyled() {
  const router = useRouter();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selection, setSelection] = useState<{
    theatre?: string;
    fmt?: string;
    screen?: string;
    time?: string;
  }>({});

  // Demo data
  const schedules: SchedulesByDate = useMemo(() => {
    const k0 = fmtKey(today);
    return {
      [k0]: [
        {
          id: "a",
          theatre: "BEC XIX",
          address:
            "Jl. Purnawarman 13-15 Gedung Bec Lama Lt Lg Blok A 02, Kota Bandung, Jawa Barat 40117",
          entries: [
            { id: "1", time: "11:30", studio: "Satin 4", format: "2D" },
            { id: "2", time: "13:20", studio: "Satin 4", format: "2D" },
            { id: "3", time: "15:40", studio: "Satin 4", format: "2D" },
          ],
        },
        {
          id: "b",
          theatre: "BIP XIX",
          address:
            "Jl. Purnawarman 13-15 Gedung Bec Lama Lt Lg Blok A 02, Kota Bandung, Jawa Barat 40117",
          entries: [
            { id: "1", time: "11:30", studio: "Satin 4", format: "2D" },
            { id: "2", time: "13:30", studio: "Satin 4", format: "2D" },
            { id: "3", time: "15:55", studio: "Satin 4", format: "2D" },
          ],
        },
        {
          id: "c",
          theatre: "TSM XIX",
          address:
            "Jl. Purnawarman 13-15 Gedung Bec Lama Lt Lg Blok A 02, Kota Bandung, Jawa Barat 40117",
          entries: [
            { id: "1", time: "11:00", studio: "Satin 4", format: "2D" },
            { id: "2", time: "13:25", studio: "Satin 4", format: "2D" },
            { id: "3", time: "15:50", studio: "Satin 4", format: "2D" },
          ],
        },
      ],
    };
  }, [today]);

  const key = fmtKey(selectedDate);
  const day = schedules[key] || [];

  // date strip (10 days around selected)
  const dateStrip = useMemo(
    () => Array.from({ length: 10 }, (_, i) => addDays(selectedDate, i - 2)),
    [selectedDate]
  );

  function onPickSeats() {
    if (!selection.theatre) return;
    const params = new URLSearchParams({
      date: selectedDate.toISOString(),
      theatre: selection.theatre!,
      fmt: selection.fmt!,
      screen: selection.screen!,
      time: selection.time!,
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
        {day.map((m, idx) => (
          <li key={m.id}>
            {/* Header row */}
            <div className="flex items-baseline justify-between border-b border-neutral-800 pb-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-extrabold tracking-wide">
                  {m.theatre}
                </h3>
              </div>
              {/* right aligned latest screen label from entries */}
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
                            })
                          }
                          className={`rounded border px-2.5 py-1 text-sm leading-none ${
                            active
                              ? "border-white text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.5)]"
                              : "border-neutral-600 bg-neutral-900 text-neutral-100 hover:bg-neutral-800"
                          }`}
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

      {/* Summary bar */}
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
}

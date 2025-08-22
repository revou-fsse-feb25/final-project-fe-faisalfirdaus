"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Clock, MapPin, Calendar } from "lucide-react";

/** URL param types coming from /seats?date=...&theatre=... etc */
type Params = {
  date?: string;
  theatre?: string;
  format?: string;
  studio?: string;
  time?: string;
};

type Props = { searchParams: Params };

/** Row letters and SeatId like "E8" */
const rows = ["K", "J", "H", "G", "F", "E", "D", "C", "B", "A"] as const;
type Row = (typeof rows)[number];
type SeatId = `${Row}${number}`;

/** Seat status map (only specify seats that are special) */
type SeatState = "booked";
type SeatStatusMap = Partial<Record<SeatId, SeatState>>;

const MovieTheaterLayout = ({ searchParams }: Props) => {
  const sp = useSearchParams();
  const date = sp.get("date");
  const theatre = sp.get("theatre");
  const format = sp.get("format");
  const studio = sp.get("studio");
  const time = sp.get("time");

  const formattedDay = new Date(date ?? "").toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const [selectedSeats, setSelectedSeats] = useState<SeatId[]>([]);

  // Define seat layout - rows and columns
  const columns: number[] = Array.from({ length: 14 }, (_, i) => i + 1);

  // Define seat statuses
  const seatStatus: SeatStatusMap = {
    E8: "booked",
    D4: "booked",
    D3: "booked",
    C3: "booked",
  };

  const handleSeatClick = (seatId: SeatId): void => {
    if (seatStatus[seatId] === "booked") return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  // DARK THEME palette (only colors changed)
  const getSeatClass = (seatId: SeatId): string => {
    if (seatStatus[seatId] === "booked") {
      // booked = muted gray with no hover
      return "bg-neutral-600 text-neutral-300 cursor-not-allowed border border-neutral-700";
    }
    if (selectedSeats.includes(seatId)) {
      // selected = light on dark to pop
      return "bg-red-700 cursor-pointer hover:bg-red-600 border border-red-600";
    }
    // default = dark pill w/ subtle border, light text
    return "bg-neutral-800 text-neutral-200 cursor-pointer hover:bg-neutral-700 border border-neutral-700";
  };

  return (
    <div className="min-h-screen w-full bg-black text-neutral-200">
      <div className="mx-auto max-w-7xl p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Seating Chart */}
          <div className="lg:col-span-2 rounded-lg bg-neutral-900 p-6 shadow">
            {/* Legend */}
            <div className="mb-6 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded border border-neutral-700 bg-neutral-800" />
                <span className="text-neutral-300">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-neutral-600" />
                <span className="text-neutral-300">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-red-600" />
                <span className="text-neutral-300">Selected</span>
              </div>
            </div>

            {/* Screen */}
            <div className="mb-8">
              <div className="rounded-lg bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 py-4 text-center font-medium text-neutral-200">
                Screen
              </div>
            </div>

            {/* Seats */}
            <div className="space-y-3">
              {rows.map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-center gap-2"
                >
                  {/* Row label */}
                  <div className="w-8 text-center font-medium text-neutral-400">
                    {row}
                  </div>

                  {/* Left side seats */}
                  <div className="flex gap-1">
                    {columns.slice(0, 7).map((col) => {
                      const seatId = `${row}${col}` as SeatId;
                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          className={`h-8 w-8 rounded text-xs font-medium transition-colors ${getSeatClass(
                            seatId
                          )}`}
                        >
                          {seatId}
                        </button>
                      );
                    })}
                  </div>

                  {/* Aisle */}
                  <div className="w-8" />

                  {/* Right side seats */}
                  <div className="flex gap-1">
                    {columns.slice(7).map((col) => {
                      const seatId = `${row}${col}` as SeatId;
                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          className={`h-8 w-8 rounded text-xs font-medium transition-colors ${getSeatClass(
                            seatId
                          )}`}
                        >
                          {seatId}
                        </button>
                      );
                    })}
                  </div>

                  {/* Row label (right) */}
                  <div className="w-8 text-center font-medium text-neutral-400">
                    {row}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Movie Info & Booking */}
          <div className="space-y-6">
            {/* Movie Poster & Info */}
            <div className="rounded-lg bg-neutral-900 p-6 shadow">
              <div className="mb-4 flex gap-4">
                <div className="flex h-28 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-700 via-neutral-600 to-neutral-700 text-center text-xs font-bold text-neutral-100">
                  Central
                  <br />
                  Intelligence
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 text-lg font-bold text-white">
                    Central Intelligence
                  </h2>
                  <div className="mb-1 text-sm text-neutral-400">
                    Cinema XIX
                  </div>
                  <div className="mb-1 flex items-center gap-1 text-sm text-neutral-300">
                    <MapPin size={14} />
                    {theatre ?? "Cinema 1"}, {format ?? "Reguler"},{" "}
                    {studio ?? "Studio 1"}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-neutral-300">
                    <Calendar size={14} />
                    {formattedDay} | {time ?? "-"}
                  </div>
                </div>
              </div>
            </div>

            {/* Time / Selection */}
            <div className="rounded-lg bg-neutral-900 p-6 shadow">
              <div className="mb-4 flex items-center gap-2 text-neutral-200">
                <Clock size={20} />
                <span className="font-medium">{time ?? "-"}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 font-medium text-white">
                    Seat numbers
                  </div>
                  <div className="text-neutral-300">
                    {selectedSeats.length > 0
                      ? selectedSeats.join(", ")
                      : "You haven’t selected any seats"}
                  </div>
                </div>

                <div className="border-t border-neutral-800 pt-4">
                  <div className="mb-2 font-medium text-neutral-200">
                    {selectedSeats.length} seat(s) selected
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 rounded-lg border border-neutral-700 px-4 py-3 text-neutral-200 transition-colors hover:bg-neutral-800"
                    onClick={() => setSelectedSeats([])}
                  >
                    Clear selection
                  </button>
                  <button
                    type="button"
                    className={`flex-1 rounded-lg px-4 py-3 text-white transition-colors ${
                      selectedSeats.length > 0
                        ? "bg-red-700 text-black hover:bg-red-600"
                        : "bg-neutral-700 text-neutral-300 cursor-not-allowed"
                    }`}
                    disabled={selectedSeats.length === 0}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* end right column */}
        </div>
      </div>
    </div>
  );
};

export default MovieTheaterLayout;

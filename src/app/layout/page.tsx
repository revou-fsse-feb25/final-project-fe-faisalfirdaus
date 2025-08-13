"use client";

import React, { useState } from "react";
import { Clock, MapPin, Calendar } from "lucide-react";

const MovieTheaterLayout = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Define seat layout - rows and columns
  const rows = ["K", "J", "H", "G", "F", "E", "D", "C", "B", "A"];
  const columns = Array.from({ length: 14 }, (_, i) => i + 1);

  // Define seat statuses
  const seatStatus = {
    // E8: "booked",
    // D4: "booked",
    // D3: "booked",
    // C3: "booked",
  };

  const handleSeatClick = (seatId) => {
    if (seatStatus[seatId] === "booked") return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatClass = (seatId) => {
    if (seatStatus[seatId] === "booked") {
      return "bg-red-500 text-white cursor-not-allowed";
    }
    if (selectedSeats.includes(seatId)) {
      return "bg-blue-500 text-white cursor-pointer hover:bg-blue-600";
    }
    return "bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300";
  };

  //   const formatTime = (time) => {
  //     return new Date(`2025-08-15T${time}:00`).toLocaleTimeString("id-ID", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });
  //   };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seating Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          {/* Legend */}
          <div className="mb-6 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span>Tersedia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span>Dibooking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Terisi</span>
            </div>
          </div>

          {/* Screen */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-lg py-4 text-center text-gray-600 font-medium">
              Area Layar
              <div className="text-xs mt-1 opacity-75">Cinema XXI</div>
            </div>
          </div>

          {/* Seats */}
          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row} className="flex justify-center items-center gap-2">
                {/* Row label */}
                <div className="w-8 text-center font-medium text-gray-600">
                  {row}
                </div>

                {/* Left side seats */}
                <div className="flex gap-1">
                  {columns.slice(0, 7).map((col) => {
                    const seatId = `${row}${col}`;
                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId)}
                        className={`w-8 h-8 rounded text-xs font-medium transition-colors ${getSeatClass(
                          seatId
                        )}`}
                      >
                        {seatId}
                      </button>
                    );
                  })}
                </div>

                {/* Aisle */}
                <div className="w-8"></div>

                {/* Right side seats */}
                <div className="flex gap-1">
                  {columns.slice(7).map((col) => {
                    const seatId = `${row}${col}`;
                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId)}
                        className={`w-8 h-8 rounded text-xs font-medium transition-colors ${getSeatClass(
                          seatId
                        )}`}
                      >
                        {seatId}
                      </button>
                    );
                  })}
                </div>

                {/* Row label (right side) */}
                <div className="w-8 text-center font-medium text-gray-600">
                  {row}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Movie Info & Booking */}
        <div className="space-y-6">
          {/* Movie Poster & Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-28 bg-gradient-to-br from-orange-400 via-red-500 to-yellow-600 rounded-lg flex items-center text-center justify-center text-white text-xs font-bold">
                Central
                <br />
                Intelligence
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-lg mb-2">Central Intelligence</h2>
                <div className="text-sm text-gray-600 mb-1">Cinema XXI</div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                  <MapPin size={14} />
                  BRAGA XXI Studio 2, Reguler 2D
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar size={14} />
                  Jumat, 15 Agustus 2025, 12:15
                </div>
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} />
              <span className="font-medium">12:15</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-medium mb-2">Nomor kursi</div>
                <div className="text-gray-600">
                  {selectedSeats.length > 0
                    ? selectedSeats.join(", ")
                    : "Kamu belum pilih kursi"}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="font-medium mb-2">
                  {selectedSeats.length} kursi terpilih
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Hapus pilihan
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg text-white transition-colors ${
                    selectedSeats.length > 0
                      ? "bg-gray-800 hover:bg-gray-900"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={selectedSeats.length === 0}
                >
                  Lanjut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTheaterLayout;

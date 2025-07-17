"use client";

import React, { useState } from "react";

// Types
type SeatStatus = "available" | "selected" | "occupied";

interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
}

const CinemaSeatLayout: React.FC = () => {
  // Initialize seats data - matching the image layout
  const initializeSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ["L", "K", "J", "H", "G", "F", "E", "D", "C", "B", "A"];

    rows.forEach((row) => {
      let seatsInRow = 15; // Default seats per row

      // A row has fewer seats (like in the image)
      if (row === "A") {
        seatsInRow = 9;
      }

      for (let seatNum = 1; seatNum <= seatsInRow; seatNum++) {
        // Random occupied seats for demo
        const isOccupied = Math.random() < 0.12;

        seats.push({
          id: `${row}${seatNum}`,
          row,
          number: seatNum,
          status: isOccupied ? "occupied" : "available",
        });
      }
    });

    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(initializeSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat || seat.status === "occupied") return;

    setSeats((prevSeats) =>
      prevSeats.map((s) =>
        s.id === seatId
          ? { ...s, status: s.status === "selected" ? "available" : "selected" }
          : s
      )
    );

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatClassName = (seat: Seat): string => {
    const baseClasses =
      "w-8 h-6 m-0.5 rounded-sm cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-medium border";

    switch (seat.status) {
      case "available":
        return `${baseClasses} bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200`;
      case "selected":
        return `${baseClasses} bg-orange-500 text-white border-orange-600`;
      case "occupied":
        return `${baseClasses} bg-gray-400 text-white border-gray-500 cursor-not-allowed`;
      default:
        return baseClasses;
    }
  };

  const groupSeatsByRow = () => {
    const grouped: { [key: string]: Seat[] } = {};
    seats.forEach((seat) => {
      if (!grouped[seat.row]) {
        grouped[seat.row] = [];
      }
      grouped[seat.row].push(seat);
    });
    return grouped;
  };

  const seatsByRow = groupSeatsByRow();
  const rows = ["L", "K", "J", "H", "G", "F", "E", "D", "C", "B", "A"];

  return (
    <div className="flex">
      {/* Left Panel - Seat Layout */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Legend */}
        <div className="mb-6">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-cyan-100 border border-cyan-200 rounded-sm"></div>
              <span className="text-gray-700">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-400 border border-gray-500 rounded-sm"></div>
              <span className="text-gray-700">Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 border border-orange-600 rounded-sm"></div>
              <span className="text-gray-700">Selected</span>
            </div>
          </div>
        </div>

        {/* Screen Area */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 p-4 rounded-lg text-center">
            <div className="text-gray-600 font-medium text-lg">Screen</div>
          </div>
        </div>

        {/* Seat Layout */}
        <div className="flex flex-col items-center space-y-1">
          {rows.map((row) => (
            <div key={row} className="flex items-center">
              {/* Seats */}
              <div className="flex">
                {seatsByRow[row]?.map((seat, index) => (
                  <div key={seat.id} className="flex">
                    <button
                      onClick={() => handleSeatClick(seat.id)}
                      className={getSeatClassName(seat)}
                      disabled={seat.status === "occupied"}
                      title={`${seat.row}${seat.number}`}
                    >
                      {seat.row}
                      {seat.number}
                    </button>
                    {/* Add spacing for aisle */}
                    {index === 6 && row !== "A" && <div className="w-4"></div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Screen line */}
        <div className="mt-6 flex justify-center">
          <div className="w-4/5 h-1 bg-black rounded-full"></div>
        </div>
      </div>

      {/* Right Panel - Movie Info and Booking */}
      <div className="w-80 bg-white p-6 shadow-lg">
        {/* Movie Poster and Info */}
        <div className="mb-6">
          <div className="w-24 h-32 bg-gradient-to-br from-red-900 to-black rounded-lg mb-4 flex items-center justify-center">
            <div className="text-white text-xs text-center font-bold">
              MOVIE
              <br />
              POSTER
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">Movie Title</h2>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>Cinema XXI</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>BASSURA XXI Studio 2, Regular 2D</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>Kamis, 17 Juli 2025, 13:00</span>
            </div>
          </div>
        </div>

        {/* Time Display */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
            </div>
            <span>13:00</span>
          </div>
        </div>

        {/* Seat Selection Info */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Nomor kursi</h3>
          <p className="text-gray-600 text-sm">Kamu belum pilih kursi</p>
        </div>

        {/* Selected Seats */}
        {selectedSeats.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              {selectedSeats.length} kursi terpilih
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seatId) => (
                <div
                  key={seatId}
                  className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm"
                >
                  {seatId}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Hapus pilihan
          </button>
          <button
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              selectedSeats.length > 0
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={selectedSeats.length === 0}
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

export default CinemaSeatLayout;

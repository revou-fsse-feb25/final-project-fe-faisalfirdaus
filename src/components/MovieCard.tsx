import React from "react";

const MovieCard = () => {
  return (
    <div className="w-[260px] mx-auto bg-gray-900 rounded-lg overflow-hidden outline-gray-700 outline-1 shadow-2xl transform hover:scale-105 transition-transform duration-300">
      {/* Movie Poster */}
      <div className="relative">
        <img
          src="https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg"
          alt="Movie Poster"
          className="w-full h-[270px] object-cover"
        />
      </div>

      {/* Movie Details */}
      <div className="px-6 pb-6 pt-3 space-y-2">
        {/* Title (repeated for accessibility) */}
        <div>
          <h2 className="text-white text-[16px] font-bold">Wood</h2>
          <div className="flex items-center space-x-2 text-gray-400 text-[12px]">
            <span>Horror</span>
            <span>•</span>
            <span>Thriller</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex text-[12px] space-x-3">
          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-[5] transition-colors duration-200">
            Book
          </button>
          <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-3 rounded-[5] border border-gray-600 transition-colors duration-200">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

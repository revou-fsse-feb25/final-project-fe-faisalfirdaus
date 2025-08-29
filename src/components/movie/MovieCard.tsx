"use client";

import React from "react";
import { useRouter } from "next/navigation";

type MovieCardProps = {
  id: number;
  title: string;
  duration: number;
  image: string;
};

const MovieCard = (props: MovieCardProps) => {
  const router = useRouter();
  return (
    <div className="w-[260px] mx-auto bg-gray-900 rounded-lg overflow-hidden outline-gray-700 outline-1 shadow-2xl transform hover:scale-105 transition-transform duration-300">
      {/* Movie Poster */}
      <div className="relative">
        <img
          src={props.image}
          alt="Movie Poster"
          className="w-full h-[270px] object-cover"
        />
      </div>

      {/* Movie Details */}
      <div className="px-6 pb-6 pt-3 space-y-2">
        {/* Title (repeated for accessibility) */}
        <div>
          <h2 className="text-white text-[16px] font-bold">{props.title}</h2>
          <div className="flex items-center space-x-2 text-gray-400 text-[12px]">
            <span>{props.duration} minutes</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex text-[12px] space-x-3">
          <button
            onClick={() => {
              router.push(`/movies/${props.id}`);
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-[5] transition-colors duration-200"
          >
            Book
          </button>
          <button
            onClick={() => {
              router.push(`/movies/${props.id}`);
            }}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-3 rounded-[5] border border-gray-600 transition-colors duration-200"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

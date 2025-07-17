import React from "react";
import MovieCard from "./MovieCard";

const MovieSection = ({ title }: { title: string }) => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="py-[20px] px-[0]">
        <div className="flex justify-between items-end mb-[12px] text-white">
          <h2 className="text-[24px] font-medium">{title}</h2>
          <a href="" className="text-[16px] font-normal hover:underline">
            See all movies
          </a>
        </div>
        <div className="flex flex-wrap justify-between ">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </div>
    </div>
  );
};

export default MovieSection;

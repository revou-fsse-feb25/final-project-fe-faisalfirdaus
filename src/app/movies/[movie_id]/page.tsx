// import React from "react";

// const MovieId = () => {
//   return <div>MovieId</div>;
// };

// export default MovieId;

import Schedule from "@/components/movie/Schedule";
import Navbar from "@/components/Navbar";

const DEFAULT_API =
  "https://final-project-be-faisalfirdaus-production.up.railway.app";

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  DEFAULT_API;

async function getMovieData(movie_id: string | number) {
  const url = new URL(`/movies/${movie_id}`, API).toString();

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Failed to fetch movie data (HTTP ${res.status})`);
  }

  const json = await res.json();
  return json?.data ?? json;
}

export default async function MovieAllInfo({
  params,
}: {
  params: Promise<{ movie_id: string }>;
}) {
  const { movie_id } = await params;

  const movie = await getMovieData(movie_id);
  if (!movie) return <div>No movie data found</div>;

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#f3f4f6]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* top divider */}
        <div className="mb-8 border-b border-[#2a2b31] pb-2" />

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Poster */}
          <div className="w-full md:w-1/3">
            <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl bg-[#1a1b1f] ring-1 ring-inset ring-[#2a2b31] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {movie.title}
            </h1>

            <div className="mt-4 grid gap-2 text-[15px]">
              <p>
                <span className="font-semibold text-[#e5e7eb]">Duration:</span>{" "}
                <span className="text-[#c9cbd3]">
                  {movie.duration_minutes} minutes
                </span>
              </p>
              <p>
                <span className="font-semibold text-[#e5e7eb]">Status:</span>{" "}
                <span className="text-[#c9cbd3]">
                  {String(movie.status).replace(/_/g, " ")}
                </span>
              </p>

              {/* Genres as dark chips */}
              {movie.genres?.length ? (
                <div className="pt-2 flex flex-wrap gap-2">
                  {movie.genres.map((g: any, i: number) => {
                    const name = typeof g === "string" ? g : g?.name;
                    if (!name) return null;
                    return (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md border border-[#34353c] bg-[#232429] px-2.5 py-1 text-xs font-medium text-[#e6e7ee]"
                      >
                        {name}
                      </span>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {/* Synopsis */}
            {movie.description && (
              <div className="mt-6 rounded-xl bg-[#141519] ring-1 ring-inset ring-[#22232a] p-4">
                <h2 className="text-lg font-semibold mb-2">Synopsis</h2>
                <p className="leading-7 text-[#c9cbd3] whitespace-pre-line">
                  {movie.description}
                </p>
              </div>
            )}
          </div>
        </div>
        <Schedule movieId={movie_id} />
      </div>
    </div>
  );
}

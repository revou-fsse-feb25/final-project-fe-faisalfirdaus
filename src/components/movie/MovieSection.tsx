import React, { useEffect, useMemo, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import Link from "next/link";

export type MovieStatus = "COMING_SOON" | "NOW_SHOWING" | "ARCHIVED";

export interface MoviesListResponseDto {
  items: Array<{
    movie_id: number;
    title: string;
    description?: string;
    duration_minutes: number;
    poster_url: string;
    status: MovieStatus | string;
    is_active?: boolean;
  }>;
  nextCursor?: string | null;
}

const CARD_WIDTH = 260; // must match your MovieCard width in carousel/grid
const GAP = 16; // px between items (matches gap-4)

type MovieSectionProps = { title: string }; // title expected to be a MovieStatus value for the query

const MovieSection: React.FC<MovieSectionProps> = ({ title }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fitsAll, setFitsAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [movieList, setMovieList] = useState<MoviesListResponseDto["items"]>(
    []
  );

  // total width needed to fit ALL cards on one row
  const requiredWidth = useMemo(() => {
    const n = movieList.length;
    if (n === 0) return 0;
    return CARD_WIDTH * n + GAP * (n - 1);
  }, [movieList.length]);

  useEffect(() => {
    const ac = new AbortController();
    const fetchMovies = async () => {
      setIsLoading(true);
      setErr(null);
      try {
        const res = await fetch(
          `https://final-project-be-faisalfirdaus-production.up.railway.app/movies?status=${encodeURIComponent(
            title
          )}`,
          { signal: ac.signal, headers: { "Content-Type": "application/json" } }
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data: MoviesListResponseDto = await res.json();
        setMovieList(Array.isArray(data.items) ? data.items : []);
      } catch (e: any) {
        if (e?.name !== "AbortError") setErr(e?.message || "Failed to load");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    return () => ac.abort();
  }, [title]);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const update = () => setFitsAll(el.clientWidth >= requiredWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [requiredWidth]);

  return (
    <section ref={containerRef} className="w-[90%] mx-auto">
      <div className="py-5">
        <header className="flex justify-between items-end mb-3 text-white">
          <h2 className="text-[24px] font-medium">{title}</h2>
          <Link
            href="/movies"
            className="text-[16px] font-normal hover:underline"
          >
            See all movies
          </Link>
        </header>

        {isLoading && (
          <div className="text-sm text-gray-300">Loading movies…</div>
        )}
        {err && (
          <div className="text-sm text-red-400">
            Couldn&apos;t load movies: {err}
          </div>
        )}
        {!isLoading && !err && movieList.length === 0 && (
          <div className="text-sm text-gray-300">No movies found.</div>
        )}

        {/* If ALL cards fit, show a single-row grid (no wrapping). */}
        {!isLoading && !err && movieList.length > 0 && fitsAll && (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${movieList.length}, ${CARD_WIDTH}px)`,
            }}
          >
            {movieList.map((m) => (
              <MovieCard
                id={m.movie_id}
                key={m.movie_id}
                title={m.title}
                duration={m.duration_minutes} // adjust prop name if MovieCard expects something else
                image={m.poster_url}
              />
            ))}
          </div>
        )}

        {/* Otherwise, use a horizontal carousel (no wrapping). */}
        {!isLoading && !err && movieList.length > 0 && !fitsAll && (
          <div className="relative">
            <div
              className="
                flex gap-4 overflow-x-auto px-1 pb-2
                snap-x snap-mandatory
                scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
              "
              style={{ WebkitOverflowScrolling: "touch" as any }}
            >
              {movieList.map((m) => (
                <div
                  key={m.movie_id}
                  className="snap-start shrink-0"
                  style={{ width: CARD_WIDTH }}
                >
                  <MovieCard
                    id={m.movie_id}
                    title={m.title}
                    duration={m.duration_minutes}
                    image={m.poster_url}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieSection;

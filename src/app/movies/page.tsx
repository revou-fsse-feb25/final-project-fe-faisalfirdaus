import React from "react";

const movies = () => {
  return <div>movies</div>;
};

export default movies;

// "use client";

// import Link from "next/link";
// import { z } from "zod";
// import { ZMoviesList } from "@/lib/zod-schemas";
// import MovieCard from "@/components/movie/MovieCard";
// import MoviesFilters from "@/components/movie/filters";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { MoviesListResponseDto } from "@/lib/types";

// type SearchParams = Record<string, string | string[] | undefined> | undefined;

// function withQuery(
//   path: string,
//   query?: Record<string, string | number | boolean | undefined>
// ) {
//   if (!query) return path;
//   const usp = new URLSearchParams();
//   for (const [k, v] of Object.entries(query)) {
//     if (v === undefined) continue;
//     usp.set(k, String(v));
//   }
//   const qs = usp.toString();
//   return qs ? `${path}?${qs}` : path;
// }

// interface Props {
//   // On newer Next.js, searchParams may be a Promise in server components
//   searchParams: Promise<SearchParams> | SearchParams;
// }

// export default async function MoviesPage({ searchParams }: Props) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [err, setErr] = useState<string | null>(null);
//   const [movieList, setMovieList] = useState<MoviesListResponseDto["items"]>(
//     []
//   );
//   const sp = (await searchParams) ?? {};

//   const status = typeof sp.status === "string" ? sp.status : "";
//   const q = typeof sp.q === "string" ? sp.q : "";
//   const isActive = typeof sp.isActive === "string" ? sp.isActive : undefined;
//   const genreId = typeof sp.genreId === "string" ? sp.genreId : undefined;
//   const limit = typeof sp.limit === "string" ? sp.limit : undefined;
//   const cursor = typeof sp.cursor === "string" ? sp.cursor : undefined;

//   const path = withQuery("/movies", {
//     status,
//     q,
//     isActive,
//     genreId,
//     limit,
//     cursor,
//   });
//   const url = `https://final-project-be-faisalfirdaus-production.up.railway.app/${path}`;

//   let parsed = { items: [], nextCursor: null } as z.infer<typeof ZMoviesList>;

//   useEffect(() => {
//     const ac = new AbortController();
//     const fetchMovies = async () => {
//       setIsLoading(true);
//       setErr(null);
//       try {
//         const res = await fetch(url);
//         if (!res.ok) throw new Error(`API error: ${res.status}`);
//         const data: MoviesListResponseDto = await res.json();
//         setMovieList(Array.isArray(data.items) ? data.items : []);
//         console.log(movieList);
//       } catch (e: any) {
//         if (e?.name !== "AbortError") setErr(e?.message || "Failed to load");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMovies();
//     return () => ac.abort();
//   }, []);

//   try {
//     const res = await fetch(
//       `https://final-project-be-faisalfirdaus-production.up.railway.app/${path}`
//     );
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     console.log(res);
//     const json = await res.json();
//     parsed = ZMoviesList.parse(json);
//   } catch {
//     // keep empty state
//   }

//   // keep base params for pagination links
//   const baseParams = new URLSearchParams();
//   if (status) baseParams.set("status", status);
//   if (q) baseParams.set("q", q);
//   if (isActive) baseParams.set("isActive", isActive);
//   if (genreId) baseParams.set("genreId", genreId);
//   if (limit) baseParams.set("limit", limit);

//   return (
//     <section className="space-y-6">
//       <div className="flex items-end justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold">All Movies</h1>
//           <p className="text-muted-foreground">
//             Browse and search available titles.
//           </p>
//         </div>
//         <MoviesFilters initial={{ q, status }} />
//       </div>

//       {parsed.items.length === 0 ? (
//         <div className="text-sm text-muted-foreground">No movies found.</div>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {parsed.items.map((m) => (
//             <MovieCard
//               key={m.movie_id}
//               id={m.movie_id}
//               title={m.title}
//               duration={m.duration_minutes}
//               image={m.poster_url}
//             />
//           ))}
//         </div>
//       )}

//       {parsed.nextCursor && (
//         <Link
//           href={`/movies?${new URLSearchParams({
//             ...Object.fromEntries(baseParams),
//             cursor: parsed.nextCursor,
//           }).toString()}`}
//           className="inline-block text-sm underline"
//         >
//           Load more
//         </Link>
//       )}
//     </section>
//   );
// }

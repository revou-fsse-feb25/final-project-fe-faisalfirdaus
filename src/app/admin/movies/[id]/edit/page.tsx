import React from "react";

const MoviesEdit = () => {
  return <div>MoviesEdit</div>;
};

export default MoviesEdit;

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { toast } from "sonner";
// import MovieForm from "@/components/forms/MovieForm";

// const DEFAULT_API =
//   "https://final-project-be-faisalfirdaus-production.up.railway.app";
// const API =
//   process.env.NEXT_PUBLIC_API_BASE_URL ||
//   process.env.API_BASE_URL ||
//   DEFAULT_API;

// type MovieDetailResponseDto = {
//   movie_id: number;
//   title: string;
//   description: string;
//   duration_minutes: number;
//   poster_url: string;
//   status: "COMING_SOON" | "NOW_SHOWING" | "ARCHIVED" | string;
//   is_active: boolean;
//   genres?: Array<{ genre_id: number; name: string }> | string[];
// };

// export default function AdminMovieEditPage() {
//   const { id } = useParams() as { id: string };
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [movie, setMovie] = useState<MovieDetailResponseDto | null>(null);

//   // optional: read token if you store it in localStorage
//   const token = useMemo(() => {
//     if (typeof window === "undefined") return null;
//     return localStorage.getItem("access_token");
//   }, []);

//   // fetch movie by id
//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       try {
//         setLoading(true);
//         const url = new URL(`/movies/${id}`, API).toString();
//         const res = await fetch(url, {
//           cache: "no-store",
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });
//         if (!res.ok) throw new Error(await res.text());
//         const json = await res.json();
//         const data: MovieDetailResponseDto = json?.data ?? json;
//         if (!cancelled) {
//           setMovie(data);
//           setError(null);
//         }
//       } catch (e: any) {
//         if (!cancelled) setError(String(e?.message || "Failed to load movie"));
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, [id, token]);

//   async function handleSubmit(values: {
//     title: string;
//     description: string;
//     duration_minutes: number;
//     poster_url: string;
//     status: "COMING_SOON" | "NOW_SHOWING" | "ARCHIVED";
//     is_active: boolean;
//   }) {
//     try {
//       setSubmitting(true);
//       const url = new URL(`/movies/${id}`, API).toString();
//       const res = await fetch(url, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify(values),
//       });
//       if (!res.ok) throw new Error(await res.text());
//       toast.success("Movie updated");
//       router.replace(`/admin/movies`); // or navigate back to detail page
//     } catch (e: any) {
//       toast.error("Update failed", {
//         description: String(e?.message || "Could not save changes"),
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   function handleCancel() {
//     router.back();
//   }

//   return (
//     <div className="mx-auto w-full max-w-3xl">
//       <h2 className="mb-4 text-xl font-bold">Edit Movie</h2>

//       {loading && (
//         <div className="rounded-md border p-4 text-sm text-muted-foreground">
//           Loading…
//         </div>
//       )}

//       {error && !loading && (
//         <div className="rounded-md border border-red-800 bg-red-950/30 p-4 text-sm text-red-200">
//           {error}
//         </div>
//       )}

//       {!loading && movie && (
//         <MovieForm
//           defaultValues={{
//             title: movie.title,
//             description: movie.description ?? "",
//             duration_minutes: movie.duration_minutes, // can be string/number; form resolver coerces
//             poster_url: movie.poster_url,
//             status: (
//               ["COMING_SOON", "NOW_SHOWING", "ARCHIVED"] as const
//             ).includes(movie.status as any)
//               ? (movie.status as any)
//               : "COMING_SOON",
//             is_active: movie.is_active,
//           }}
//           onSubmit={handleSubmit}
//           onCancel={handleCancel}
//           submitting={submitting}
//         />
//       )}
//     </div>
//   );
// }

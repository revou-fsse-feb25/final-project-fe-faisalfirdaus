import React from "react";

const MovieById = () => {
  return <div>MovieById</div>;
};

export default MovieById;

// "use client";

// import { useMovieDetail } from "@/hooks/useMovie";
// import { useParams } from "next/navigation";

// export default function AdminMovieDetailPage() {
//   const { id } = useParams() as { id: string };
//   const { data, isLoading, error } = useMovieDetail(Number(id));

//   if (isLoading) return <Box>Loading…</Box>;
//   if (error || !data) return <Box>Not found.</Box>;

//   return (
//     <div className="space-y-4">
//       <Box>
//         <h2 className="text-xl font-bold">{data.title}</h2>
//         <div className="mt-2 text-sm text-neutral-300">{data.description}</div>
//       </Box>

//       <Box>
//         <h3 className="mb-2 font-semibold">Genres</h3>
//         <div className="flex flex-wrap gap-2">
//           {data.genres.map((g) => (
//             <span
//               key={g.genre_id}
//               className="rounded border border-neutral-700 px-2 py-0.5 text-xs"
//             >
//               {g.name}
//             </span>
//           ))}
//         </div>
//       </Box>
//     </div>
//   );
// }

// function Box({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
//       {children}
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMoviesList } from "@/hooks/useMovie";
// ✅ useMoviesList is the exported list hook in your file
// import { useMoviesList } from "@/hooks/useMovies";

export default function AdminMoviesListPage() {
  const { data, isLoading, error } = useMoviesList({ limit: 50 });

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Movies</h2>
        <Button asChild size="sm">
          <Link href="/admin/movies/new">New Movie</Link>
        </Button>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900">
        <div className="grid grid-cols-12 gap-3 border-b border-neutral-800 px-4 py-2 text-sm text-neutral-300">
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Duration</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        <div className="divide-y divide-neutral-800">
          {isLoading && <RowSkeleton />}
          {error && (
            <div className="px-4 py-3 text-sm text-red-400">
              Failed to load.
            </div>
          )}
          {data?.items?.map((m) => (
            <div
              key={m.movie_id}
              className="grid grid-cols-12 items-center gap-3 px-4 py-3"
            >
              <div className="col-span-5">{m.title}</div>
              <div className="col-span-2">{String(m.status)}</div>
              <div className="col-span-2">{m.duration_minutes}m</div>
              <div className="col-span-3 flex justify-end gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/movies/${m.movie_id}`}>Detail</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/admin/movies/${m.movie_id}/edit`}>Edit</Link>
                </Button>
              </div>
            </div>
          ))}
          {!isLoading && !error && !data?.items?.length && (
            <div className="px-4 py-6 text-center text-sm text-neutral-400">
              No movies.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RowSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid grid-cols-12 gap-3 px-4 py-3">
          <div className="col-span-5 h-4 rounded bg-neutral-800" />
          <div className="col-span-2 h-4 rounded bg-neutral-800" />
          <div className="col-span-2 h-4 rounded bg-neutral-800" />
          <div className="col-span-3 h-8 rounded bg-neutral-800" />
        </div>
      ))}
    </>
  );
}

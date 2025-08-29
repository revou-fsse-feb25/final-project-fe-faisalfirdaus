"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function MoviesFilters({
  initial,
}: {
  initial: { q: string; status: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(initial.q);
  const [status, setStatus] = useState(initial.status);
  const [isPending, startTransition] = useTransition();

  function apply() {
    const params = new URLSearchParams(searchParams?.toString());
    if (q) params.set("q", q);
    else params.delete("q");
    if (status) params.set("status", status);
    else params.delete("status");
    params.delete("cursor");
    startTransition(() => router.replace(`/movies?${params.toString()}`));
  }

  return (
    <div className="flex items-center gap-2">
      <input
        className="h-9 w-56 px-3 rounded border bg-background"
        placeholder="Search title..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && apply()}
      />
      <select
        className="h-9 px-2 rounded border bg-background"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All statuses</option>
        <option value="NOW_SHOWING">Now Showing</option>
        <option value="COMING_SOON">Coming Soon</option>
        <option value="ARCHIVED">Archived</option>
      </select>
      <button
        className="h-9 px-3 rounded bg-primary text-primary-foreground disabled:opacity-50"
        onClick={apply}
        disabled={isPending}
      >
        {isPending ? "Applying..." : "Apply"}
      </button>
    </div>
  );
}

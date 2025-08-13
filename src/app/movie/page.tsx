// app/movies/[slug]/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Schedule from "@/components/movie/Schedule";

type Movie = {
  title: string;
  hero: string;
  description: string;
  genres: string[];
  customersAlsoWatched: Array<{ title: string; image: string; tag?: string }>;
};

const IMAGE_URL =
  "https://weliveentertainment.com/wp-content/uploads/2016/06/Screen-Shot-2016-06-12-at-5.47.03-PM.png";

const MOCK_MOVIE: Movie = {
  title: "Central Intelligence",
  hero: IMAGE_URL,
  description:
    "A mild-mannered accountant is lured into the world of international espionage when an old high school friend suddenly reappears.",
  genres: ["Action", "Comedy"],
  customersAlsoWatched: [
    { title: "Ride Along", image: IMAGE_URL },
    { title: "War of the Worlds", image: IMAGE_URL, tag: "NEW MOVIE" },
    { title: "Jackpot!", image: IMAGE_URL },
    { title: "Countdown", image: IMAGE_URL, tag: "NEW EPISODE" },
    { title: "Fast & Furious 8", image: IMAGE_URL },
  ],
};

export default function MoviePage({ params }: { params: { slug: string } }) {
  const movie = useMemo(() => MOCK_MOVIE, []);
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero movie={movie} />
      <MovieContent movie={movie} />
      <div className="h-10" />
    </main>
  );
}

/* ----------------------------- HERO ----------------------------- */

function Hero({ movie }: { movie: Movie }) {
  const router = useRouter();
  return (
    <section className="relative h-[88vh] min-h-[520px] w-full overflow-hidden">
      <img
        src={movie.hero}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 md:h-28 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute inset-0 z-10 flex flex-col gap-4 md:items-start md:justify-center md:text-left md:pl-[6%] max-md:items-center max-md:justify-end max-md:text-center max-md:px-6 max-md:pb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
          {movie.title}
        </h1>
        <div className="flex items-center gap-3 max-md:flex-wrap max-md:justify-center">
          {/* <PrimaryPill onClick={() => router.push("/watch")}>
            Watch with Prime
          </PrimaryPill>
          <GhostPill onClick={() => router.push("/trailer")}>
            Watch trailer
          </GhostPill>
          <GhostPill>Watchlist</GhostPill>
          <GhostPill>Like</GhostPill>
          <GhostPill>Not for me</GhostPill>
          <GhostPill>Share</GhostPill> */}
        </div>
        {/* <div className="mt-1 text-sm text-gray-300 opacity-90">
          <span className="mr-2">👑</span>Watch with a Prime membership
        </div> */}
      </div>
    </section>
  );
}

/* --------------------------- CONTENT (TABS) --------------------------- */

function MovieContent({ movie }: { movie: Movie }) {
  const [active, setActive] = useState<"Jadwal" | "Detail">("Jadwal");

  const navRef = useRef<HTMLUListElement | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({
    Jadwal: null,
    Detail: null,
  });
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  const updateIndicator = () => {
    const btn = btnRefs.current[active];
    const nav = navRef.current;
    const ind = indicatorRef.current;
    if (!btn || !nav || !ind) return;
    const { left: navLeft } = nav.getBoundingClientRect();
    const { left, width } = btn.getBoundingClientRect();
    ind.style.width = `${Math.round(width)}px`;
    ind.style.transform = `translateX(${Math.round(left - navLeft)}px)`;
  };

  useEffect(() => {
    updateIndicator();
    const onResize = () => updateIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div
      data-testid="movie-content"
      className="mx-auto w-[92%] max-w-7xl"
      style={{ marginTop: 24 }}
    >
      <div className="flex flex-row">
        <ul
          ref={navRef}
          className="relative flex items-center gap-6 text-gray-300"
          aria-label="Movie tabs"
        >
          <li data-testid="tab-button">
            <button
              ref={(el): void => {
                btnRefs.current.Jadwal = el;
              }}
              className={`pb-2 font-medium ${
                active === "Jadwal" ? "text-white" : "hover:text-white/90"
              }`}
              onClick={() => setActive("Jadwal")}
              role="tab"
              aria-selected={active === "Jadwal"}
            >
              Jadwal
            </button>
          </li>
          <li data-testid="tab-button">
            <button
              ref={(el): void => {
                btnRefs.current.Detail = el;
              }}
              className={`pb-2 font-medium ${
                active === "Detail" ? "text-white" : "hover:text-white/90"
              }`}
              onClick={() => setActive("Detail")}
              role="tab"
              aria-selected={active === "Detail"}
            >
              Detail
            </button>
          </li>
          <span
            ref={indicatorRef}
            className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-[transform,width] duration-300 ease-out"
            aria-hidden="true"
          />
        </ul>
      </div>

      <div className="mt-6 h-px w-full bg-white/10" />

      <section className="mt-4">
        {active === "Jadwal" ? <Schedule /> : <DetailPane />}
      </section>
    </div>
  );
}

/* ------------------------- DETAIL PANE (NEW) ------------------------- */

function DetailPane() {
  const sinopsis =
    "Calvin Joyner was voted in high school the guy most likely to succeed. 20 years later he's an accountant. As his high school reunion approaches, he tries to make contact with his old schoolmates. And someone named Bob Stone contacts him. He says that he was known as Robbie Weirdicht in school. Calvin remembers that he was picked on, as a matter of fact after an extremely nasty prank he left school.";

  const produser = ["Akifumi Fujio", "Masanori Miyake", "Yuma Takahashi"];
  const sutradara = "Haruo Sotozaki";
  const penulis = "Koyoharu Gotouge";
  const production = ["Aniplex", "Crunchyroll", "Sony Pictures"];

  const casts = [
    "Natsuki Hanae",
    "Reina Ueda",
    "Saori Hayami",
    "Yoshitsugu Matsuoka",
    "Hiro Shimono",
    "Akari Kito",
  ];

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div data-testid="movie-text" className="movie-text space-y-2">
      <h3 className="text-white text-lg font-semibold">{title}</h3>
      <div className="text-white/80 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <div data-testid="movie-content-detail" className="tab-pane space-y-6">
      <Section title="Sinopsis">{sinopsis}</Section>
      <Section title="Produser">{produser.join(", ")}</Section>
      <Section title="Sutradara">{sutradara}</Section>
      <Section title="Penulis">{penulis}</Section>
      <Section title="Production">{production.join(", ")}</Section>

      {/* Pemeran */}
      <div className="movie-cast" data-testid="movie-cast">
        <div data-testid="section-title" className="mb-3">
          <span className="text-white/90">
            <h3 className="text-lg font-semibold">Pemeran</h3>
          </span>
        </div>

        <div
          className="
            grid gap-4
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
          "
          style={{ gridTemplateColumns: undefined }}
        >
          {casts.map((name) => (
            <div key={name} className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <span
                data-testid="avatar-placeholder"
                className="flex items-center justify-center rounded-full text-black font-semibold"
                style={{
                  height: 80,
                  width: 80,
                  fontSize: 14,
                  backgroundColor: "rgb(156 163 175)", // gray-400
                }}
              >
                {initials(name)}
              </span>
              <div>
                <h4 title={name} className="text-white">
                  {name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------- ROW & POSTER CARD -------------------------- */

function Row({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  return (
    <section className="mt-6">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
      </header>
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-1 pb-2 snap-x snap-mandatory
                   scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
      >
        {children}
      </div>
    </section>
  );
}

function PosterCard({
  title,
  image,
  tag,
}: {
  title: string;
  image: string;
  tag?: string;
}) {
  return (
    <div className="snap-start shrink-0 w-[260px]">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-white/10 bg-zinc-900">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        {tag && (
          <span className="absolute right-2 top-2 rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-black">
            {tag}
          </span>
        )}
        <div className="absolute left-2 bottom-2 text-yellow-400 text-sm">
          👑
        </div>
      </div>
      <p className="mt-2 truncate text-sm text-white/90">{title}</p>
    </div>
  );
}

/* ------------------------------- BUTTONS ------------------------------- */

function PrimaryPill({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-black hover:bg-white"
    >
      {children}
    </button>
  );
}

function GhostPill({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15"
    >
      {children}
    </button>
  );
}

import React, { useEffect, useMemo, useRef, useState } from "react";
import MovieCard from "./MovieCard";

const movieData = [
  {
    title: "Wood",
    genre: ["Horror", "Thriller"],
    image:
      "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
  },
  {
    title: "Wood",
    genre: ["Horror", "Thriller"],
    image:
      "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
  },
  {
    title: "Wood",
    genre: ["Horror", "Thriller"],
    image:
      "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
  },
  {
    title: "Wood",
    genre: ["Horror", "Thriller"],
    image:
      "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
  },
  {
    title: "Wood",
    genre: ["Horror", "Thriller"],
    image:
      "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
  },
  {
    title: "Wood",
    genre: ["Horror", "Thriller"],
    image:
      "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
  },
  {
    title: "Wood",
    genre: ["Horror", "Thriller"],
    image:
      "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
  },
];

const CARD_WIDTH = 260; // must match your MovieCard width in carousel/grid
const GAP = 16; // px between items (matches gap-4)

type MovieSectionProps = { title: string };

const MovieSection: React.FC<MovieSectionProps> = ({ title }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fitsAll, setFitsAll] = useState(false);

  // total width needed to fit ALL cards on one row
  const requiredWidth = useMemo(() => {
    const n = movieData.length;
    if (n === 0) return 0;
    return CARD_WIDTH * n + GAP * (n - 1);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const update = () => {
      const width = el.clientWidth;
      setFitsAll(width >= requiredWidth);
    };

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
          <a href="#" className="text-[16px] font-normal hover:underline">
            See all movies
          </a>
        </header>

        {/* If ALL cards fit, show a single-row grid (no wrapping). */}
        {fitsAll && (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${movieData.length}, ${CARD_WIDTH}px)`,
            }}
          >
            {movieData.map((m, i) => (
              <MovieCard
                key={i}
                title={m.title}
                genre={m.genre}
                image={m.image}
              />
            ))}
          </div>
        )}

        {/* Otherwise, use a horizontal carousel (no wrapping). */}
        {!fitsAll && (
          <div className="relative">
            <div
              className="
                flex gap-4 overflow-x-auto px-1 pb-2
                snap-x snap-mandatory
                scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
              "
              style={{ WebkitOverflowScrolling: "touch" as any }}
            >
              {movieData.map((m, i) => (
                <div
                  key={i}
                  className="snap-start shrink-0"
                  style={{ width: CARD_WIDTH }}
                >
                  <MovieCard title={m.title} genre={m.genre} image={m.image} />
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

// import React from "react";
// import MovieCard from "./MovieCard";

// const movieData = [
//   {
//     title: "Wood",
//     genre: ["Horror", "Thriller"],
//     image:
//       "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
//   },
//   {
//     title: "Wood",
//     genre: ["Horror", "Thriller"],
//     image:
//       "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
//   },
//   {
//     title: "Wood",
//     genre: ["Horror", "Thriller"],
//     image:
//       "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
//   },
//   {
//     title: "Wood",
//     genre: ["Horror", "Thriller"],
//     image:
//       "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
//   },
// ];

// const MovieSection = ({ title }: { title: string }) => {
//   return (
//     <div className="w-[90%] mx-auto">
//       <div className="py-[20px] px-[0]">
//         <div className="flex justify-between items-end mb-[12px] text-white">
//           <h2 className="text-[24px] font-medium">{title}</h2>
//           <a href="" className="text-[16px] font-normal hover:underline">
//             See all movies
//           </a>
//         </div>
//         <div className="flex flex-wrap justify-between ">
//           {movieData.map((movie, index) => (
//             <MovieCard
//               key={index}
//               title={movie.title}
//               genre={movie.genre}
//               image={movie.image}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieSection;

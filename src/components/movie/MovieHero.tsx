import React from "react";

type MovieHeroProps = {
  title: string;
  heroUrl: string;
};

const MovieHero: React.FC<MovieHeroProps> = ({ title, heroUrl }) => {
  return (
    <section className="relative h-[88vh] min-h-[520px] w-full overflow-hidden">
      <img
        src={heroUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 md:h-28 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute inset-0 z-10 flex flex-col gap-4 md:items-start md:justify-center md:text-left md:pl-[6%] max-md:items-center max-md:justify-end max-md:text-center max-md:px-6 max-md:pb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default MovieHero;

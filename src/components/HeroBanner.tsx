"use client";

import { useRouter } from "next/navigation";

const HeroBanner = () => {
  const router = useRouter();
  return (
    <div className="hero relative">
      <div className="hero-cover relative h-[90vh]">
        <img
          src="https://image.idntimes.com/post/20230428/kimetsu-no-yaiba-ch162-cd8f633b9d261c5a8d597d09aeb5feda.jpg"
          alt=""
          className="hero-banner w-full h-full object-cover"
        />
        <div className="absolute h-full inset-0 z-1 bg-gradient-to-r from-black via-black/25 to-transparent" />
        <div className="absolute h-full inset-0 z-1 bg-gradient-to-t from-black via-black/0 to-transparent" />
      </div>
      <div className="hero-caption absolute pl-[6%] inset-0 flex flex-col gap-3 justify-center z-10">
        <h1 className="title text-white text-4xl md:text-5xl font-bold">
          Kimetsu no Yaiba
        </h1>
        <div className="flex items-center space-x-2 text-gray-400 text-m">
          <span>Horror</span>
          <span>•</span>
          <span>Action</span>
        </div>
        <p className="description text-gray-300 font-light text-red text-m max-w-[450px]">
          A family is attacked by demons and only two members survive - Tanjiro
          and his sister Nezuko, who is turning into a demon slowly. Tanjiro
          sets out to become a demon slayer to avenge his family and cure his
          sister.
        </p>
        <div className="flex text-[12px] space-x-3 max-w-[450px]">
          <button
            onClick={() => router.push("/movies")}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-[5] transition-colors duration-200 cursor-pointer"
          >
            Book
          </button>
          <button
            onClick={() => router.push("/movies")}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-3 rounded-[5] border border-gray-600 transition-colors duration-200 cursor-pointer"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

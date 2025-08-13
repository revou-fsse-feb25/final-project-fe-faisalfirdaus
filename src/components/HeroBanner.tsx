"use client";

import { useRouter } from "next/navigation";

type HeroBannerProps = {
  title: string;
  image: string;
  description: string;
  genres: string[];
};

const HeroBanner = (banner: HeroBannerProps) => {
  const router = useRouter();
  return (
    <div className="hero relative">
      {/* Image */}
      <div className="hero-cover relative h-[90vh]">
        <img
          src={banner.image}
          alt={banner.title}
          className="hero-banner w-full h-full object-cover"
        />
        {/* Right-side black gradient — hidden on mobile */}
        <div className="absolute inset-0 z-1 bg-gradient-to-r from-black via-black/25 to-transparent hidden md:block" />
        {/* Bottom black gradient stays on all sizes */}
        <div className="absolute inset-0 z-1 bg-gradient-to-t from-black via-black/0 to-transparent" />
      </div>

      {/* Caption */}
      <div
        className="
          hero-caption absolute inset-0 z-10
          flex flex-col gap-3
          md:justify-center md:items-start md:text-left md:pl-[6%]
          text-white
          max-md:justify-end max-md:items-center max-md:text-center max-md:pb-8 max-md:px-6
        "
      >
        <h1 className="title text-3xl sm:text-4xl md:text-5xl font-bold">
          {banner.title}
        </h1>

        <div className="flex items-center space-x-2 text-gray-400 text-sm md:text-base max-md:justify-center">
          <span>{banner.genres[0]}</span>
          <span>•</span>
          <span>{banner.genres[1]}</span>
        </div>

        <p className="description text-gray-300 font-light text-sm md:text-base max-w-[450px] max-md:max-w-full">
          {banner.description}
        </p>

        {/* Buttons */}
        <div className="flex space-x-3 max-w-[450px] max-md:justify-center max-md:max-w-full w-full sm:w-auto">
          <button
            onClick={() => router.push("/movies")}
            className="
              flex-1 sm:flex-none
              bg-red-600 hover:bg-red-700 text-white font-semibold
              rounded-[5px] transition-colors duration-200 cursor-pointer
              py-2 px-3 text-xs sm:text-sm md:text-base
            "
          >
            Book
          </button>
          <button
            onClick={() => router.push("/movies")}
            className="
              flex-1 sm:flex-none
              bg-gray-800 hover:bg-gray-700 text-white font-semibold
              rounded-[5px] border border-gray-600 transition-colors duration-200 cursor-pointer
              py-2 px-3 text-xs sm:text-sm md:text-base
            "
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

// "use client";

// import { useRouter } from "next/navigation";

// type HeroBannerProps = {
//   title: string;
//   image: string;
//   description: string;
//   genres: string[];
// };

// const HeroBanner = (banner: HeroBannerProps) => {
//   const router = useRouter();
//   return (
//     <div className="hero relative">
//       <div className="hero-cover relative h-[90vh]">
//         <img
//           src={banner.image}
//           alt={banner.title}
//           className="hero-banner w-full h-full object-cover"
//         />
//         <div className="absolute h-full inset-0 z-1 bg-gradient-to-r from-black via-black/25 to-transparent" />
//         <div className="absolute h-full inset-0 z-1 bg-gradient-to-t from-black via-black/0 to-transparent" />
//       </div>
//       <div className="hero-caption absolute pl-[6%] inset-0 flex flex-col gap-3 justify-center z-10">
//         <h1 className="title text-white text-4xl md:text-5xl font-bold">
//           {banner.title}
//         </h1>
//         <div className="flex items-center space-x-2 text-gray-400 text-m">
//           <span>{banner.genres[0]}</span>
//           <span>•</span>
//           <span>{banner.genres[1]}</span>
//         </div>
//         <p className="description text-gray-300 font-light text-red text-m max-w-[450px]">
//           {banner.description}
//         </p>
//         <div className="flex text-[12px] space-x-3 max-w-[450px]">
//           <button
//             onClick={() => router.push("/movies")}
//             className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-[5] transition-colors duration-200 cursor-pointer"
//           >
//             Book
//           </button>
//           <button
//             onClick={() => router.push("/movies")}
//             className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-3 rounded-[5] border border-gray-600 transition-colors duration-200 cursor-pointer"
//           >
//             Read More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroBanner;

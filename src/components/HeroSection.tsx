// import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import HeroBanner from "./HeroBanner";

const movieBanners = [
  {
    title: "Tintin",
    image:
      "https://comicsagogo.files.wordpress.com/2011/11/tintin-movie-poster-horizontal.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rhoncus, arcu quis vehicula tincidunt, magna elit volutpat risus, et sollicitudin metus nulla non est. Curabitur nulla urna.",
    genres: ["Horror", "Action"],
  },
  {
    title: "2 Fast 2 Furious",
    image:
      "https://m.media-amazon.com/images/I/61mTsKezTlL._UF894,1000_QL80_.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rhoncus, arcu quis vehicula tincidunt, magna elit volutpat risus, et sollicitudin metus nulla non est. Curabitur nulla urna.",
    genres: ["Horror", "Action"],
  },
  {
    title: "Kimetsu no Yaiba",
    image:
      "https://image.idntimes.com/post/20230428/kimetsu-no-yaiba-ch162-cd8f633b9d261c5a8d597d09aeb5feda.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rhoncus, arcu quis vehicula tincidunt, magna elit volutpat risus, et sollicitudin metus nulla non est. Curabitur nulla urna.",
    genres: ["Horror", "Action"],
  },
];

const HeroSection = () => {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {movieBanners.map((banner, index) => (
          <CarouselItem key={index}>
            <HeroBanner
              title={banner.title}
              image={banner.image}
              description={banner.description}
              genres={banner.genres}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HeroSection;

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeroBanner from "./HeroBanner";

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
        <CarouselItem>
          <HeroBanner />
        </CarouselItem>
        <CarouselItem>
          <HeroBanner />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default HeroSection;

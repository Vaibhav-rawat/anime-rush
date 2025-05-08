import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { useEffect, useState } from "react";

interface AnimeObj {
  mal_id: number;
  title: string;
  title_english: string | null;
  images: {
    webp: {
      large_image_url: string;
    };
  };
}

export default function TopAnime() {
  const [topAnime, setTopAnime] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/anime?limit=10")
      .then(function (response) {
        // handle success
        setTopAnime(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    // return () => {
    //   second
    // }
  }, []);

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="w-full max-w-[90vw]"
    >
      <CarouselContent>
        {topAnime.map((anime: AnimeObj) => (
          <CarouselItem key={anime.mal_id} className="basis-1/3">
            <div className="p-1">
              <Card
                style={
                  {
                    "--image-url": `url(${anime.images.webp.large_image_url})`,
                  } as React.CSSProperties
                }
                className="bg-[image:var(--image-url)] bg-no-repeat bg-cover"
              >
                <CardContent className="flex aspect-square items-end justify-center px-6">
                  <span className="text-3xl font-semibold text-white">
                    {anime.title_english ?? anime.title}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

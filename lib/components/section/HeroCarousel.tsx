"use client";

import { useState, useEffect } from "react";

import Indicator from "../ui/carousel/Indicator";

import CarouselItem from "../ui/carousel/CarouselItem";
import { Banner } from "@prisma/client";

interface Props {
  items: Banner[];
}

const HeroCarousel = ({ items }: Props) => {
  const [current, setCurrent] = useState<number>(0);
  const [isHover, setHover] = useState<Boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHover) {
        if (current >= 0 && current < items.length) {
          setCurrent((prev) => prev + 1);
        }
        if (current === items.length - 1) {
          setCurrent(0);
        }
      }
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [current, isHover, items.length]);

  return (
    <section
      className="relative flex h-min flex-col items-center overflow-hidden rounded-none xl:rounded-lg"
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {items.map((item, i) => {
        return (
          <CarouselItem
            key={item.id}
            active={i === current}
            src={item.image_url}
            alt={item.description}
            link={item.href ? item.href : "#"}
          />
        );
      })}

      <div className="absolute bottom-4 z-20 hidden items-center gap-2 lg:flex">
        {items.map((item, i) => {
          return (
            <Indicator
              handleClick={() => {
                if (i !== current) {
                  setCurrent(i);
                }
              }}
              key={i}
              active={i === current}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeroCarousel;

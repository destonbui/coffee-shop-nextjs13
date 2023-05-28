"use client";

import { useState, useEffect } from "react";

import Indicator from "../ui/carousel/Indicator";

import CarouselItem, { CarouselItemProps } from "../ui/carousel/CarouselItem";

interface Props {
  items: CarouselItemProps[];
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
    }, 3500);

    return () => {
      clearInterval(intervalId);
    };
  }, [current, isHover, items.length]);

  return (
    <section
      className="relative rounded-none xl:rounded-lg overflow-hidden flex flex-col items-center h-min"
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
            key={item.alt}
            active={i === current}
            src={item.src}
            alt={item.alt}
            link={item.link}
          />
        );
      })}

      <div className="hidden absolute z-20 bottom-4 lg:flex gap-4 items-center">
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

"use client";

import { useRef, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

type RunningCarouselProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  variant?: "service" | "concept";
};

export function RunningCarousel<T>({
  items,
  getKey,
  renderItem,
  variant = "service",
}: RunningCarouselProps<T>) {
  const isConcept = variant === "concept";
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Swiper
      modules={[Autoplay, Navigation, A11y]}
      loop
      speed={isConcept ? 7500 : 5500}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      grabCursor
      watchSlidesProgress
      navigation
      spaceBetween={16}
      slidesPerView={1.08}
      breakpoints={{
        640: {
          slidesPerView: isConcept ? 1.35 : 2.1,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: isConcept ? 2.05 : 3.1,
          spaceBetween: 24,
        },
        1440: {
          slidesPerView: isConcept ? 2.35 : 3.6,
          spaceBetween: 28,
        },
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onFocusCapture={(event) => {
        const swiper = swiperRef.current || (event.currentTarget as unknown as { swiper?: SwiperType }).swiper;
        swiper?.autoplay?.pause();
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          const swiper = swiperRef.current || (event.currentTarget as unknown as { swiper?: SwiperType }).swiper;
          swiper?.autoplay?.resume();
        }
      }}
      className="running-carousel"
    >
      {items.map((item) => (
        <SwiperSlide key={getKey(item)}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

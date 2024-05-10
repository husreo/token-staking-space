"use client";
import { useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css/pagination";
import { useSize } from "ahooks";
import Image from "next/image";
import Swip1 from "public/images/SkyWarlords/swip1.png";
import Swip2 from "public/images/SkyWarlords/swip2.png";
import Swip3 from "public/images/SkyWarlords/swip3.png";
import { EffectCards, Navigation } from "swiper";
import "swiper/css/navigation";

const swiperImage = [Swip1, Swip2, Swip3];
const LeftIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M30 36L18 24l12-12"
      ></path>
    </svg>
  );
};

export default function SwiperSliceSkyWarlord() {
  const ref: any = useRef();
  const size = useSize(ref);
  return (
    <>
      <Swiper
        effect="cards"
        grabCursor={true}
        slidesPerView={1}
        cardsEffect={{
          slideShadows: false,
          rotate: false,
          perSlideRotate: 1,
          perSlideOffset: 6.5,
        }}
        navigation={{
          nextEl: ".next-button",
          prevEl: ".pre-button",
        }}
        modules={[Navigation, EffectCards]}
        className="relative mx-auto h-[593px] w-full"
      >
        <button
          style={{
            top: size?.height ? size.height / 2 : "auto",
          }}
          className="next-button absolute right-0 z-20 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/10 hover:bg-white/50  max-sm:hidden lg:h-[80px] lg:w-[80px] xl:h-[100px] xl:w-[100px]"
        >
          <LeftIcon className="h-6 w-6 rotate-180 lg:h-9 lg:w-9 xl:h-12 xl:w-12" />
        </button>
        <button
          style={{
            top: size?.height ? size.height / 2 : "auto",
          }}
          className="pre-button absolute left-0 z-20 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/10 hover:bg-white/50 max-sm:hidden lg:h-[80px] lg:w-[80px] xl:h-[100px] xl:w-[100px]"
        >
          {" "}
          <LeftIcon className="h-6 w-6 lg:h-9 lg:w-9 xl:h-12 xl:w-12" />
        </button>
        {swiperImage.map((item, index) => {
          return (
            <SwiperSlide
              key={`swip${index}`}
              className="relative rounded-3xl bg-transparent px-5 sm:px-10"
            >
              <Image
                ref={ref}
                className="mx-auto aspect-auto rounded-3xl bg-transparent object-cover shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] "
                src={item}
                width={1284}
                height={593}
                alt="swiper"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

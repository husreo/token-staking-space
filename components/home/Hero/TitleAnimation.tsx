"use client";
import { motion } from "framer-motion";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Translation from "utils/translation";

const TitleAnimation = () => {
  return (
    <div className="flex w-full flex-col text-2xl sm:flex-row sm:items-center md:text-5xl lg:text-center">
      <Translation sub="home.hero" text="title" />
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 100,
        }}
        transition={{
          ease: "circOut",
          duration: 0.5,
        }}
      >
        <Swiper
          autoplay={{
            delay: 2500,
            reverseDirection: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          direction="vertical"
          slidesPerView={1}
          initialSlide={0}
          spaceBetween={80}
          loop
          className="!mx-0 h-[92px] w-[320px] text-left"
        >
          <SwiperSlide>
            <p
              style={{
                textShadow:
                  "0 0 7px #ffffff, 0 0 0px #ffffff, 0 0 20px #ffffff",
              }}
              className="flex h-full items-center rounded-xl pl-2 pr-10 text-4xl text-transparent text-white md:pl-8 md:text-5xl"
            >
              <Translation text="home.hero.game" />
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p
              style={{
                textShadow:
                  "0 0 7px #ffffff, 0 0 0px #ffffff, 0 0 20px #ffffff",
              }}
              className="flex h-full items-center rounded-xl pl-2 pr-10 text-4xl text-transparent text-white md:pl-8 md:text-5xl"
            >
              <Translation text="home.hero.story" />
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <p
              style={{
                textShadow:
                  "0 0 7px #ffffff, 0 0 0px #ffffff, 0 0 20px #ffffff",
              }}
              className="flex h-full items-center rounded-xl pl-2 pr-10 text-4xl text-transparent text-white md:pl-8 md:text-5xl"
            >
              <Translation text="home.hero.world" />
            </p>
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </div>
  );
};

export default TitleAnimation;

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";

const PresaleTopBanner = () => {
  const t = useTranslations();
  const translate = (text: string) => t(`banner.${text}`);
  return (
    <div className="h-[81px]">
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
            delay: 5000,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          initialSlide={0}
          spaceBetween={80}
          loop
          className="h-auto max-w-[1404px]"
          style={{ aspectRatio: "1404/81" }}
        >
          <SwiperSlide>
            <Link href="/dashboard" className="h-full w-full">
              <div className="relative flex h-full backdrop-blur-2xl items-center rounded-[6px] bg-black/30 pl-6 text-white">
                <div className="absolute bottom-0 right-0 top-0 z-0 w-[450px] lg:w-[640px]">
                  <Image
                    src="/images/Presale/presale-banner-1.png"
                    fill
                    alt="bg"
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>
                <div className="relative z-10">
                  <p className="text-base font-medium lg:text-lg">
                    {translate("banner-1")}
                  </p>
                  <p className="text-[13px] font-normal leading-5 lg:text-[15px]">
                    {translate("description-1")}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/presale" className="h-full w-full">
              <div className="relative flex h-full backdrop-blur-2xl items-center rounded-[6px] bg-black/30 pl-6 text-white">
                <div className="absolute bottom-0 right-0 top-0 z-0 w-[450px] lg:w-[640px]">
                  <Image
                    src="/images/Presale/presale-banner-2.png"
                    fill
                    alt="bg"
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>
                <div className="relative z-10">
                  <p className="text-lg font-medium">{translate("banner-2")}</p>
                  <p className="text-[15px] font-normal leading-5">
                    {translate("description-2")}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </div>
  );
};

export default PresaleTopBanner;

"use client";
import ComponentContainer from "@/components/shared/container/ComponentContainer";
import SwiperSliceSkyWarlord from "./SwiperSliceSkyWarlord";
import TitleSkyWarlords from "./TitleSkyWarlords";
export default function SkyWardLords() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #171717 0%, #000 100%)",
      }}
      className="w-full pt-20 [clip-path:polygon(0_11%,_100%_0%,_100%_100%,_0%_100%)] max-[414px]:[clip-path:polygon(0_9%,_100%_0%,_100%_100%,_0%_100%)] md:pt-28 lg:pb-20 lg:pt-52 lg:[clip-path:polygon(0_16%,_100%_0%,_100%_100%,_0%_100%)] xl:pb-64"
    >
      <ComponentContainer className="px-5 font-aeonikPro font-normal text-white lg:px-3 xl:p-0 xl:px-0">
        <TitleSkyWarlords />
      </ComponentContainer>
      <div className="mx-auto mt-5 h-[300px] max-w-[1650px] max-[414px]:h-[220px] sm:h-[330px] md:h-[450px] lg:mt-14 lg:h-fit">
        <SwiperSliceSkyWarlord />
      </div>
    </div>
  );
}

"use client";
import React, { useRef } from "react";
import ComponentContainer from "@/components/shared/container/ComponentContainer";
import Image from "next/image";
import GameImage from "public/images/Aviarix/game-img.png";
import TitleAviatrix from "./TitleAviatrix";
import GameProgressionSteps from "./GameProgressionSteps";

export default function AviatrixPage() {
  const targetElement: any = useRef(null);

  const handleMoveToDownload = () => {
    if (targetElement.current) {
      targetElement.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #171717 0%, #000 100%)",
      }}
      className="w-ful pb-20 pt-20 [clip-path:polygon(0_5%,_100%_0%,_100%_100%,_0%_100%)] max-[414px]:[clip-path:polygon(0_3%,_100%_0%,_100%_100%,_0%_100%)] md:pt-28 lg:pt-52 lg:[clip-path:polygon(0_10%,_100%_0%,_100%_100%,_0%_100%)] xl:pb-64"
    >
      <ComponentContainer className="px-3 font-aeonikPro text-white">
        <TitleAviatrix refDownload={targetElement} />
        <div className="relative mt-14 h-[500px] w-full rounded-tl-3xl rounded-tr-3xl border-[3px] border-transparent shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] sm:h-[722px]">
          <Image
            className="rounded-tl-3xl rounded-tr-3xl object-cover"
            src={GameImage}
            alt="aviatrix-demo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(9, 9, 9, 0.00) 0%, #090909 100%)",
            }}
            className="absolute bottom-0 left-0 right-0 h-[193px] w-full"
          ></div>
        </div>
        <GameProgressionSteps handleMoveToDownload={handleMoveToDownload} />
      </ComponentContainer>
    </div>
  );
}

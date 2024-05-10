import React from "react";
import EyesIcon from "@/components/shared/icons/eyes";
import Button from "@/components/shared/button";
// import LightBG from "@/components/shared/icons/light-bg-w3-stat";
import Image from "next/image";
import LightBGImg from "public/images/light-bg-1.png";
import Translation from "utils/translation";

export default function InviteCode() {
  return (
    <div className="relative mt-6 flex h-fit flex-col items-center justify-center rounded-2xl bg-[#101010] px-3 pb-4 pt-4 backdrop-blur-[18px] sm:h-[275px] sm:flex-row sm:items-end sm:justify-between sm:px-14 sm:pb-14 sm:pt-[68px]">
      {/* <LightBG className="absolute top-0 left-0 right-0 border w-[993px] h-[275px] blur-2xl transform" /> */}
      <Image
        className="absolute left-0 top-0 rounded-2xl object-cover"
        fill
        src={LightBGImg}
        alt=""
        sizes="(max-width: 600px) 100vw, 100vw"
      />
      <div className="relative z-10 text-center sm:text-left">
        <h1 className="w-full text-xl font-medium sm:text-3xl lg:w-[318px] lg:text-4xl">
          <Translation text="home.aviatrix.earn" />
        </h1>
        <p className="my-5 text-[17px] lg:w-[372px]">
          <Translation text="home.aviatrix.earn-description" />
        </p>
      </div>
      <div className="relative z-10 flex w-full flex-col items-center justify-end sm:items-end">
        <p className="text-center text-base font-normal uppercase opacity-50 lg:text-left">
          <Translation text="home.aviatrix.code-used" />
        </p>
        <div className="mt-3 flex justify-center gap-4 max-lg:flex-wrap max-[414px]:flex-col lg:justify-start">
          <div className="flex h-12 w-[184px] items-center justify-center gap-x-[6px] rounded-[10px] bg-white/10 px-5 py-[7px] max-[414px]:w-full">
            <span className="-mb-1 text-[15px] font-medium">
              <Translation text="home.aviatrix.reveal" />
            </span>
            <EyesIcon className="h-5 w-5" />
          </div>
          <Button className="rounded-[10px] px-3 py-[7px] font-medium text-gray0">
            <span>
              <span>
                <Translation text="home.hero.claim" /> $20
              </span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

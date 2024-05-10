"use client";
import Image from "next/image";
import { useState } from "react";
export default function GiftCard({
  name = "",
  image = "",
}: {
  name: string;
  image: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="flex h-[200px] w-[200px] flex-col gap-y-1">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full cursor-pointer rounded-[10px] "
      >
        <Image
          className={`full w-full rounded-[10px] object-contain`}
          src={image}
          fill
          alt="logo"
          sizes="(max-width: 600px) 100vw, 100vw"
          loading="eager"
          quality={100}
        />
        {/* {isHovered && (
          <div className="absolute z-20 flex h-full w-full items-center justify-center px-11">
            <button className="flex h-14 w-full items-center justify-center rounded-[100px] border border-[#00FFC2] px-3 py-[7px] text-base font-medium text-[#00FFC2]">
              <Translation text="dashboard.redeem.coming-soon" />
            </button>
          </div>
        )} */}
      </div>
      {/* <div className="flex flex-col gap-y-[10px] px-1">
        <h1 className="text-2xl font-medium">{name}</h1>
        <div className="flex gap-x-2">
          <div className="flex h-8 items-center gap-x-[6px] rounded-md bg-[#2D3130] px-[10px] py-1">
            <span className="relative flex h-5 w-5 ">
              <Image
                className="object-cover"
                src={BadgeIcon}
                fill
                alt=""
                sizes="(max-width: 600px) 100vw, 100vw"
              />
            </span>
            <span className="-mb-1 font-dinPro text-[13px] font-bold">
              50 rp
            </span>
          </div>
          <div className="flex h-8 items-center rounded-md bg-[#2D3130] px-[10px] py-1">
            <span className="-mb-1 font-aeonikPro text-[13px] font-bold text-[#00FFC2]">
              50$ Gift Card
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
}

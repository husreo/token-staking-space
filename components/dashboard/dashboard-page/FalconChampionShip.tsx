import CupIcon from "@/components/shared/icons/cup";
import React from "react";
import PrizePool from "./PrizePool";

export default function FalconChampionShip() {
  return (
    <div className="flex w-full flex-col md:flex-row md:justify-between">
      <div className="flex w-full flex-col items-center justify-between p-3 text-center md:w-fit md:items-start md:text-left lg:p-5 xl:p-9">
        <div className="flex items-center gap-[6px]">
          <CupIcon className="h-5 w-5" />{" "}
          <span className="text-base uppercase leading-6">
          Aviatrix Championship
          </span>
        </div>
        <p className="text-4xl uppercase font-semibold leading-10 tracking-[-0.96px] lg:w-[361px] 2xl:text-5xl 2xl:leading-[60px]">
        Aviatrix Championship Season 1
        </p>
      </div>
      <PrizePool/>
    </div>
  );
}

"use client";

import dayjs from "dayjs";
import Image from "next/image";
import FPImage from "public/images/FalconBadge/falcon-point1.png";
import RPImage from "public/images/FalconBadge/reward-point1.png";
import { ReactNode } from "react";
import { classNames } from "utils/string";
import StatsChart from "./StatsChart";

const StatWrapper = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        "rounded-[10px] border border-white/[0.12] bg-gray1 p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const generateMockData = (l?: number) => {
  let myArray = [];

  for (let i = 0; i < (l || 7); i++) {
    // Generate a random value between 100 and 300
    let randomValue = Math.floor(Math.random() * (300 - 100 + 1) + 100);

    // Add the random value to the array
    myArray.push(randomValue);
  }
  return myArray;
};

export const generateMockLabels = (l?: number) => {
  let myLabels = [];

  for (let i = 0; i < (l || 7); i++) {
    myLabels.push(dayjs().add(1, "day").format("DD/MM"));
  }

  return myLabels;
};

const NewUserChart = () => (
  <StatsChart
    title="New Users"
    dataKey="count"
    hasRange
    chartLogo={
      <div
        style={{
          background: "rgba(99, 189, 255, 0.20)",
        }}
        className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border-2 border-white/[0.17]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="22"
          fill="none"
          viewBox="0 0 20 22"
        >
          <path
            stroke="#63BDFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10 1a4 4 0 100 8 4 4 0 000-8zM19 21c0-4.975-4.03-9-9-9-4.975 0-9 4.025-9 9"
          ></path>
        </svg>
      </div>
    }
  />
);

const TotalUserChart = () => (
  <StatsChart
    title="Daily Active User - Web"
    dataKey="total_user"
    statsType="total-user"
    // hasPlan={false}
    chartLogo={
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border-2 border-white/[0.17] bg-[#ffae4e33]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
        >
          <path
            stroke="#FFAE4E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 6a4 4 0 100 8 4 4 0 000-8zM21 26c0-4.975-4.03-9-9-9-4.975 0-9 4.025-9 9M23 1v8M27 5h-8"
          ></path>
        </svg>
      </div>
    }
  />
);
const TotalUserAviatrixChart = () => (
  <StatsChart
    title="Daily Active User - Aviatrix"
    dataKey="total_user"
    statsType="total-player"
    chartLogo={
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border-2 border-white/[0.17] bg-[#ffae4e33]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
        >
          <path
            stroke="#FFAE4E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 6a4 4 0 100 8 4 4 0 000-8zM21 26c0-4.975-4.03-9-9-9-4.975 0-9 4.025-9 9M23 1v8M27 5h-8"
          ></path>
        </svg>
      </div>
    }
  />
);
const RPDistributed = () => (
  <StatsChart
    title="RP Distributed"
    dataKey="rp-distributed"
    statsType="rp-distributed"
    hasRange
    chartLogo={
      <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[15px]">
        <Image src={RPImage} fill alt="rp" />
      </div>
    }
  />
);
const FPSold = () => (
  <StatsChart
    title="FP Sold"
    dataKey="fp-sold"
    statsType="fp-sold"
    chartType="bar"
    hasRange
    chartLogo={
      <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[15px]">
        <Image src={FPImage} fill alt="rp" />
      </div>
    }
  />
);

const SpacefalconStats = () => {
  return (
    <div>
      <p className="mb-6 text-[38px] font-medium text-white">Space Falcon</p>
      <div className="grid grid-cols-12 gap-5">
        <StatWrapper className="col-span-12 row-span-1 flex flex-col justify-between lg:col-span-5">
          {/* <NewUsers /> */}
          <NewUserChart />
        </StatWrapper>
        <StatWrapper className="col-span-12 row-span-1 flex flex-col justify-between lg:col-span-7">
          {/* <NewUsers /> */}
          <TotalUserChart />
        </StatWrapper>
        <StatWrapper className="col-span-12 row-span-1 flex flex-col justify-between lg:col-span-12">
          {/* <NewUsers /> */}
          <TotalUserAviatrixChart />
        </StatWrapper>
        <StatWrapper className="col-span-12 row-span-1 flex flex-col justify-between lg:col-span-6">
          <FPSold />
        </StatWrapper>
        <StatWrapper className="col-span-12 row-span-1 flex flex-col justify-between lg:col-span-6">
          <RPDistributed />
        </StatWrapper>
      </div>
    </div>
  );
};

export default SpacefalconStats;

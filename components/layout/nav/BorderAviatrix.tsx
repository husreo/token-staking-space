import React from "react";

export default function BorderAviatrix({
  className = "",
}: {
  className?: string;
}) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className={className}
        viewBox="0 0 72 32"
      >
        <rect
          width="100%"
          height="100%"
          stroke="url(#paint0_linear_52_59)"
          strokeOpacity="0.8"
          strokeWidth={2}
          rx="4.5"
        ></rect>
        <rect
          width="100%"
          height="100%"
          stroke="url(#paint0_linear_52_60)"
          strokeOpacity="0.8"
          strokeWidth={2.3}
          className="origin-center rotate-180 transform"
          rx="4.5"
        ></rect>
        <defs>
          <linearGradient
            id="paint0_linear_52_59"
            x1="105%"
            x2="110%"
            y1="0%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#33B4FF" stopOpacity={1}></stop>
            <stop offset="10%" stopColor="#33B4FF" stopOpacity={1}></stop>
            <stop offset="100%" stopColor="transparent" stopOpacity={1}></stop>
          </linearGradient>
          <linearGradient
            id="paint0_linear_52_60"
            x1="35%"
            y1="40%"
            y2="65%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#33B4FF" stopOpacity={1}></stop>
            <stop offset="20%" stopColor="#33B4FF" stopOpacity={0}></stop>
            <stop offset="0" stopColor="transparent" stopOpacity={1}></stop>
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-0 left-1/2 z-10 hidden h-[1.1px] w-3 rounded-[5px] bg-gradient-to-r from-[#D1EFFF] from-20% to-transparent to-80% opacity-70 xl:flex"></div>
    </>
  );
}

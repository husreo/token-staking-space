import React from "react";

export default function BorderCrypto({
  className = "",
}: {
  className?: string;
}) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        className={className}
      >
        <rect
          width="100%"
          height="100%"
          stroke="url(#paint0_linear_52_61)"
          strokeOpacity="0.8"
          strokeWidth={2}
          rx="10"
        ></rect>
        <rect
          width="100%"
          height="100%"
          stroke="url(#paint0_linear_52_62)"
          strokeOpacity="0.8"
          strokeWidth={2.3}
          className="origin-center rotate-180 transform"
          rx="10"
        ></rect>
        <defs>
          <linearGradient
            id="paint0_linear_52_61"
            x1="105%"
            x2="110%"
            y1="0%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0ECB81" stopOpacity={1}></stop>
            <stop offset="10%" stopColor="#0ECB81" stopOpacity={1}></stop>
            <stop offset="100%" stopColor="transparent" stopOpacity={1}></stop>
          </linearGradient>
          <linearGradient
            id="paint0_linear_52_62"
            x1="40%"
            // x2="120%"
            y1="40%"
            y2="65%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#0ECB81" stopOpacity={1}></stop>
            <stop offset="10%" stopColor="#0ECB81" stopOpacity={0}></stop>
            <stop offset="0" stopColor="transparent" stopOpacity={1}></stop>
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-0 left-1/2 z-10 h-[1.1px] w-3 rounded-[5px] bg-gradient-to-r from-[#BBFFE4] from-20% to-transparent to-80% opacity-70"></div>
    </>
  );
}

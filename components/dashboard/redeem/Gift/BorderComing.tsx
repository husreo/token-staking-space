import React from "react";

function BorderComing({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 142 58"
      className={className}
    >
      <rect
        width="99%"
        height="99%"
        x="0.5"
        y="0.5"
        stroke="url(#paint0_linear_3823_18892)"
        strokeWidth={1}
        rx="9.5"
      ></rect>
      <defs>
        <linearGradient
          id="paint0_linear_3823_18892"
          x1="71"
          x2="71"
          y1="0"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFC2" stopOpacity="0.65"></stop>
          <stop offset="1" stopColor="#00FFC2" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default BorderComing;

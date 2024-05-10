import React from "react";

function BorderAvailable({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      //   width="309"
      //   height="31"
      fill="none"
      viewBox="0 0 309 31"
      className={className}
    >
      <rect
        width="308"
        height="30"
        x="0.5"
        y="0.5"
        stroke="url(#paint0_linear_5224_11509)"
        rx="15"
      ></rect>
      <defs>
        <linearGradient
          id="paint0_linear_5224_11509"
          x1="0.888"
          x2="309.888"
          y1="16"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FF75"></stop>
          <stop offset="1" stopColor="#0FF"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default BorderAvailable;

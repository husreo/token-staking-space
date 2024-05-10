import React from "react";

function AviatrixArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 60 13"
      className={className}
    >
      <path
        fill="url(#paint0_linear_5235_38083)"
        d="M0 0l19.23 8.013a28 28 0 0021.54 0L60 0 43.176 8.973a28 28 0 01-26.353 0L0 0z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5235_38083"
          x1="30"
          x2="30"
          y1="0"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0.37"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0.14"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default AviatrixArrowIcon;

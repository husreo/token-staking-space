import * as React from "react";
const ActiveTitle = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 100 3"
    className={className}
  >
    <path fill="url(#paint0_linear_4314_1401)" d="M0 0H100V3H0z"></path>
    <defs>
      <linearGradient
        id="paint0_linear_4314_1401"
        x1="100"
        x2="0"
        y1="1"
        y2="0.999"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00FFC2" stopOpacity="0"></stop>
        <stop offset="0.082" stopColor="#00FFC2"></stop>
        <stop offset="1" stopColor="#00FFC2" stopOpacity="0"></stop>
      </linearGradient>
    </defs>
  </svg>
);
export default ActiveTitle;

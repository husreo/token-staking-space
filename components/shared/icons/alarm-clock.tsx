import React from "react";

function AlarmClock({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        stroke="#ABB2B0"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.083 7.916h15.833v8.75c0 .46-.373.833-.833.833H2.916a.833.833 0 01-.833-.833v-8.75zM2.083 3.75c0-.46.373-.834.833-.834h14.167c.46 0 .833.373.833.833v4.167H2.083V3.749z"
      ></path>
      <path
        stroke="#ABB2B0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6.667 1.666v3.333M13.333 1.666v3.333M11.667 14.166h2.5M5.833 14.166h2.5M11.667 10.834h2.5M5.833 10.834h2.5"
      ></path>
    </svg>
  );
}

export default AlarmClock;

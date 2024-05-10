"use client";
import React from "react";

function CountDownBorder({
  className = "",
  sizeWidth = 0,
  sizeHeight = 0,
}: {
  className?: string;
  sizeWidth?: number;
  sizeHeight?: number;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={className}>
      <rect
        x="0.5"
        y="0.5"
        stroke="url(#paint0_linear_22_112)"
        rx="15.5"
        style={{
          width: `${sizeWidth - 2}px`,
          height: `${sizeHeight - 1}px`,
        }}
      ></rect>
      <defs>
        <linearGradient
          id="paint0_linear_22_112"
          x1="11.5"
          x2="388.801"
          y1="0"
          y2="366.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0"></stop>
          <stop offset="0.237" stopColor="#393939" stopOpacity="0.611"></stop>
          <stop offset="0.51" stopColor="#707070"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default CountDownBorder;

import React from "react";

function WalletIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 30 30"
      className={className}
    >
      <g fill="#000" strokeWidth="0.903" clipPath="url(#clip0_3561_18000)">
        <path
          stroke="url(#paint0_linear_3561_18000)"
          d="M20.868 17.256v-.902h.903v.902h-.903z"
        ></path>
        <path
          stroke="url(#paint1_linear_3561_18000)"
          d="M3.715 7.778v.45H25.834a1.354 1.354 0 011.354 1.355v14.445a1.354 1.354 0 01-1.354 1.354H4.167a1.354 1.354 0 01-1.354-1.354V5.069a1.354 1.354 0 011.354-1.354h19.41v.903H3.715v3.16zm0 16.25v.451H26.284v-3.611h-7.673a1.354 1.354 0 01-1.354-1.354v-5.417a1.354 1.354 0 011.354-1.354h7.673V9.132H3.716v14.896zm22.57-9.931v-.451H18.16V19.965H26.284V14.097z"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_3561_18000"
          x1="21.32"
          x2="21.32"
          y1="15.902"
          y2="17.708"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#86FFE2"></stop>
          <stop offset="1" stopColor="#00FFC2"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_3561_18000"
          x1="15"
          x2="15"
          y1="3.264"
          y2="25.833"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#86FFE2"></stop>
          <stop offset="1" stopColor="#00FFC2"></stop>
        </linearGradient>
        <clipPath id="clip0_3561_18000">
          <path
            fill="#fff"
            d="M0 0H28.889V28.889H0z"
            transform="translate(.556 .555)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default WalletIcon;

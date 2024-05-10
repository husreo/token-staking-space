import React from "react";

function BNB({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <g clipPath="url(#clip0_3772_6206)">
        <path
          fill="#F0B90B"
          fillRule="evenodd"
          d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#fff"
          d="M5.496 10l.007 2.645 2.247 1.322v1.548l-3.562-2.089V9.228L5.496 10zm0-2.643v1.54l-1.309-.774v-1.54l1.309-.774 1.315.774-1.315.774zm3.192-.774l1.309-.774 1.315.774-1.315.774-1.309-.774z"
        ></path>
        <path
          fill="#fff"
          d="M6.441 12.097V10.55l1.309.774v1.54l-1.309-.766zm2.247 2.425l1.309.774 1.315-.774v1.54l-1.315.775-1.309-.774v-1.541zm4.5-7.94l1.309-.773 1.315.774v1.54l-1.315.775V7.357l-1.309-.774zm1.309 6.063l.007-2.644 1.308-.774v4.199l-3.561 2.088v-1.547l2.246-1.322z"
        ></path>
        <path
          fill="#fff"
          d="M13.559 12.097l-1.309.767v-1.541l1.309-.774v1.548z"
        ></path>
        <path
          fill="#fff"
          d="M13.558 7.904l.008 1.548-2.254 1.322v2.65l-1.308.767-1.309-.767v-2.65L6.442 9.452V7.904l1.314-.774 2.24 1.328 2.253-1.328 1.315.774h-.006zM6.441 5.26l3.556-2.096 3.561 2.096-1.308.774-2.253-1.328L7.75 6.034 6.44 5.26z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_3772_6206">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default BNB;

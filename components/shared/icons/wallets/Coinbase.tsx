import React from "react";

function Coinbase({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 41 40"
      className={className}
    >
      <g clipPath="url(#clip0_3541_12562)">
        <path
          fill="#0052FF"
          d="M20.625 40c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z"
        ></path>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M6.563 20c0 7.767 6.295 14.063 14.062 14.063 7.767 0 14.063-6.297 14.063-14.063 0-7.767-6.297-14.063-14.063-14.063-7.767 0-14.063 6.296-14.063 14.063zm10.468-4.531a.937.937 0 00-.937.937v7.188c0 .517.42.937.937.937h7.188c.517 0 .937-.42.937-.937v-7.188a.937.937 0 00-.937-.937H17.03z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_3541_12562">
          <path
            fill="#fff"
            d="M0 0H40V40H0z"
            transform="translate(.625)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Coinbase;

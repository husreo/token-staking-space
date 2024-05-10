import React from "react";

function EyesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 17.083c4.142 0 7.5-3.467 7.5-5.833S14.142 5.417 10 5.417c-4.142 0-7.5 3.47-7.5 5.833s3.358 5.833 7.5 5.833z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 13.75a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M5.526 4.694l1.081 1.509M14.844 4.88l-1.081 1.508M10.004 2.917v2.5"
      ></path>
    </svg>
  );
}

export default EyesIcon;

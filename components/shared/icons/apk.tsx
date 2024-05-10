import React from "react";

function APKIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
      className={className}
    >
      <g clipPath="url(#clip0_8260_1476)">
        <path
          fill="#fff"
          d="M6.184 12.148c.69 0 1.248.56 1.248 1.249v5.355a1.248 1.248 0 01-2.496 0v-5.355c0-.69.559-1.249 1.248-1.249z"
        ></path>
        <path
          fill="#fff"
          d="M3.334 5.71a1.653 1.653 0 00-.008.143v8.114c0 .872.691 1.575 1.549 1.575h8.25c.858 0 1.549-.703 1.549-1.575V5.853c0-.048-.002-.096-.006-.143H3.334z"
        ></path>
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.263"
          d="M3.805.132l1.317 2.28m9.073-2.28l-1.316 2.28"
        ></path>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M13.064 13.396a1.248 1.248 0 00-2.497 0v5.356a1.248 1.248 0 002.497 0v-5.355zM2.57 7.68a1.248 1.248 0 10-2.497 0v5.356a1.248 1.248 0 002.497 0V7.68zm15.359 0a1.248 1.248 0 10-2.497 0v5.356a1.248 1.248 0 002.497 0V7.68zM8.373.372C5.58.642 3.405 2.685 3.37 5.177h11.258C14.595 2.685 12.42.64 9.627.372H8.373zM6.679 3.576a.638.638 0 00.644-.633V2.94a.639.639 0 00-.648-.63.638.638 0 00-.644.633v.004c.001.348.291.63.648.629zm4.82 0a.638.638 0 00.645-.633V2.94a.639.639 0 00-.648-.63.638.638 0 00-.644.633v.004c.001.348.291.63.648.629z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_8260_1476">
          <path
            fill="#fff"
            d="M0 0H17.856V20H0z"
            transform="translate(.072)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default APKIcon;

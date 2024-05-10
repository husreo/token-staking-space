import React from "react";

function HelpIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="none"
      viewBox="0 0 22 22"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11 21c2.76 0 5.26-1.12 7.07-2.93a9.988 9.988 0 002.925-7.075 9.972 9.972 0 00-2.93-7.075A9.972 9.972 0 0010.99.99a9.967 9.967 0 00-7.075 2.925 9.951 9.951 0 00-2.93 7.07c0 2.76 1.115 5.26 2.925 7.07a9.968 9.968 0 007.07 2.925L11 21z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11 13.31v-2a3 3 0 100-6c-1.66 0-3 1.34-3 3"
      ></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M11 17.81a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default HelpIcon;

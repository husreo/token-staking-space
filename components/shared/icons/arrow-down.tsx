import React from "react";

function ArrowDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 28"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        d="M21 10.5l-7 7-7-7"
      ></path>
    </svg>
  );
}

export default ArrowDownIcon;

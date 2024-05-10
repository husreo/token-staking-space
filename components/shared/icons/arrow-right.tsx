import React from "react";

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="16"
      fill="none"
      viewBox="0 0 19 16"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
        d="M3.75 1.507h13.5v13.5M1.5 17.242L17.242 1.5"
      ></path>
    </svg>
  );
}

export default ArrowRight;

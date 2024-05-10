import React from "react";

export default function CheckIcon({ className = "" }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M3.334 8l3.333 3.333 6.667-6.666"
      ></path>
    </svg>
  );
}

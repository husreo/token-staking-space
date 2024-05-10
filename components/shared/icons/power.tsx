import React from "react";

function PowerIcon({ className = "" }: { className?: string }) {
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
        d="M4.833 2.667c-.22.123-.433.263-.633.413a6.156 6.156 0 00-.95.863 6.165 6.165 0 00-1.583 4.134c0 3.45 2.833 6.25 6.333 6.25 3.497 0 6.333-2.8 6.333-6.254 0-1.586-.6-3.033-1.583-4.136a6.313 6.313 0 00-.95-.867 7.138 7.138 0 00-.633-.417M8 1.333V8"
      ></path>
    </svg>
  );
}

export default PowerIcon;

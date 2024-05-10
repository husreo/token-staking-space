import React from "react";

function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.5 9.5h19V20a1 1 0 01-1 1h-17a1 1 0 01-1-1V9.5zM2.5 4.5a1 1 0 011-1h17a1 1 0 011 1v5h-19v-5z"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 2v4M16 2v4M14 17h3M7 17h3M14 13h3M7 13h3"
      ></path>
    </svg>
  );
}

export default CalendarIcon;

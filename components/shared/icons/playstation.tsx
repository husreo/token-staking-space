import React from "react";

function PlayStation({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        stroke="#ABB2B0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.916 12.501v1.25a2.917 2.917 0 01-5.833 0V7.918M12.083 12.501v1.25a2.917 2.917 0 005.833 0V7.918"
      ></path>
      <path
        stroke="#ABB2B0"
        strokeWidth="1.5"
        d="M13.333 3.334H6.666a4.583 4.583 0 000 9.167h6.667a4.583 4.583 0 000-9.167z"
      ></path>
      <path
        stroke="#ABB2B0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.75 7.916H5.415M7.083 6.25v3.333"
      ></path>
      <path
        fill="#ABB2B0"
        d="M15 7.083a.833.833 0 10-1.667 0 .833.833 0 001.667 0zM13.333 9.167a.833.833 0 10-1.667 0 .833.833 0 001.667 0z"
      ></path>
    </svg>
  );
}

export default PlayStation;

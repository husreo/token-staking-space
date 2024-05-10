import React from "react";

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 24"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12.53 5l-.018 14M5.5 12h14"
      ></path>
    </svg>
  );
}

export default PlusIcon;

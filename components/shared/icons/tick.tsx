import React from "react";

function TickIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        fill="#06826B"
        d="M9.813 5.86l-2.86 2.866-1.1-1.1a.667.667 0 10-.94.94L6.48 10.14a.667.667 0 00.94 0l3.334-3.334a.666.666 0 00-.47-1.14.667.667 0 00-.47.194zM8 1.333a6.667 6.667 0 100 13.333A6.667 6.667 0 008 1.333zm0 12A5.334 5.334 0 118 2.666a5.334 5.334 0 010 10.667z"
      ></path>
    </svg>
  );
}

export default TickIcon;

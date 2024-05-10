import React from "react";

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <g fill="#fff" clipPath="url(#clip0_1849_999)" opacity="0.2">
        <path d="M28 10v18H10V10h18zm0-2H10a2 2 0 00-2 2v18a2 2 0 002 2h18a2 2 0 002-2V10a2 2 0 00-2-2z"></path>
        <path d="M4 18H2V4a2 2 0 012-2h14v2H4v14z"></path>
      </g>
      <defs>
        <clipPath id="clip0_1849_999">
          <path fill="#fff" d="M0 0H32V32H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default CopyIcon;

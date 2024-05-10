import React from "react";

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 38 38"
      className={className}
    >
      <g clipPath="url(#clip0_5224_11425)" opacity="0.8">
        <path
          fill="#000"
          d="M10.215 32.75a1.146 1.146 0 01-1.146-1.146V6.396a1.146 1.146 0 011.698-1.004l22.917 12.604a1.146 1.146 0 010 2.008L10.768 32.608c-.17.093-.36.142-.553.142z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_5224_11425">
          <path
            fill="#fff"
            d="M0 0H36.667V36.667H0z"
            transform="translate(.667 .667)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default PauseIcon;

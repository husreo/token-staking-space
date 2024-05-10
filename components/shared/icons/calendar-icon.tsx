import React from "react";

function CelendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M1.667 6.334h12.666v7a.667.667 0 01-.667.667H2.333a.667.667 0 01-.667-.667v-7z"
      ></path>
      <path
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M1.667 3c0-.368.298-.666.666-.666h11.334c.368 0 .666.298.666.667v3.333H1.667V3.001z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M5.333 1.334v2.667M10.666 1.334v2.667M9.334 11.334h2M4.667 11.334h2M9.334 8.666h2"
      ></path>
      <path
        stroke="#ABB2B0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M4.667 8.666h2"
      ></path>
    </svg>
  );
}

export default CelendarIcon;
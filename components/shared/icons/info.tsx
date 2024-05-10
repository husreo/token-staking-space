import React from "react";

function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={className}>
      <path
        stroke="#4F5654"
        strokeLinejoin="round"
        d="M6 11.5c1.38 0 2.63-.56 3.536-1.464A4.984 4.984 0 0011 6.5c0-1.38-.56-2.63-1.464-3.536A4.984 4.984 0 006 1.5c-1.38 0-2.63.56-3.536 1.464A4.984 4.984 0 001 6.5c0 1.38.56 2.63 1.464 3.536A4.984 4.984 0 006 11.5z"
      ></path>
      <path
        fill="#4F5654"
        fillRule="evenodd"
        d="M6 3.25A.625.625 0 116 4.5a.625.625 0 010-1.25z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="#4F5654"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.125 9V5.5h-.5M5.25 9H7"
      ></path>
    </svg>
  );
}

export default InfoIcon;

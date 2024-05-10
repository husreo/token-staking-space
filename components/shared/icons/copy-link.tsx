import React from "react";

function CopyLinkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.747 4.458L4.7 1.41c-.89-.89-2.346-.87-3.256.043-.914.91-.934 2.367-.047 3.254L4.04 7.35M9.967 6.667l2.644 2.643c.886.886.866 2.343-.047 3.253-.913.91-2.37.93-3.257.043L6.261 9.56M7.7 7.713c.91-.913.93-2.37.044-3.256M6.264 6.263c-.913.91-.933 2.367-.047 3.254"
      ></path>
    </svg>
  );
}

export default CopyLinkIcon;

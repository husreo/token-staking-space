import React from "react";

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        fill="#fff"
        d="M10 1.2A8.8 8.8 0 001.2 10c0 4.412 3.25 8.055 7.485 8.691v-6.358H6.508v-2.314h2.177V8.48c0-2.548 1.241-3.667 3.36-3.667 1.014 0 1.55.075 1.804.11v2.019h-1.445c-.899 0-1.213.852-1.213 1.813v1.264h2.635l-.357 2.314H11.19v6.377c4.295-.583 7.609-4.255 7.609-8.71A8.8 8.8 0 0010 1.2z"
      ></path>
    </svg>
  );
}

export default FacebookIcon;

import React from "react";

function ETH({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 28"
      className={className}
    >
      <circle cx="14" cy="14.001" r="11.667" fill="#fff"></circle>
      <g clipPath="url(#clip0_3772_6191)">
        <path
          fill="#343434"
          d="M14 4.145l-.127.433V17.14l.128.128 5.831-3.447L14 4.145z"
        ></path>
        <path
          fill="#8C8C8C"
          d="M14.002 4.145L8.17 13.82l5.832 3.447V4.145z"
        ></path>
        <path
          fill="#343434"
          d="M14.002 18.371l-.071.088v4.475l.072.21 5.835-8.218-5.836 3.445z"
        ></path>
        <path
          fill="#8C8C8C"
          d="M14.002 23.143v-4.772L8.17 14.926l5.832 8.217z"
        ></path>
        <path
          fill="#141414"
          d="M14.001 17.268l5.831-3.447-5.831-2.651v6.098z"
        ></path>
        <path
          fill="#393939"
          d="M8.17 13.82l5.832 3.448V11.17L8.17 13.82z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_3772_6191">
          <path
            fill="#fff"
            d="M0 0H11.667V19H0z"
            transform="translate(8.167 4.145)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default ETH;

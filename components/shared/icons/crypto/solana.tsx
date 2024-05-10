import React from "react";

function Solana({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 28"
      className={className}
    >
      <circle
        cx="13.667"
        cy="13.667"
        r="11.667"
        fill="url(#paint0_linear_3772_6216)"
        fillOpacity="0.3"
      ></circle>
      <path
        fill="url(#paint1_linear_3772_6216)"
        d="M8.343 17.65a.524.524 0 01.37-.154H21.59c.235 0 .352.285.185.448l-2.544 2.541a.524.524 0 01-.37.155H5.986a.262.262 0 01-.185-.448l2.541-2.541z"
      ></path>
      <path
        fill="url(#paint2_linear_3772_6216)"
        d="M8.343 8.155A.524.524 0 018.713 8H21.59c.235 0 .352.284.185.448L19.23 10.99a.524.524 0 01-.37.155H5.986a.262.262 0 01-.185-.449l2.541-2.54z"
      ></path>
      <path
        fill="url(#paint3_linear_3772_6216)"
        d="M19.23 12.871a.524.524 0 00-.37-.154H5.986a.262.262 0 00-.185.448l2.544 2.541a.524.524 0 00.371.155h12.875a.262.262 0 00.185-.449l-2.547-2.54z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_3772_6216"
          x1="5"
          x2="19.5"
          y1="5.5"
          y2="26.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AB51EB"></stop>
          <stop offset="1" stopColor="#21DEB1"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_3772_6216"
          x1="20.359"
          x2="11.45"
          y1="6.482"
          y2="23.547"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3"></stop>
          <stop offset="1" stopColor="#DC1FFF"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_3772_6216"
          x1="16.464"
          x2="7.554"
          y1="4.448"
          y2="21.513"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3"></stop>
          <stop offset="1" stopColor="#DC1FFF"></stop>
        </linearGradient>
        <linearGradient
          id="paint3_linear_3772_6216"
          x1="18.399"
          x2="9.489"
          y1="5.458"
          y2="22.523"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3"></stop>
          <stop offset="1" stopColor="#DC1FFF"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Solana;

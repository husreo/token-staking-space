import React from "react";

function SpaceFalconIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 7 14"
      className={className}
    >
      <g clipPath="url(#clip0_8669_3695)">
        <path
          fill="#00FFC2"
          d="M6.942 7.002a.449.449 0 00-.132-.316l-.715-.709v3.64L4.955 8.46l-.367-.366L5.67 7.03V2.21L3.96.585 2.252 2.21v4.785l1.117 1.113-1.54 1.513V5.976l-.716.709A.444.444 0 00.98 7v4.637l1.27-1.25v1.31c0 .12.049.234.134.317l.577.57V9.69l.575-.566v3.88l.424.42.424-.42V9.119l.579.572v2.977l.576-.569a.446.446 0 00.133-.317V10.39l1.27 1.252v-4.64zM3.1 6.61V2.568l.86-.82.864.82v4.111l-.833.818-.89-.888z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_8669_3695">
          <path
            fill="#fff"
            d="M0 0H5.961V12.84H0z"
            transform="translate(.981 .585)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default SpaceFalconIcon;
import React from "react";

function LightningIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 36 44"
      className={className}
    >
      <g filter="url(#filter0_bdi_6338_162)">
        <path
          fill="url(#paint0_linear_6338_162)"
          d="M24.663 6.128l-4.738 9.019H30.21c1.452 0 1.814 1.4.778 2.488L9.062 39.818c-.518.57-1.088.726-1.555.519-.466-.208-.622-.778-.31-1.452l6.636-16.067H5.175c-1.348 0-1.866-.778-1.348-1.97l6.635-15.083c.466-1.036.932-1.555 2.332-1.555h10.833c1.14 0 1.606.83 1.036 1.918z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_bdi_6338_162"
          width="38.703"
          height="46.967"
          x="-1.747"
          y="-1.166"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImageFix"
            stdDeviation="2.688"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_6338_162"
          ></feComposite>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="1.792"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0.328158 0 0 0 0 0.649614 0 0 0 0 1 0 0 0 0.45 0"></feColorMatrix>
          <feBlend
            in2="effect1_backgroundBlur_6338_162"
            result="effect2_dropShadow_6338_162"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_6338_162"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="4.032"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          ></feComposite>
          <feColorMatrix values="0 0 0 0 0.555859 0 0 0 0 0.65357 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
          <feBlend in2="shape" result="effect3_innerShadow_6338_162"></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_6338_162"
          x1="17.605"
          x2="17.605"
          y1="4.21"
          y2="40.424"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0094FF"></stop>
          <stop offset="1" stopColor="#3BFFE8"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default LightningIcon;
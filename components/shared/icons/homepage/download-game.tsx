import React from "react";

function DownloadGameIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 80 75"
      className={className}
    >
      <g filter="url(#filter0_i_6315_1113)">
        <path
          fill="url(#paint0_linear_6315_1113)"
          d="M33.149 30.8c3.784-2.184 9.918-2.184 13.702 0l29.374 16.958c3.784 2.184 3.784 5.726 0 7.91L46.85 72.626c-3.784 2.184-9.918 2.184-13.702 0L3.775 55.668c-3.783-2.184-3.783-5.726 0-7.91L33.15 30.8z"
        ></path>
      </g>
      <g filter="url(#filter1_bdi_6315_1113)">
        <path
          fill="url(#paint1_linear_6315_1113)"
          d="M40.335 3.063c-1.345 0-2.302.931-2.302 2.276v34.077l.258 7.71 1.45-.517-9.264-10.169-5.899-5.796c-.388-.414-1.009-.62-1.63-.62-1.294 0-2.225.982-2.225 2.25 0 .621.233 1.165.724 1.682l17.155 17.206c.491.518 1.087.777 1.733.777.647 0 1.242-.26 1.734-.776l17.18-17.207c.492-.517.699-1.06.699-1.682 0-1.268-.931-2.25-2.225-2.25-.621 0-1.216.206-1.63.62l-5.9 5.796-9.288 10.169 1.474.517.26-7.71V5.339c0-1.345-.958-2.277-2.304-2.277z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_i_6315_1113"
          width="78.125"
          height="45.102"
          x="0.938"
          y="29.162"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="10.374"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          ></feComposite>
          <feColorMatrix values="0 0 0 0 0.593538 0 0 0 0 1 0 0 0 0 0.593538 0 0 0 0.54 0"></feColorMatrix>
          <feBlend in2="shape" result="effect1_innerShadow_6315_1113"></feBlend>
        </filter>
        <filter
          id="filter1_bdi_6315_1113"
          width="46.548"
          height="56.199"
          x="17.061"
          y="-0.599"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImageFix"
            stdDeviation="1.831"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_6315_1113"
          ></feComposite>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="1.22"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0.541176 0 0 0 0 1 0 0 0 0 0.392157 0 0 0 0.39 0"></feColorMatrix>
          <feBlend
            in2="effect1_backgroundBlur_6315_1113"
            result="effect2_dropShadow_6315_1113"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_6315_1113"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="2.746"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          ></feComposite>
          <feColorMatrix values="0 0 0 0 0.9514 0 0 0 0 1 0 0 0 0 0.9514 0 0 0 1 0"></feColorMatrix>
          <feBlend in2="shape" result="effect3_innerShadow_6315_1113"></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_6315_1113"
          x1="82.103"
          x2="-3.079"
          y1="52.383"
          y2="51.815"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#05FF00" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#05FF00" stopOpacity="0.36"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_6315_1113"
          x1="40.335"
          x2="40.335"
          y1="3.063"
          y2="51.939"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00"></stop>
          <stop offset="1" stopColor="#05FF00"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default DownloadGameIcon;
import React from "react";

function LightBG({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1312 1070"
      className={className}
    >
      <g
        style={{ mixBlendMode: "lighten" }}
        filter="url(#filter0_f_5235_36860)"
      >
        <path
          fill="url(#paint0_radial_5235_36860)"
          fillOpacity="0.7"
          d="M283.071 786.531C261.675 532.84 567.06 272.247 644.865 282.601c60.217 8.015 70.334 151.449 109.704 254.29L1030 786.531c-56.409 15.532-166.114-108.035-231.47-174.305-18.467-18.725-32.462-45.299-43.961-75.335L633.86 427.484 283.071 786.531z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_f_5235_36860"
          width="1310.88"
          height="1068.45"
          x="0.558"
          y="0.86"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_5235_36860"
            stdDeviation="140.721"
          ></feGaussianBlur>
        </filter>
        <radialGradient
          id="paint0_radial_5235_36860"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-78.193 779.21 31.612) scale(581.938 871.32)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.113" stopColor="#fff" stopOpacity="0.93"></stop>
          <stop offset="0.251" stopColor="#00A3FF" stopOpacity="0.31"></stop>
          <stop offset="0.37" stopColor="#00D1FF" stopOpacity="0.33"></stop>
          <stop offset="0.494" stopColor="#00FFC2"></stop>
          <stop offset="0.719" stopColor="#0C0054" stopOpacity="0.877"></stop>
          <stop offset="0.885" stopColor="#02000F"></stop>
        </radialGradient>
      </defs>
    </svg>
  );
}

export default LightBG;

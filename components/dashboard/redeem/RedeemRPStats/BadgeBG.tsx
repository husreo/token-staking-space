import React from "react";

function BadgeBG({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 195 195"
      className={className}
    >
      <g filter="url(#filter0_bif_3823_17958)" opacity="0.2">
        <path
          fill="#1D1D1D"
          fillOpacity="0.05"
          d="M97.5 189c50.534 0 91.5-40.966 91.5-91.5S148.034 6 97.5 6 6 46.966 6 97.5 46.966 189 97.5 189z"
        ></path>
        <path
          fill="url(#paint0_linear_3823_17958)"
          fillOpacity="0.2"
          d="M97.5 189c50.534 0 91.5-40.966 91.5-91.5S148.034 6 97.5 6 6 46.966 6 97.5 46.966 189 97.5 189z"
        ></path>
        <path
          stroke="url(#paint1_linear_3823_17958)"
          strokeOpacity="0.1"
          strokeWidth="1.2"
          d="M188.4 97.5c0 50.203-40.697 90.9-90.9 90.9S6.6 147.703 6.6 97.5 47.297 6.6 97.5 6.6s90.9 40.697 90.9 90.9z"
        ></path>
      </g>
      <g filter="url(#filter1_i_3823_17958)">
        <path
          fill="#1D1D1D"
          fillOpacity="0.05"
          d="M97.498 177.888c44.395 0 80.384-35.989 80.384-80.384s-35.989-80.385-80.384-80.385-80.385 35.99-80.385 80.385 35.99 80.384 80.385 80.384z"
        ></path>
        <path
          fill="url(#paint2_linear_3823_17958)"
          fillOpacity="0.2"
          d="M97.498 177.888c44.395 0 80.384-35.989 80.384-80.384s-35.989-80.385-80.384-80.385-80.385 35.99-80.385 80.385 35.99 80.384 80.385 80.384z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_bif_3823_17958"
          width="231"
          height="231"
          x="-18"
          y="-18"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feGaussianBlur
            in="BackgroundImageFix"
            stdDeviation="12"
          ></feGaussianBlur>
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_3823_17958"
          ></feComposite>
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_3823_17958"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="8"></feOffset>
          <feGaussianBlur stdDeviation="6"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          ></feComposite>
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"></feColorMatrix>
          <feBlend
            in2="shape"
            result="effect2_innerShadow_3823_17958"
          ></feBlend>
          <feGaussianBlur
            result="effect3_foregroundBlur_3823_17958"
            stdDeviation="3"
          ></feGaussianBlur>
        </filter>
        <filter
          id="filter1_i_3823_17958"
          width="160.77"
          height="168.77"
          x="17.113"
          y="17.119"
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
          <feOffset dy="8"></feOffset>
          <feGaussianBlur stdDeviation="4"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          ></feComposite>
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"></feColorMatrix>
          <feBlend
            in2="shape"
            result="effect1_innerShadow_3823_17958"
          ></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_3823_17958"
          x1="13.625"
          x2="213.11"
          y1="42.6"
          y2="70.306"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#66FECB"></stop>
          <stop offset="1" stopColor="#8940FF"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_3823_17958"
          x1="11.719"
          x2="189"
          y1="14.318"
          y2="14.318"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C8A6FF"></stop>
          <stop offset="1" stopColor="#69CFB5"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_3823_17958"
          x1="23.812"
          x2="199.064"
          y1="49.273"
          y2="73.614"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#66FECB"></stop>
          <stop offset="1" stopColor="#8940FF"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default BadgeBG;

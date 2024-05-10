import React from "react";

function PunkWars({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 226 88"
      className={className}
    >
      <g fill="#fff" filter="url(#filter0_d_5235_37008)">
        <path d="M202.875 43.868l-5.464 2.769v-4.362l-.514-.465h-3.896l-.417.465v9.777l.417.465h6.223l3.651 3.651v14.04l-3.651 3.725h-8.551l-3.651-3.725v-3.896l5.562-2.768v4.41l.417.417h3.896l.514-.417v-9.482l-.514-.442h-6.224l-3.651-3.724V39.972l3.651-3.676h8.551l3.651 3.676v3.896zM177.515 42.275L177 41.81h-4.312v13.452h1.2l3.627-3.553v-9.434zm-4.827 18.5v13.158h-5.563V36.296h12.203l3.651 3.676v14.04l-4.019 4.018 4.019 4.068v11.835h-5.464v-9.63l-3.627-3.528h-1.2zM154.727 46.686L153.11 58.03h3.161l-1.544-11.344zm-2.352 16.858l-1.421 10.389h-5.562l5.219-37.637h8.282l5.219 37.637h-5.636l-1.397-10.39h-4.704zM120.007 73.933l-4.166-37.637h5.562l2.524 22.984 3.308-13.305h4.754l3.332 13.305 2.499-22.984h5.562l-4.165 37.637h-6.003l-3.627-14.653-3.553 14.653h-6.027zM84.404 36.296h5.562V50.19l4.828-5.024v-8.87h5.464v11.1l-3.97 4.117 3.97 3.945v18.475h-5.465V57.785l-2.303-2.327-2.524 2.72v15.755h-5.562V36.296zM68.355 73.933h-5.563V36.296h5.465l6.615 19.921v-19.92h5.538v37.636h-5.415l-6.64-19.97v19.97zM42.897 36.296h5.562v31.658l.416.417h3.896l.515-.417V36.296h5.464v33.912l-3.651 3.725h-8.552l-3.65-3.725V36.296zM33.39 42.275l-.515-.465h-4.313v13.452h1.2l3.627-3.553v-9.434zm-4.828 18.5v13.158H23V36.296h12.202l3.651 3.676v14.04l-6.762 6.763h-3.529zM58.343 14h13.415v1.6H60.312v3.58H71.27v1.178H60.312v4.15h11.446v1.6H58.343V14zM40.53 14h1.97v5.014h11.344V14h1.97v12.108h-1.97V20.44H42.5v5.668h-1.97V14zM23.068 14H38.35v1.6H31.69v10.508h-1.96V15.601h-6.661V14z"></path>
      </g>
      <defs>
        <filter
          id="filter0_d_5235_37008"
          width="183.875"
          height="63.933"
          x="21"
          y="12"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5235_37008"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_5235_37008"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default PunkWars;

const LightBG = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 590 183"
      width="590"
      height="183"
    >
      <g filter="url(#filter0_f_3487_12814)" opacity="0.2">
        <ellipse
          cx="295"
          cy="197.5"
          fill="url(#paint0_linear_3487_12814)"
          rx="602"
          ry="71.5"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter0_f_3487_12814"
          width="1484"
          height="423"
          x="-447"
          y="-14"
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
            result="effect1_foregroundBlur_3487_12814"
            stdDeviation="70"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear_3487_12814"
          x1="295"
          x2="295"
          y1="126"
          y2="269"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LightBG;

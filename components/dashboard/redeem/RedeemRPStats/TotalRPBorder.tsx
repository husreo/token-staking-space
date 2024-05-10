function TotalRPBorder({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={className}>
      <rect
        x="0.5"
        y="0.5"
        stroke="url(#paint0_linear_22_37)"
        rx="15.5"
        className="h-full w-[219.7px] sm:h-[153.5px] sm:w-[288.7px]"
      ></rect>
      <defs>
        <linearGradient
          id="paint0_linear_22_37"
          x1="144.85"
          x2="144.85"
          y1="0"
          y2="154.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFC2" stopOpacity="0.65"></stop>
          <stop offset="1" stopColor="#00FFC2" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default TotalRPBorder;

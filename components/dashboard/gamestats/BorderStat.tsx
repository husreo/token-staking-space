import { classNames } from "utils/string";
import LightBG from "../mynft/light-bg";

const BorderStat = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classNames(className, "relative overflow-hidden")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        className="absolute bottom-0 left-0 right-0 top-0"
      >
        <rect
          width="100%"
          height="100%"
          stroke="url(#paint0_linear_52_57)"
          strokeOpacity="0.8"
          strokeWidth={2}
          rx="10"
        ></rect>
        <rect
          width="100%"
          height="100%"
          stroke="url(#paint0_linear_52_58)"
          strokeOpacity="0.8"
          strokeWidth={2}
          className="origin-center rotate-180 transform"
          rx="10"
        ></rect>
        <defs>
          <linearGradient
            id="paint0_linear_52_57"
            x1="10%"
            x2="50%"
            y1="40%"
            y2="90%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00FFC2" stopOpacity={1}></stop>
            <stop offset="10%" stopColor="#00FFC2" stopOpacity={0.6}></stop>
            <stop offset="40%" stopColor="#00FFC2" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="paint0_linear_52_58"
            x1="10%"
            x2="50%"
            y1="40%"
            y2="90%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00FFC2" stopOpacity={1}></stop>
            <stop offset="10%" stopColor="#00FFC2" stopOpacity={0.6}></stop>
            <stop offset="35%" stopColor="#00FFC2" stopOpacity={0}></stop>
          </linearGradient>
        </defs>
      </svg>
      {children}
      <LightBG className="absolute -bottom-0 left-0 right-0 h-[143px] w-full" />
    </div>
  );
};

export default BorderStat;

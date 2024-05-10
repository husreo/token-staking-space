import { classNames } from "utils/string";

const BorderWallet = ({
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
          width="157"
          height="105"
          x="1"
          y="0.5"
          stroke="url(#paint0_linear_1_3)"
          strokeOpacity="0.8"
          rx="7.5"
        ></rect>
        <defs>
          <linearGradient
            id="paint0_linear_1_3"
            x1="16.3"
            x2="125.333"
            y1="9.938"
            y2="93.934"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00FFC2" stopOpacity="0.65"></stop>
            <stop offset="0.738" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#00FFC2"></stop>
          </linearGradient>
        </defs>
      </svg>
      {children}
    </div>
  );
};

export default BorderWallet;

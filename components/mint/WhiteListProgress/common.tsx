import { ReactNode } from "react";
import { classNames } from "utils/string";
export const WhiteListMissionWrapper = ({
  children,
  className = "",
  isLoggedIn = false,
  isSetup = false,
}: {
  children: ReactNode;
  className?: string;
  isLoggedIn?: boolean;
  isSetup?: boolean;
}) => {
  return (
    <div
      className={classNames(
        "relative col-span-12 flex flex-1 flex-col justify-between gap-10 rounded-[20px] border p-4 font-aeonikPro text-white transition-all duration-75 ease-in md:col-span-6 lg:col-span-4 lg:p-6",
        className,
        !isLoggedIn
          ? "border-none bg-aviatrix-mission-normal"
          : isSetup
          ? "border-fcon bg-aviatrix-mission-done"
          : "border-[#FFD774] bg-aviatrix-mission-pending",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        className="absolute bottom-0 left-0 right-0 top-0 "
      >
        <rect
          width="100%"
          height="100%"
          stroke="url(#paint0_linear_52_57)"
          // strokeOpacity="0.8"
          strokeWidth={1.05}
          rx="20"
        ></rect>
        <rect
          width="100%"
          height="100%"
          stroke="url(#paint0_linear_52_58)"
          strokeOpacity="0.8"
          strokeWidth={2}
          rx="10"
        ></rect>
        <defs>
          <linearGradient
            id="paint0_linear_52_57"
            x1="10%"
            x2="10%"
            y1="50%"
            y2="20%"
          >
            <stop offset="0" stopColor="white" stopOpacity={0.09}></stop>
            <stop offset="10%" stopColor="white" stopOpacity={0.06}></stop>
            <stop offset="40%" stopColor="white" stopOpacity={0}></stop>
          </linearGradient>
        </defs>
      </svg>
      {children}
    </div>
  );
};

export const StepOrderNumber = ({
  text,
  active,
}: {
  text: string;
  active?: boolean;
}) => {
  return (
    <div
      className={classNames(
        "grid h-[42px] w-[42px] place-items-center rounded-full",
        active ? "bg-fcon" : "bg-gray7 ",
      )}
    >
      <p className="text-[20px] font-bold leading-6 text-gray0 ">{text}</p>
    </div>
  );
};

export const MissionTitle = ({
  text,
  active,
}: {
  text: string;
  active?: boolean;
}) => {
  return (
    <p
      className={classNames(
        "flex-1 text-xl font-bold -tracking-[0.6px] text-fcon",
        active ? "text-fcon" : "text-gray7",
      )}
    >
      {text}
    </p>
  );
};

export const CircleProgress = ({
  className = "",
  active = false,
}: {
  className?: string;
  active?: boolean;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={classNames(
        className,
        "z-20",
        active ? "text-fcon" : "text-gray7",
      )}
    >
      <circle cx="10" cy="10" r="9.5" stroke="currentColor"></circle>
      <circle cx="10" cy="10" r="6" fill="currentColor"></circle>
    </svg>
  );
};

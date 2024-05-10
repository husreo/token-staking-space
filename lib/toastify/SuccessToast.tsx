import XIcon from "@/components/shared/icons/x-icon";
import { ReactNode } from "react";
import { ToastProps } from "react-toastify/dist/types";

type Props = ToastProps & {
  message?: string | ReactNode;
};

const SuccessToast: React.FC<Props> = ({ closeToast, message }) => {
  return (
    <div className="relative flex h-full w-[700px] items-center rounded-xl bg-gray2">
      <div className="z-10 flex items-center justify-between gap-10 px-6 py-1">
        <p className=" text-white">{message}</p>
        <button
          onClick={() => closeToast()}
          className="flex h-8 w-16 items-center justify-center rounded-[53px] bg-white/10"
        >
          <XIcon className="h-3 w-3 text-white" />
        </button>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 271 64"
        className="absolute h-full"
      >
        <g filter="url(#filter0_f_77_267)">
          <circle
            cx="29.5"
            cy="-43.5"
            r="85.5"
            fill="url(#paint0_linear_77_267)"
          ></circle>
        </g>
        <g filter="url(#filter1_f_77_267)">
          <circle cx="29.5" cy="-3.5" r="41.5" fill="green"></circle>
        </g>
        <defs>
          <filter
            id="filter0_f_77_267"
            width="483"
            height="483"
            x="-212"
            y="-285"
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
              result="effect1_foregroundBlur_77_267"
              stdDeviation="78"
            ></feGaussianBlur>
          </filter>
          <filter
            id="filter1_f_77_267"
            width="187"
            height="187"
            x="-64"
            y="-97"
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
              result="effect1_foregroundBlur_77_267"
              stdDeviation="26"
            ></feGaussianBlur>
          </filter>
          <linearGradient
            id="paint0_linear_77_267"
            x1="37.5"
            x2="29.5"
            y1="-40.5"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="green"></stop>
            <stop offset="1" stopColor="green" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SuccessToast;

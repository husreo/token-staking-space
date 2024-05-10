import React from "react";

function FighterJetIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 76 88"
      className={className}
    >
      <g clipPath="url(#clip0_6324_158)" filter="url(#filter0_d_6324_158)">
        <g filter="url(#filter1_i_6324_158)">
          <path
            fill="url(#paint0_linear_6324_158)"
            d="M35.22 10.058l-.017.05-8.124 28.698-7.13 4.466v-4.957a2.108 2.108 0 10-4.215 0v7.597l-.904.567-.108.072a16.964 16.964 0 00-2.886 2.62V42.9a2.108 2.108 0 00-4.215 0v18.204c0 1.164.943 2.108 2.107 2.108.04 0 .08-.004.12-.006.34.076.695.09 1.048.037l12.537-1.899-4.382 8.838-.019.044a2.133 2.133 0 00-.163.51 2.22 2.22 0 00-.035.335l-.002.047.002.03c0 .043.003.087.006.13.002.028.004.057.008.085.004.037.01.072.016.108.006.035.011.069.019.103.006.029.014.057.022.085.01.04.02.078.032.116l.027.073.046.117c.01.025.024.05.036.075.017.034.034.07.053.104.016.03.034.057.052.086.017.028.034.056.052.082.023.034.048.065.072.097l.049.063c.027.032.057.063.086.095l.052.054c.029.028.06.055.09.082.022.019.043.038.066.056.027.022.055.043.084.063.029.021.058.043.088.062.024.016.05.03.074.045.037.022.075.044.113.064.01.004.017.01.026.014l.043.019a2.136 2.136 0 00.512.164 2.03 2.03 0 00.334.034l.048.002h9.579l5.36 5.852a2.65 2.65 0 003.946-.046l5.072-5.806h10.164c1.136 0 2.06-.9 2.103-2.026l.003-.056.001-.025-.002-.04a2.096 2.096 0 00-.217-.927l-4.382-8.838 12.538 1.898a2.847 2.847 0 002.656-1.045c.382-.382.618-.909.618-1.492V42.471a2.108 2.108 0 00-4.215 0v6.67a16.944 16.944 0 00-2.885-2.62l-.052-.038-.961-.603v-7.994a2.108 2.108 0 00-4.216 0v5.345l-7.126-4.479-8.113-28.595-.03-.099A2.933 2.933 0 0038 8.063c-1.26 0-2.378.801-2.781 1.995z"
          ></path>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_6324_158"
          width="86.25"
          height="86.25"
          x="-5.125"
          y="0.875"
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
          <feGaussianBlur stdDeviation="3.594"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_6324_158"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_6324_158"
            result="shape"
          ></feBlend>
        </filter>
        <filter
          id="filter1_i_6324_158"
          width="60.759"
          height="71.875"
          x="7.621"
          y="8.063"
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
          <feGaussianBlur stdDeviation="15.234"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          ></feComposite>
          <feColorMatrix values="0 0 0 0 0.696094 0 0 0 0 0.927063 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
          <feBlend in2="shape" result="effect1_innerShadow_6324_158"></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_6324_158"
          x1="9.126"
          x2="79.022"
          y1="7.906"
          y2="67.448"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6100FF" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#0085FF" stopOpacity="0.36"></stop>
        </linearGradient>
        <clipPath id="clip0_6324_158">
          <path
            fill="#fff"
            d="M0 0H71.875V71.875H0z"
            transform="rotate(-90 41 38.938)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default FighterJetIcon;

import React from "react";

function LogoPlain({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="654"
      height="480"
      fill="none"
      viewBox="0 0 654 480"
      className={className}
    >
      <g clipPath="url(#clip0_994_3794)">
        <path
          fill="#929292"
          fillOpacity="0.07"
          d="M461.53 329.095c0-5.416-2.197-10.628-6.029-14.46l-32.7-32.393v166.412l-52.116-52.984-16.759-16.708 49.459-48.641V110.056l-78.224-74.29-78.021 74.29v218.732l51.043 50.839-70.407 69.18V282.191l-32.7 32.393a20.296 20.296 0 00-6.029 14.46v211.937l58.093-57.123v59.882a20.373 20.373 0 006.081 14.51l26.364 26.007V451.975l26.313-25.853v177.346l19.365 19.212 19.364-19.212V425.866l26.467 26.109v136.114l26.364-26.007a20.372 20.372 0 006.08-14.51V483.96l57.992 57.225v-212.09zM285.87 311.11V126.406l39.291-37.452 39.495 37.452v187.923l-38.065 37.4-40.721-40.619z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_994_3794">
          <path
            fill="#fff"
            d="M0 0H272.483V586.914H0z"
            transform="translate(189.047 35.766)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default LogoPlain;

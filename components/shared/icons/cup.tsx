import React from "react";

function CupIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 30 30"
    >
      <g filter="url(#filter0_d_1756_336)">
        <path
          fill="#EBFF00"
          stroke="#EBFF00"
          d="M22.48 8.43h0c.243.258.37.61.35.966-.135 2.25-.78 4.033-1.807 5.298-1.023 1.259-2.45 2.038-4.229 2.243l-.586.067.163.568.737 2.566.104.362h.377c.6 0 1.087.487 1.087 1.088v1.245h-7.341v-1.245c0-.601.486-1.088 1.087-1.088h.377l.104-.362.737-2.566.163-.569-.587-.066c-1.782-.203-3.213-.982-4.237-2.24-1.03-1.266-1.675-3.051-1.81-5.302-.021-.358.107-.71.347-.964h.001c.239-.254.58-.402.93-.402h2.073l-.01-.511a43.426 43.426 0 01-.007-.351h9.003l-.007.351-.011.511h2.063c.35 0 .691.148.93.401zm-12.97-.9H8.446A1.786 1.786 0 006.67 9.424L9.51 7.53zM7.834 9.347h0v.007c.118 1.958.766 5.245 3.733 6.49l1.533.642-.924-1.381c-.639-.956-1.346-2.723-1.59-5.946l-.035-.462H8.447h0c-.042 0-.26 0-.44.186a.623.623 0 00-.172.464zm9.996 5.752l-.925 1.386 1.536-.648c2.957-1.249 3.603-4.526 3.723-6.484h0v-.008a.622.622 0 00-.173-.464.602.602 0 00-.439-.186h-2.099l-.035.462c-.244 3.22-.949 4.984-1.588 5.942z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_1756_336"
          width="32"
          height="32"
          x="-1"
          y="-1"
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
          <feGaussianBlur stdDeviation="3"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0.921569 0 0 0 0 1 0 0 0 0 0 0 0 0 0.45 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1756_336"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1756_336"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default CupIcon;
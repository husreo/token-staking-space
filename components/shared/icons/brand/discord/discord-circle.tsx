function DiscordCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      className={className}
    >
      <g clipPath="url(#clip0_1551_32205)">
        <rect
          width="32"
          height="32"
          fill="#0D0D0D"
          fillOpacity="0.08"
          rx="16"
        ></rect>
        <rect
          width="32"
          height="32"
          fill="#F3F3F3"
          fillOpacity="0.1"
          rx="16"
        ></rect>
        <g clipPath="url(#clip1_1551_32205)">
          <g clipPath="url(#clip2_1551_32205)">
            <path
              fill="#F3F3F3"
              d="M21.09 10.732a11.945 11.945 0 00-3.025-.95c-.13.235-.283.552-.388.804a11.108 11.108 0 00-3.353 0 8.59 8.59 0 00-.392-.805 11.908 11.908 0 00-3.029.953C8.99 13.628 8.47 16.45 8.73 19.232a12.096 12.096 0 003.711 1.902 9.22 9.22 0 00.795-1.31 7.814 7.814 0 01-1.252-.609c.105-.077.208-.159.307-.242 2.413 1.128 5.035 1.128 7.42 0 .1.083.203.165.307.242-.397.24-.817.445-1.254.61.23.46.495.899.795 1.31a12.074 12.074 0 003.713-1.903c.305-3.225-.52-6.02-2.18-8.5zm-7.526 6.79c-.725 0-1.319-.677-1.319-1.5 0-.824.582-1.502 1.319-1.502s1.33.676 1.318 1.501c.001.824-.581 1.5-1.318 1.5zm4.872 0c-.724 0-1.318-.677-1.318-1.5 0-.824.581-1.502 1.318-1.502.738 0 1.332.676 1.319 1.501 0 .824-.581 1.5-1.319 1.5z"
            ></path>
          </g>
        </g>
        <rect width="32" height="32" stroke="#131313" rx="16"></rect>
      </g>
      <defs>
        <clipPath id="clip0_1551_32205">
          <rect width="32" height="32" fill="#fff" rx="16"></rect>
        </clipPath>
        <clipPath id="clip1_1551_32205">
          <path fill="#fff" d="M0 0H16V16H0z" transform="translate(8 8)"></path>
        </clipPath>
        <clipPath id="clip2_1551_32205">
          <path fill="#fff" d="M0 0H16V16H0z" transform="translate(8 8)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default DiscordCircle;

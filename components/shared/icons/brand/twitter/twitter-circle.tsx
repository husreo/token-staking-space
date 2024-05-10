function TwitterCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      className={className}
    >
      <g clipPath="url(#clip0_1551_32211)">
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
        <g clipPath="url(#clip1_1551_32211)">
          <g clipPath="url(#clip2_1551_32211)">
            <path
              fill="#F3F3F3"
              d="M23.668 12.172c-.23.103-.468.189-.71.259.287-.324.505-.705.639-1.123a.237.237 0 00-.346-.275 5.582 5.582 0 01-1.65.652 3.152 3.152 0 00-5.327 2.657 8.061 8.061 0 01-5.533-2.935.236.236 0 00-.387.03 3.146 3.146 0 00.323 3.624 2.666 2.666 0 01-.422-.188.237.237 0 00-.351.201v.042a3.16 3.16 0 001.54 2.708c-.08-.008-.16-.02-.239-.035a.237.237 0 00-.27.305 3.147 3.147 0 002.307 2.11 5.57 5.57 0 01-2.978.85 5.69 5.69 0 01-.666-.04.237.237 0 00-.156.435 8.49 8.49 0 004.592 1.346c3.205 0 5.21-1.512 6.328-2.78 1.394-1.581 2.193-3.674 2.193-5.742a8.74 8.74 0 00-.003-.26 6.121 6.121 0 001.408-1.493.237.237 0 00-.292-.348z"
            ></path>
          </g>
        </g>
        <rect width="32" height="32" stroke="#131313" rx="16"></rect>
      </g>
      <defs>
        <clipPath id="clip0_1551_32211">
          <rect width="32" height="32" fill="#fff" rx="16"></rect>
        </clipPath>
        <clipPath id="clip1_1551_32211">
          <path fill="#fff" d="M0 0H16V16H0z" transform="translate(8 8)"></path>
        </clipPath>
        <clipPath id="clip2_1551_32211">
          <path fill="#fff" d="M0 0H16V16H0z" transform="translate(8 8)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default TwitterCircle;

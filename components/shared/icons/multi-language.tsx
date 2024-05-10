function MultiLanguageIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11 21c5.52 0 10-4.48 10-10 0-5.525-4.48-10-10-10C5.475 1 1 5.475 1 11c0 5.52 4.475 10 10 10z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1 11h20"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11 21c2.205 0 4-4.48 4-10 0-5.525-1.795-10-4-10-2.21 0-4 4.475-4 10 0 5.52 1.79 10 4 10z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.925 4.07a9.968 9.968 0 007.07 2.925c2.76 0 5.26-1.12 7.07-2.93M18.07 17.925a9.972 9.972 0 00-7.075-2.93A9.967 9.967 0 003.92 17.92"
      ></path>
    </svg>
  );
}

export default MultiLanguageIcon;

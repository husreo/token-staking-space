const AndroidIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={12}
    viewBox="0 0 20 12"
    fill="none"
    className={className}
  >
    <path
      d="M18.292 11H1.704a8.332 8.332 0 018.292-7.5c4.32 0 7.87 3.287 8.291 7.5h.005z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path
      d="M5.833 4.333L4.166 1.417M13.75 4.333l1.666-2.916"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.25 7.25a.833.833 0 100 1.667.833.833 0 000-1.667zM13.75 7.25a.833.833 0 100 1.667.833.833 0 000-1.667z"
      fill="currentColor"
    />
  </svg>
);

export default AndroidIcon;

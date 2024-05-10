function ChevronUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 8 8"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.75"
        d="M1.958 1.086h5.25v5.25M1.083 7.205l6.123-6.122"
      ></path>
    </svg>
  );
}

export default ChevronUpIcon;

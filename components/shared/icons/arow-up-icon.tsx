function ArrowUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 14"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M13.5 8c0 2-1.333 5.333-6 5.333S1.5 10 1.5 8M7.5.7v9.296M3.5 4.666l4-4 4 4"
      ></path>
    </svg>
  );
}

export default ArrowUpIcon;

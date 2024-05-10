function ChangeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 14"
      className={className}
    >
      <path
        stroke="#090B0A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M13.5 5.334H1.497M9.5 1.334l4 4M1.764 8.668h12"
      ></path>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1.764 8.668l4 4"
      ></path>
    </svg>
  );
}

export default ChangeIcon;

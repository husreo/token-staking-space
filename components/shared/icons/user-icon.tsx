function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        d="M10 1.667a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zM17.5 18.333c0-4.145-3.358-7.5-7.5-7.5a7.495 7.495 0 00-7.5 7.5"
      ></path>
    </svg>
  );
}

export default UserIcon;

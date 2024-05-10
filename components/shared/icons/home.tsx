const HomeIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      fill="none"
      className={className}
    >
      <path
        d="M8.02 1.83997L2.63 6.03997C1.73 6.73997 1 8.22997 1 9.34997V16.76C1 19.08 2.89 20.98 5.21 20.98H16.79C19.11 20.98 21 19.08 21 16.77V9.48997C21 8.27997 20.19 6.72997 19.2 6.03997L13.02 1.70997C11.62 0.72997 9.37 0.77997 8.02 1.82997V1.83997Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;

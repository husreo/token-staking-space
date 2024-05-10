function TwitterIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 19 18"
      className={className}
    >
      <path
        fill="#fff"
        d="M.994.441l6.95 9.292L.95 17.288h1.574l6.123-6.614 4.947 6.614h5.356l-7.34-9.814L18.118.44h-1.574l-5.639 6.092L6.35.441H.994zm2.315 1.16h2.46l10.866 14.528h-2.46L3.309 1.601z"
      ></path>
    </svg>
  );
}

export default TwitterIcon;

export default function Heart({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M12.62 21.31C12.28 21.43 11.72 21.43 11.38 21.31C8.48 20.32 2 16.19 2 9.18C2 6.09 4.49 3.59 7.56 3.59C9.38 3.589 10.99 4.47 12 5.83C13.01 4.47 14.63 3.59 16.44 3.59C19.51 3.59 22 6.09 22 9.18C22 16.18 15.52 20.31 12.62 21.3V21.31Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

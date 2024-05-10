function Pay({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 23 10"
      className={className}
    >
      <path
        fill="#fff"
        d="M.873 10V.812h3.623c1.916 0 3.176 1.142 3.176 2.927 0 1.772-1.26 2.927-3.176 2.927H2.382V10H.873zm3.504-7.875H2.382v3.229h1.982c1.077 0 1.772-.63 1.772-1.615 0-.997-.682-1.614-1.759-1.614zM8.634 10H7.072L10.511.812h1.798L15.735 10H14.12l-.866-2.27H9.487L8.634 10zm2.73-7.56L9.907 6.443h2.927l-1.47-4.003zM17.982 6.6L14.557.814h1.772l2.415 4.2 2.48-4.2h1.693L19.492 6.6V10h-1.51V6.6z"
      ></path>
    </svg>
  );
}

export default Pay;

function Wallet({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 50 10"
      className={className}
    >
      <path
        fill="#fff"
        d="M3.485 10L.873.812 2.435.8 4.39 8.084 6.438.812h1.43l1.996 7.272L11.832.812h1.55L10.742 10H8.984L7.107 3.24 5.257 10H3.485zM14.213 10h-1.562L16.09.812h1.798L21.314 10h-1.615l-.866-2.27h-3.767L14.213 10zm2.73-7.56l-1.457 4.003h2.927l-1.47-4.003zM27.716 10h-5.46V.812h1.51v7.85h3.95V10zM34.278 10h-5.46V.812h1.51v7.85h3.95V10zM35.38 10V.812h5.999v1.34H36.89v2.545h3.702v1.3H36.89V8.66h4.646V10h-6.155zM42.07 2.151V.812h7.18v1.34h-2.835V10h-1.51V2.15h-2.834z"
      ></path>
    </svg>
  );
}

export default Wallet;

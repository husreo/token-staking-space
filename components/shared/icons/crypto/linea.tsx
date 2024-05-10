import React from "react";

function Linea({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 28"
      className={className}
    >
      <circle cx="13.667" cy="13.667" r="11.667" fill="#000"></circle>
      <path
        fill="#fff"
        d="M16.924 19.582H9v-8.348h1.813v6.731h6.11v1.617zM17.216 11.234a1.617 1.617 0 100-3.234 1.617 1.617 0 000 3.234z"
      ></path>
    </svg>
  );
}

export default Linea;

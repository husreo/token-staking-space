import React from "react";

function Union({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="106"
      height="36"
      fill="none"
      viewBox="0 0 106 36"
      className={className}
    >
      <mask id="path-1-inside-1_752_2319" fill="#fff">
        <path
          fillRule="evenodd"
          d="M0 16L16 0h90v20L90 36H0V16z"
          clipRule="evenodd"
        ></path>
      </mask>
      <path
        fill="#fff"
        d="M16 0v-1h-.414l-.293.293L16 0zM0 16l-.707-.707-.293.293V16h1zM106 0h1v-1h-1v1zm0 20l.707.707.293-.293V20h-1zM90 36v1h.414l.293-.293L90 36zM0 36h-1v1h1v-1zM15.293-.707l-16 16 1.414 1.414 16-16-1.414-1.414zM16 1h12v-2H16v2zm12 0h50v-2H28v2zm50 0h12v-2H78v2zm28-2H90v2h16v-2zm1 21V0h-2v20h2zM90.707 36.707l16-16-1.414-1.414-16 16 1.414 1.414zM90 35H78v2h12v-2zm-12 0H28v2h50v-2zm-50 0H16v2h12v-2zM0 37h16v-2H0v2zm-1-21v20h2V16h-2z"
        mask="url(#path-1-inside-1_752_2319)"
      ></path>
    </svg>
  );
}

export default Union;

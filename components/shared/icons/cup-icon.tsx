import { SVGAttributes } from "react";

const CupIcon = (props: SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 20.1 20.1"
    width="20px"
    height="20px"
    {...props}
  >
    <path
      d="M19.5 1.8c-.4-.4-1-.7-1.6-.7H16v-1H4v1H2.2c-.6 0-1.2.2-1.6.7-.4.4-.6 1-.5 1.6C.4 9 3.3 12.5 7.9 13L7 16.1c-1.1 0-1.9.9-1.9 1.9v2.1h10V18c0-1.1-.9-1.9-1.9-1.9l-.9-3.1c4.6-.5 7.4-4 7.8-9.6 0-.6-.2-1.2-.6-1.6zM2.1 3.3v-.1h2.1c.3 3.9 1.2 6.2 2 7.4-3.2-1.4-4-5-4.1-7.3zM14 10.5c.8-1.3 1.7-3.5 2-7.4h2.1v.1c-.2 2.4-.9 6-4.1 7.3z"
      fill="currentColor"
    />
  </svg>
);

export default CupIcon;
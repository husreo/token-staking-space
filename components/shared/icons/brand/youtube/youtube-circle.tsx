function YoutubeCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      className={className}
    >
      <g clipPath="url(#clip0_1551_32235)">
        <rect
          width="32"
          height="32"
          fill="#0D0D0D"
          fillOpacity="0.08"
          rx="16"
        ></rect>
        <rect
          width="32"
          height="32"
          fill="#F3F3F3"
          fillOpacity="0.1"
          rx="16"
        ></rect>
        <g clipPath="url(#clip1_1551_32235)">
          <g clipPath="url(#clip2_1551_32235)">
            <path
              fill="#F3F3F3"
              fillRule="evenodd"
              d="M22.232 11.002c.689.184 1.227.724 1.413 1.413.488 1.967.456 5.684.01 7.681a2.002 2.002 0 01-1.413 1.413c-1.946.482-10.661.422-12.494 0a2.002 2.002 0 01-1.414-1.413c-.46-1.874-.428-5.837-.01-7.67a2.002 2.002 0 011.413-1.414c2.602-.543 11.569-.367 12.495-.01zm-7.784 2.857l4.179 2.397-4.179 2.396V13.86z"
              clipRule="evenodd"
            ></path>
          </g>
        </g>
        <rect width="32" height="32" stroke="#131313" rx="16"></rect>
      </g>
      <defs>
        <clipPath id="clip0_1551_32235">
          <rect width="32" height="32" fill="#fff" rx="16"></rect>
        </clipPath>
        <clipPath id="clip1_1551_32235">
          <path fill="#fff" d="M0 0H16V16H0z" transform="translate(8 8)"></path>
        </clipPath>
        <clipPath id="clip2_1551_32235">
          <path fill="#fff" d="M0 0H16V16H0z" transform="translate(8 8)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default YoutubeCircle;

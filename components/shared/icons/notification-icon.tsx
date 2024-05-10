function NotificationIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="0.875"
        d="M7.011 1.167a3.884 3.884 0 00-3.885 3.885v1.225c0 .396-.163.991-.367 1.33l-.741 1.236c-.455.764-.14 1.616.7 1.896 2.788.927 5.798.927 8.587 0a1.295 1.295 0 00.7-1.896l-.741-1.237c-.204-.338-.368-.939-.368-1.33V5.053c-.006-2.135-1.755-3.885-3.89-3.885h.005z"
      ></path>
      <path
        stroke="#fff"
        strokeWidth="0.875"
        d="M8.943 10.978A1.95 1.95 0 017 12.921c-.53 0-1.02-.222-1.37-.572-.35-.35-.572-.84-.572-1.371"
      ></path>
    </svg>
  );
}

export default NotificationIcon;

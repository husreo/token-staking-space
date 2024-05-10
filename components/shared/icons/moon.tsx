const MoonIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.0252 2.20499C11.2902 2.91499 9.27024 5.39999 9.27024 8.35999C9.27024 11.87 12.1152 14.72 15.6302 14.72C18.5852 14.72 21.0752 12.7 21.7852 9.96499C21.9152 10.615 21.9902 11.295 21.9902 11.99C21.9902 17.51 17.5102 21.99 11.9902 21.99C6.46523 21.99 1.99023 17.51 1.99023 11.99C1.99023 6.46499 6.46523 1.98999 11.9902 1.98999C12.6802 1.98999 13.3602 2.05999 14.0152 2.19499L14.0252 2.20499Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoonIcon;

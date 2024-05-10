import { CSSProperties } from "react";

function RocketIcon({ className = "", style = {} }: { className?: string, style?: CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 50"
      className={className}
      style={{...style}}
    >
      <path
        fill="#00CF9D"
        d="M23.213 24.99c0-.462-.187-.906-.513-1.233l-2.786-2.76v14.178l-4.44-4.514-1.428-1.424 4.214-4.143V6.329L11.596 0 4.949 6.329v18.634l4.348 4.331L3.3 35.188V20.993l-2.785 2.76A1.73 1.73 0 000 24.985V43.04l4.95-4.866v5.101c0 .466.186.91.517 1.236l2.246 2.216v-11.27l2.242-2.202v15.108L11.605 50l1.65-1.637v-15.13l2.254 2.225v11.595l2.246-2.215c.33-.327.518-.77.518-1.236v-5.42l4.94 4.875V24.99zM8.248 23.456V7.722l3.348-3.19 3.364 3.19v16.01l-3.242 3.185-3.47-3.46z"
      ></path>
    </svg>
  );
}

export default RocketIcon;

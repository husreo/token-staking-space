import classNames from "classnames";
import styles from "./style.module.css";

type Props = {
  variant?:
    | "default"
    | "muted"
    | "error"
    | "transparent"
    | "secondary"
    | "green";
  size?: "small" | "default" | "large";
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  variant = "default",
  size = "default",
  children,
  className = "",
  loading,
  ...rest
}) => {
  return (
    <button
      disabled={loading}
      className={classNames(
        styles.btn_base,
        styles[`btn__size__${size}`],
        styles[`btn__variants__${variant}`],
        className,
      )}
      {...rest}
    >
      {loading && (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 transition-all duration-150 ease-in">
          <svg
            className="w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {children}
    </button>
  );
};
export default Button;

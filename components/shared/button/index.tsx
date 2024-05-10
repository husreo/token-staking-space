import classNames from "classnames";
import "./style.css";
import styles from "./styleAnimation.module.css";

type Props = {
  variant?:
    | "default"
    | "muted"
    | "error"
    | "transparent"
    | "secondary"
    | "cancel"
    | "outlined"
    | "gradient"
    | "green"
    | "custom";
  size?: "small" | "default" | "large";
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  isAnimation?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AnimationSpin = () => {
  return (
    <svg
      className="w-5 animate-spin"
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
  );
};
const Button: React.FC<Props> = ({
  variant = "default",
  size = "default",
  children,
  className = "",
  loading,
  isAnimation = true,
  ...rest
}) => {
  return (
    <button
      disabled={loading}
      className={classNames(
        styles.btn_base,
        styles[`btn__size__${size}`],
        styles[`btn__variants__${variant}`],
        "button",
        isAnimation && "button--greip",
        className,
        !isAnimation && "!bg-fcon",
      )}
      {...rest}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && (
          <div className="pointer-events-none flex items-center justify-center transition-all duration-150 ease-in">
            <AnimationSpin />
          </div>
        )}
        <div>
          <div className="relative">{children}</div>
        </div>
      </div>
    </button>
  );
};
export default Button;

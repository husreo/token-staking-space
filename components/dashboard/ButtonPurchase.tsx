import { classNames } from "utils/string";

type Props = {
  children: React.ReactNode;
  active?: boolean;
  comingSoon?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonPurchase: React.FC<Props> = ({
  children,
  className = "",
  active,
  disabled,
  comingSoon,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        "group relative w-full rounded-lg border-[2px] bg-transparent text-white transition-all duration-100 ease-linear",
        className,
        !disabled
          ? active
            ? "border-fcon bg-[#00ffc20f]"
            : "border-gray3 hover:border-fcon/50"
          : "cursor-not-allowed border-gray2",
      )}
      {...rest}
    >
      <span
        className={classNames(
          disabled ? "opacity-50" : "opacity-100",
          "w-full",
        )}
      >
        {children}
      </span>
      {comingSoon ? (
        <div className="absolute -top-3 right-2 rounded-[2px] border-[2px] border-gray2 bg-gray1 px-1 py-[2px] font-aeonikMono text-[11px] font-medium text-white">
          SOON
        </div>
      ) : null}
    </button>
  );
};

export default ButtonPurchase;

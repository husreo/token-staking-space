import { classNames } from "utils/string";

const HomeSubTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={classNames(
        "font-aeonikPro text-base font-normal leading-[26px] tracking-[1.2px] md:text-lg",
        className,
      )}
    >
      {children}
    </h3>
  );
};

export default HomeSubTitle;

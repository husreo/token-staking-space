import { classNames } from "utils/string";

const HomeTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={classNames(
        "font-aeonikPro text-3xl font-normal text-white md:text-4xl lg:text-5xl lg:leading-[62px]",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default HomeTitle;

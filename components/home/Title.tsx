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
        "text-4xl font-bold leading-[48px] md:text-5xl lg:text-[82px] lg:leading-[82px]",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default HomeTitle;

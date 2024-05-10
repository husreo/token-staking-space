import { classNames } from "utils/string";

const SmallHomeTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={classNames(
        "text-4xl font-bold leading-[48px] md:text-5xl lg:text-[32px] lg:leading-[50px]",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default SmallHomeTitle;

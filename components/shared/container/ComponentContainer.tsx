import classNames from "classnames";

const ComponentContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classNames("mx-auto w-full max-w-[1284px]", className)}>
      {children}
    </div>
  );
};

export default ComponentContainer;

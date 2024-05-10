const RowInfo = ({
  title1,
  value1,
  title2,
  value2,
}: {
  title1: any;
  value1: any;
  title2: any;
  value2: any;
}) => {
  return (
    <div className="flex max-[375px]:flex-col items-start justify-between gap-1">
      <div>
        {typeof title1 === "string" ? (
          <div className="uppercase opacity-80">{title1}</div>
        ) : (
          title1
        )}
        {typeof value1 === "string" ? (
          <div className="mt-[4px] text-2xl">{value1}</div>
        ) : (
          value1
        )}
      </div>
      <div className="text-right max-[375px]:text-left">
        {typeof title2 === "string" ? (
          <div className="uppercase opacity-80">{title2}</div>
        ) : (
          title2
        )}
        <div className="mt-[4px] text-2xl">{value2}</div>
      </div>
    </div>
  );
};

export default RowInfo;

import { CircleProgress } from "./common";

const ProgressBarVertical = () => {
  const active = false;
  return (
    <div className="relative block w-5 lg:hidden">
      <div
        style={{
          background:
            "linear-gradient(91deg, #04C899 50.56%, #3FD8B3 66.25%, #009974 90.24%)",
        }}
        className="absolute left-1/2 top-0 z-10 h-[12.5%] w-1 -translate-x-1/2 transform rounded-[10px]"
      ></div>
      <div className="absolute bottom-0 left-1/2 top-0 z-[1] w-1 -translate-x-1/2 transform rounded-[10px] bg-gray3"></div>
      <div className="flex h-full flex-col items-center justify-around">
        <CircleProgress active className="text-fcon" />
        <CircleProgress className="text-fcon" />
        <CircleProgress className="text-fcon" />
        <CircleProgress className="text-fcon" />
      </div>
    </div>
  );
};

export default ProgressBarVertical;

import { CircleProgress } from "./common";

const ProgressBarHorizontal = () => {
  const active = false;
  return (
    <div className="relative hidden h-5 w-full lg:block">
      <div
        style={{
          background:
            "linear-gradient(91deg, #04C899 50.56%, #3FD8B3 66.25%, #009974 90.24%)",
        }}
        className="absolute left-0 top-1/2 z-10 h-1 w-[12.5%] -translate-y-1/2 transform rounded-[10px]"
      ></div>
      <div className="absolute left-0 right-0 top-1/2 z-[1] h-1 -translate-y-1/2 transform rounded-[10px] bg-gray3"></div>
      <div className="flex items-center justify-around">
        <CircleProgress active className="text-fcon" />
        <CircleProgress className="text-fcon" />
        <CircleProgress className="text-fcon" />
        <CircleProgress className="text-fcon" />
      </div>
    </div>
  );
};

export default ProgressBarHorizontal;

import RocketIcon from "@/components/shared/icons/rocket";

const LoaderSpinner = ({ width }: { width?: number }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(#222f3e, 0.2)",
        height: width ? `${width * 4}px` : "120px",
        width: width ? `${width * 4}px` : "120px",
      }}
      className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center overflow-hidden rounded-full border border-transparent bg-[center_center] bg-no-repeat text-center shadow-[0px_0px_24px_4px_rgba(#2a3d38,0.2)]`}
    >
      <RocketIcon style={{ width: `${width}px` }} />
      <div
        style={{
          backgroundImage:
            "radial-gradient(circle, transparent 68%, rgba(42,61,56,1) 70%)",
        }}
        className="w-[calc(100% + 2px)] h-[calc(100% + 2px) absolute left-[-1px] top-[-1px] animate-Glow rounded-full shadow-[inset_0px_0px_0px_0px_rgba(#2a3d38,0)]"
      ></div>
      <div className="absolute left-1/2 top-1/2 z-[999] h-full w-full origin-[50%_50%] -translate-x-1/2 -translate-y-1/2 rotate-0 transform animate-loading-spin rounded-full border-2 border-[#00FFC2] border-b-[transparent] border-l-[transparent] border-r-[transparent]"></div>
    </div>
  );
};

export default LoaderSpinner;

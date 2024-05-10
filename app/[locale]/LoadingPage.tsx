import RocketIcon from "@/components/shared/icons/rocket";

const LoaderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed left-0 top-0 z-[9999] h-full w-full bg-black text-white transition-all ">
      {children}
    </div>
  );
};
const LoaderSpinner = () => {
  return (
    <div
      style={{
        backgroundColor: "rgba(#222f3e, 0.2)",
      }}
      className={`absolute left-1/2 top-1/2 flex h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center overflow-hidden rounded-full border border-transparent bg-[center_center] bg-no-repeat text-center shadow-[0px_0px_24px_4px_rgba(#2a3d38,0.2)]`}
    >
      <RocketIcon className="w-[58px]" />
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
const LoaderText = ({
  dataFlicker0,
  dataFlicker1,
}: {
  dataFlicker0: string;
  dataFlicker1: string;
}) => {
  return (
    <span className="absolute left-1/2 top-[65%] ml-5 block -translate-x-1/2 -translate-y-1/2  transform animate-loading-pulse text-center font-aeonikPro tracking-[12px] text-[#2a3d38] text-shadow-1 ">
      <span className="absolute right-0 animate-loading-flicker text-[#2a3d38] opacity-0 text-shadow-2">
        {dataFlicker0}
      </span>
      <span
        style={{
          animationDelay: "0.5s",
        }}
        className="absolute left-0 animate-loading-flicker text-[#2a3d38] opacity-0 text-shadow-2"
      >
        {dataFlicker1}
      </span>
    </span>
  );
};
export default function LoadingPage() {
  return (
    <LoaderContainer>
      <LoaderSpinner></LoaderSpinner>
      <LoaderText dataFlicker0="LOAD" dataFlicker1="ING"></LoaderText>
    </LoaderContainer>
  );
}

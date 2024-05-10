import SelectCollection from "./SelectCollection";

const Management = () => {
  return (
    <div className="col-span-4 row-span-1 flex flex-col justify-between gap-4 border-r border-gray3 p-2 font-aeonikPro">
      <div className="flex flex-1 flex-col justify-between px-10 pt-10 text-white">
        <div>
          <p className="text-[28px] font-medium">Inventory</p>
          <p className="text-[12px] leading-[22px] opacity-80">
            NFTs that you transfered to Space Falcon profile.
          </p>
          <SelectCollection />
        </div>
        <div className="rounded-xl border border-white/[0.12] p-4 text-[13px] leading-5">
          Move NFTs from wallet to inventory and start farming{" "}
          <span className="text-fcon">$FCON & Falcon Points</span>
        </div>
      </div>
    </div>
  );
};

export default Management;

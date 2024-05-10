import Button from "@/components/shared/button";
import Image from "next/image";
import FPBadge from "public/images/FalconBadge/falcon-point1.png";
import { classNames } from "utils/string";
import ModalStakingNFT from "../ModalStakingNFT";

const InventoryItem = ({
  name,
  uri,
  withdrawNFT,
  isStaked,
  lockPeriod,
  lockedAt,
  mint,
  loading,
  fp_daily_earning,
}: {
  name: string;
  uri: string;
  withdrawNFT: () => void;
  isStaked?: boolean;
  lockedAt: string;
  lockPeriod: number;
  mint: string;
  loading?: boolean;
  fp_daily_earning?: number;
}) => {
  return (
    <div className="mb-4 flex flex-col gap-4 rounded-2xl bg-gray2 p-6 lg:flex-row ">
      <div className="relative h-[148px] w-[148px] rounded-lg border border-white/[0.17]">
        <Image src={uri} alt="image" fill className="rounded-lg object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="mb-[14px] text-[20px] font-medium max-[500px]:text-center">
            {name}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {!isStaked
                ? // <Button
                  //   disabled={loading}
                  //   className="h-9 rounded px-4 text-black"
                  // >
                  //   Burn for FCON
                  // </Button>
                  null
                : null}
              <ModalStakingNFT
                lockPeriod={lockPeriod}
                lockedAt={lockedAt}
                nftName={name}
                isStaked={isStaked}
                mint={mint}
              />
            </div>
            {!isStaked ? (
              <button
                disabled={loading}
                onClick={withdrawNFT}
                className="h-9 rounded border border-white/[0.21] px-4 text-[13px] font-light"
              >
                Withdraw
              </button>
            ) : null}
          </div>
        </div>
        <div
          className={classNames(
            "flex items-center justify-between rounded-md bg-white/[0.05] px-4 py-[10px]",
            isStaked ? "border border-[#B67CFF] bg-[#29272C]" : "",
          )}
        >
          <p className="leading-[21px]">
            Daily FP Earnings <span className="text-fcon">50 FP per day</span>
          </p>
          <div className="flex items-center gap-1">
            <div className="relative inline-block h-4 w-4 rounded-full border border-white/30">
              <Image src={FPBadge} fill alt="fp" />
            </div>
            {fp_daily_earning}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;

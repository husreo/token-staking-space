import HelpIcon from "@/components/shared/icons/help-icon";
import Tooltip from "@/components/shared/tooltip/Tooltip";
import Image from "next/image";
import FPIcon from "public/images/FalconBadge/falcon-point1.png";
import RPIcon from "public/images/FalconBadge/reward-point1.png";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { formatStats } from "utils/string";
import LightBG from "./light-bg";

const StatsTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="ftext-base mb-1 font-medium uppercase text-white opacity-80">
      {children}
    </p>
  );
};

const StatNumber = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-[32px] font-medium text-white">{children}</p>;
};

const UserStats = () => {
  const { session } = useSelector((state: RootState) => state.user);
  const rpBalance = session?.user.balances.rp_balance || 0;
  const fpBalance = session?.user.balances.fp_balance || 0;
  const { profileNFTs } = useSelector((state: RootState) => state.user);
  return (
    <div className="grid grid-cols-12 gap-[18px] font-aeonikPro">
      <div className="relative col-span-12 flex items-center justify-evenly gap-10 overflow-hidden rounded-[10px] border border-black/[0.12] bg-gray1 px-7 py-8 max-[414px]:gap-5 max-[414px]:px-3 lg:col-span-6">
        <div className="pr-16 max-[350px]:pr-0">
          <StatsTitle>Total FP Earned</StatsTitle>
          <div className="flex items-center gap-2">
            <Image src={FPIcon} alt="FP" className="h-10 w-10" />
            <StatNumber>
              {" "}
              {formatStats({
                n: fpBalance,
                notation: fpBalance > 999999 ? "compact" : "standard",
              })}
            </StatNumber>
          </div>
        </div>
        <div className="h-full w-[2px] bg-gray3"></div>
        <div className="pr-16 max-[350px]:pr-0">
          <StatsTitle>Total RP Earned</StatsTitle>
          <div className="flex items-center gap-2">
            <Image src={RPIcon} alt="FP" className="h-10 w-10" />
            <StatNumber>
              {formatStats({
                n: rpBalance,
                notation: rpBalance > 999999 ? "compact" : "standard",
              })}
            </StatNumber>
          </div>
        </div>
        <LightBG className="absolute -bottom-0 left-0 right-0 h-[143px] w-full" />
      </div>
      <div className="relative col-span-12 flex items-center overflow-hidden rounded-[10px] border border-black/[0.12] bg-gray1 px-7 py-8 md:col-span-6 lg:col-span-3">
        <div className="z-10 w-full">
          <div className="flex gap-2">
            <StatsTitle>Total NFTs Value Locked</StatsTitle>
            <Tooltip
              className="text-white"
              buttonCustom={
                <div className="h-fit w-fit opacity-100">
                  <HelpIcon />
                </div>
              }
              content={"Earning 10 FP per NFT a month"}
            />
          </div>
          <StatNumber>{profileNFTs?.length || "$0"}</StatNumber>
        </div>
        <LightBG className="absolute -bottom-0 left-0 right-0 z-0 h-[143px] w-full" />
      </div>
      <div className="relative col-span-12 flex items-center overflow-hidden rounded-[10px] border border-black/[0.12] bg-gray1 px-7 py-8 md:col-span-6 lg:col-span-3">
        <div className="z-10 w-full">
          <div className="flex gap-2">
            <StatsTitle>Total value in profile</StatsTitle>
            <Tooltip
              className="text-white"
              buttonCustom={
                <div className="h-fit w-fit opacity-100">
                  <HelpIcon />
                </div>
              }
              content={"Including NFTs, FP and RP"}
            />
          </div>
          <StatNumber>$0</StatNumber>
        </div>
        <LightBG className="absolute -bottom-0 left-0 right-0 z-0 h-[143px] w-full" />
      </div>
    </div>
  );
};

export default UserStats;

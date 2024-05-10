import Button from "@/components/shared/button";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import Tournament from "public/images/Dashboard/tournament.png";
import FPBadge from "public/images/FalconBadge/falcon-point1.png";
import USDC from "public/images/tokens/usdc.png";
import { classNames } from "utils/string";

export const BenefitWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={classNames(
      "rounded-lg bg-[#2E2E2E] p-2 md:p-3 lg:p-4",
      className,
    )}
  >
    {children}
  </div>
);
const StakingInfor = ({
  nftName,
  onStake,
  loading,
}: {
  nftName: string;
  onStake: () => void;
  loading: boolean;
}) => {
  return (
    <>
      <p className="mb-1 text-center text-[15px] font-medium text-fcon">
        {nftName}
      </p>
      <div>
        <p className="mb-10 text-center text-2xl lg:px-10">
          Stake for 3 months to increase your earnings by 50x and get special
          airdrops
        </p>
        <div className="mb-10 flex flex-col gap-3">
          <BenefitWrapper className="flex items-center gap-5">
            <div className="flex flex-1 gap-3">
              <div className="relative h-[60px] w-[60px] overflow-hidden rounded border border-white/20">
                <Image fill src={Tournament} alt="tournament" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <p className="text-[15px] font-medium">Tournament Slot</p>
                <p className="text-[12px] leading-4 text-white/70">
                  Participate in Tournament to win the prize up to 6000$ FCON worth!
                </p>
              </div>
            </div>
            <Link
              href="https://whitepaper.spacefalcon.com/products/aviatrix-tournament"
              target="_blank"
              style={{
                background: "rgba(167, 92, 255, 0.16)",
              }}
              className="leading-2 h-fit rounded border border-[#9745FF] px-[22px] py-[14px] text-[13px]"
            >
              About Tournament
            </Link>
          </BenefitWrapper>
          <BenefitWrapper className="flex items-center gap-5 ">
            <div className="flex flex-1 gap-3">
              <div className="relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded border border-white/20 bg-[#0E345E]">
                <Image src={USDC} alt="tournament" width={44} />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-[15px] font-medium">Special USDC Airdrop</p>
                <p className="text-[12px] leading-4 text-white/70">Desc</p>
              </div>
            </div>
            <button
              style={{
                background: "rgba(82, 82, 82, 0.16)",
              }}
              className="leading-2 h-fit rounded border border-[#555] px-[22px] py-[14px] text-[13px] text-[#555]"
            >
              TBA
            </button>
          </BenefitWrapper>
          <BenefitWrapper className="flex items-center gap-5 ">
            <div className="flex flex-1 gap-3">
              <div className="relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded border border-white/20 bg-[#16231C]">
                <Image src={FPBadge} alt="tournament" width={36} />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-[15px] font-medium">
                  <span className="text-white/50 line-through">+1</span> +50
                  Daily FP Bonus
                </p>
                <p className="text-[12px] leading-4 text-white/70">
                  Desc change from 1 to 50 FP
                </p>
              </div>
            </div>
          </BenefitWrapper>
        </div>

        <div className="mb-6 flex items-center justify-between text-[15px]">
          <p className="text-white/[0.76]">Unlock Time</p>
          <p className="font-dinPro font-bold">
            {dayjs().add(90, "day").format("hh:mm:ss, MMM DD, YYYY")}
          </p>
        </div>
        <Button
          onClick={onStake}
          className="h-12 !w-full rounded-[1000px] text-black"
        >
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              fill="none"
              viewBox="0 0 21 20"
            >
              <path
                stroke="#000"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M3 3.438l7.5-2.192 7.496 2.187v4.488c0 4.717-3.02 8.908-7.5 10.4A10.973 10.973 0 012.992 7.913V3.42l.009.017z"
              ></path>
            </svg>
            Stake Now
          </div>
        </Button>
      </div>
    </>
  );
};

export default StakingInfor;

import Button from "@/components/shared/button";
import Image from "next/image";
import DefaultNFT from "public/images/Dashboard/default_planet.png";
import { BenefitWrapper } from "./StakingInfor";

const FinishStaking = ({
  nftName,
  closeModal,
}: {
  nftName: string;
  closeModal: () => void;
}) => {
  return (
    <div className="flex h-full flex-col justify-between text-white">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          fill="none"
          viewBox="0 0 60 60"
          className="mx-auto mb-5 text-center"
        >
          <circle cx="30" cy="30" r="30" fill="#24BE3D"></circle>
          <path
            stroke="#fff"
            strokeWidth="4"
            d="M18 29.5l9.709 8.5L41.5 23"
          ></path>
        </svg>
        <p className="mb-10 px-0 text-center text-[32px] font-medium lg:px-5">
          Staking Activated for 3 Months
        </p>
        <BenefitWrapper>
          {" "}
          <div className="flex flex-1 gap-3">
            <div className="relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded border border-white/20 bg-[#0E345E]">
              <Image
                src={DefaultNFT}
                alt="tournament"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-[15px] font-medium">{nftName}</p>
            </div>
          </div>
        </BenefitWrapper>
      </div>
      <Button
        onClick={closeModal}
        className="h-12 !w-full rounded-[1000px] text-black"
      >
        Done
      </Button>
    </div>
  );
};

export default FinishStaking;

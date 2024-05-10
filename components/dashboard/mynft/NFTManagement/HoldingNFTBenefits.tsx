import CheckIcon from "@/components/shared/icons/check-icon";
import XIcon from "@/components/shared/icons/x-icon";
import Image from "next/image";
import FPBadge from "public/images/FalconBadge/falcon-point1.png";

const HoldingNFTBenefits = () => {
  return (
    <div className="mb-4 grid grid-cols-12 gap-5 rounded-2xl border border-[#b67cff] bg-[#29272C] p-4 font-aeonikPro text-white lg:gap-0 lg:p-6 xl:p-8">
      <div className="col-span-12 lg:col-span-5">
        <p className="mb-2 text-2xl font-medium leading-[28px]">
          Earn 50 FP daily by locking your assets for 3 months!
        </p>
        <p className="text-[13px] leading-[22px] text-white/60">
          Consider locking your NFTs to participate in Tournament to win the
          prize up to 6000$ FCON worth and unlock other benefits
        </p>
      </div>
      <div className="col-span-full rounded-lg bg-black/[0.31] px-4 py-3 lg:col-start-7">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-[13px] font-medium leading-[13px]">
              <th className="py-2">Benefits</th>
              <th className="py-2">Unlocked NFTs</th>
              <th className="py-2">Locked NFTs</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            <tr className="border-b border-white/[0.14]">
              <td className="py-2">Tournament Slot</td>
              <td className="text-center">
                <div className="p-2">
                  <XIcon className="w-2 text-white/[0.24]" />
                </div>
              </td>
              <td>
                <div className="p-2">
                  <CheckIcon className="w-4 text-fcon" />
                </div>
              </td>
            </tr>
            <tr className="border-b border-white/[0.14]">
              <td className="py-2">Special FCON Airdrop</td>
              <td>
                {" "}
                <div className="p-2">
                  <XIcon className="w-2 text-white/[0.24]" />
                </div>
              </td>
              <td>
                <div className="p-2">
                  <CheckIcon className="w-4 text-fcon" />
                </div>
              </td>
            </tr>
            <tr className="border-b border-white/[0.14]">
              <td className="py-2">Special SOL Airdrop</td>
              <td>
                {" "}
                <div className="p-2">
                  <XIcon className="w-2 text-white/[0.24]" />
                </div>
              </td>
              <td>
                <div className="p-2">
                  <CheckIcon className="w-4 text-fcon" />
                </div>
              </td>
            </tr>
            <tr className="border-b border-white/[0.14]">
              <td className="py-2">Special USDC Airdrop</td>
              <td>
                {" "}
                <div className="p-2">
                  <XIcon className="w-2 text-white/[0.24]" />
                </div>
              </td>
              <td>
                <div className="p-2">
                  <CheckIcon className="w-4 text-fcon" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="pt-2">Daily FP Bonus</td>
              <td className="pt-2">
                <div className="flex items-center gap-1">
                  <div className="relative inline-block h-4 w-4 rounded-full border border-white/30">
                    <Image src={FPBadge} fill alt="fp" />
                  </div>
                  <p>1/NFT</p>
                </div>
              </td>
              <td className="pt-2">
                <div className="flex items-center gap-1">
                  <div className="relative inline-block h-4 w-4 rounded-full border border-white/30">
                    <Image src={FPBadge} fill alt="fp" />
                  </div>
                  <p>50/NFT</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoldingNFTBenefits;

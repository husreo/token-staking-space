import FPBadge from "public/images/FalconBadge/falcon-point1.png";
import RPBadge from "public/images/FalconBadge/reward-point1.png";
import Image from "next/image";
import FconIcon from "@/components/shared/icons/crypto/fcon";

const BonusDetail = () => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 rounded-lg bg-white/[0.08] px-4 pb-3 pt-[10px]">
        <p className="text-[13px] font-medium leading-[18px]">
          Current Daily Bonus
        </p>
        <div className="my-[10px] h-[1px] bg-white/[0.26]"></div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between">
            <p className="leaidng-[18px] text-[13px] font-light">FP</p>
            <div className="flex items-center gap-[6px]">
              <div className="relative h-[14px] w-[14px] rounded-full border-2 border-white/30">
                <Image src={FPBadge} fill alt="fp" />
              </div>
              <span className="text-[13px] leading-4">4</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="leaidng-[18px] text-[13px] font-light">RP</p>
            <div className="flex items-center gap-[6px]">
              <div className="relative h-[14px] w-[14px] rounded-full border-2 border-white/30">
                <Image src={RPBadge} fill alt="fp" />
              </div>
              <span className="text-[13px] leading-4">4</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="leaidng-[18px] text-[13px] font-light">FCON</p>
            <div className="flex items-center gap-[6px]">
              <div className="relative flex h-[14px] w-[14px] items-center justify-center rounded-full border-2 border-white/30 bg-gray0">
                <FconIcon className="w-[4.173px]" />
              </div>
              <span className="text-[13px] leading-4">4</span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "linear-gradient(110deg, #9E00FF 0%, #4200CF 100%)",
        }}
        className="flex-1 rounded-lg px-4 pb-3 pt-[10px]"
      >
        <p className="text-[13px] font-medium leading-[18px]">
          Current Daily Bonus
        </p>
        <div className="my-[10px] h-[1px] bg-white/[0.26]"></div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between">
            <p className="leaidng-[18px] text-[13px] font-light">FP</p>
            <div className="flex items-center gap-[6px]">
              <div className="relative h-[14px] w-[14px] rounded-full border-2 border-white/30">
                <Image src={FPBadge} fill alt="fp" />
              </div>
              <span className="text-[13px] leading-4">8</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="leaidng-[18px] text-[13px] font-light">RP</p>
            <div className="flex items-center gap-[6px]">
              <div className="relative h-[14px] w-[14px] rounded-full border-2 border-white/30">
                <Image src={RPBadge} fill alt="fp" />
              </div>
              <span className="text-[13px] leading-4">8</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="leaidng-[18px] text-[13px] font-light">FCON</p>
            <div className="flex items-center gap-[6px]">
              <div className="relative flex h-[14px] w-[14px] items-center justify-center rounded-full border-2 border-white/30 bg-gray0">
                <FconIcon className="w-[4.173px]" />
              </div>
              <span className="text-[13px] leading-4">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusDetail;

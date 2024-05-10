import FconIcon from "@/components/shared/icons/crypto/fcon";
import Image from "next/image";
import FPBadge from "public/images/FalconBadge/falcon-point1.png";
import RPBadge from "public/images/FalconBadge/reward-point1.png";

const DailyEarnings = () => {
  return (
    <div className="flex:w-[171px] flex flex-col overflow-hidden rounded-[6px] bg-white/[0.08]">
      <div className="flex flex-1 flex-col justify-center gap-2 border-b border-white/10 p-[10px]">
        <p className="text-[13px] font-light uppercase leading-3 opacity-80">
          daily fp earnings
        </p>
        <div className="flex items-center gap-[6px]">
          <div className="relative h-[14px] w-[14px] rounded-full border border-white/30">
            <Image src={FPBadge} fill alt="fp" />
          </div>
          <span className="leading-4">-</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 border-b border-white/10 p-[10px]">
        <p className="text-[13px] font-light uppercase leading-3 opacity-80">
          daily rp earnings
        </p>
        <div className="flex items-center gap-[6px]">
          <div className="relative h-[14px] w-[14px] rounded-full border-2 border-white/30">
            <Image src={RPBadge} fill alt="fp" />
          </div>
          <span className="leading-4">-</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 border-b border-white/10 p-[10px]">
        <p className="text-[13px] font-light uppercase leading-3 opacity-80">
          daily fcon earnings
        </p>
        <div className="flex items-center gap-[6px]">
          <div className="relative flex h-[14px] w-[14px] items-center justify-center rounded-full border-2 border-white/30 bg-gray0">
            <FconIcon className="w-[4.173px]" />
          </div>
          <span className="leading-4">-</span>
        </div>
      </div>
    </div>
  );
};

export default DailyEarnings;

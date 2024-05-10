import { ReactNode } from "react";

const StatWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-10 rounded-2xl bg-white/[0.06] p-5 md:p-8">
      {children}
    </div>
  );
};

const MintStats = () => {
  return (
    <div className="pt-10">
      <h3 className="mb-6 font-aeonikPro text-[32px] font-medium leading-none text-white">
        Mint Information
      </h3>
      <div className="flex flex-col gap-7">
        <StatWrapper>
          <p className="mb-3 font-dinPro text-4xl font-medium italic leading-none text-white md:text-5xl lg:text-[64px]">
            0
          </p>
          <p className="font-aeonikPro font-light leading-[22px] text-white">
            Whitelisted for 1st Public Release
          </p>
        </StatWrapper>
        <StatWrapper>
          <p className="mb-3 font-dinPro text-4xl font-medium italic leading-none text-white md:text-5xl lg:text-[64px]">
            889/1,000
          </p>
          <p className="font-aeonikPro font-light leading-[22px] text-white">
            Beta Release Invited Users
          </p>
        </StatWrapper>
        <StatWrapper>
          <p className="mb-3 font-dinPro text-4xl font-medium italic leading-none text-white md:text-5xl lg:text-[64px]">
            1,727
          </p>
          <p className="font-aeonikPro font-light leading-[22px] text-white">
            Total Referrals
          </p>
        </StatWrapper>
      </div>
    </div>
  );
};

export default MintStats;

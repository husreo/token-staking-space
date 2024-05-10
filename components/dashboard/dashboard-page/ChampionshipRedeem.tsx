"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setShowNDModalBurnNFT } from "store/features/newDashboard/newDashboardSlice";
import Alert from "./Alert";

const Item = ({ title, value }: { title: string; value: any }) => (
  <div className="border flex flex-col justify-between border-white/[0.15] bg-white/[0.1] p-6 max-sm:col-span-full">
    <div className="mb-[30px] uppercase">{title}</div>
    <div className="text-4xl font-bold leading-[48px]">{value}</div>
  </div>
);

export default function ChampionshipRedeem() {
  const { mintedAmount, burnedAmount } = useSelector(
    (state: RootState) => state.bsc,
  );
  const { session } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="relative h-full border-b border-r border-white/[0.15]">
      <div className="flex flex-wrap items-center justify-between gap-2 px-9 pb-[28px] pt-9 text-xl">
        <div>YOUR ASSETS</div>
        <div
          className="cursor-pointer select-none border border-fcon bg-[#00ffc219] px-[14px] py-1 text-xl
           uppercase text-fcon hover:opacity-80"
          onClick={() => dispatch(setShowNDModalBurnNFT(true))}
        >
          REDEEM PASS TO TICKET
        </div>
      </div>
      <div className="flex flex-col justify-end px-9 pb-9">
        <div className="mb-3 text-3xl font-semibold">
          CHAMPIONSHIP PASSES & TICKETS
        </div>
        <div className="my-3">
          <Alert>
            PLAY AVIATRIX FOR FREE, TO ELIGIBLE TO JOIN THE CHAMPIONSHIP, YOU
            MUST REDEEM YOUR MINTED PASSES INTO TICKET
          </Alert>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Item title="MINTED PASSES" value={mintedAmount} />
          <Item
            title="REDEEMED PASSES"
            value={burnedAmount + "/" + mintedAmount}
          />
          <Item
            title="TICKETS LEFT/TOTAL"
            value={`${session?.user?.login_codes?.total_in_use || 0}/${
              session?.user?.login_codes?.total_issued || 0
            }`}
          />
        </div>
      </div>
    </div>
  );
}

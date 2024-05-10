import CheckIcon from "@/components/shared/icons/check-icon";
import { getSolanaPriceFeed } from "@/lib/api/crypto";
import { useConnection } from "@solana/wallet-adapter-react";
import { useRequest } from "ahooks";
import { formatStats } from "utils/string";

const EarningStats = () => {
  const { connection } = useConnection();
  const { data } = useRequest(
    async () => {
      const req = await fetch("/api/nft/summary", {
        method: "GET",
        cache: "no-store",
      });
      const data = await req.json();
      return data;
    },
    {
      // onSuccess: (d) =>
      //   console.log(d?.total_inventory_value, typeof d?.total_inventory_value),
    },
  );

  const { data: solanaPrice } = useRequest(
    () =>
      getSolanaPriceFeed(
        "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG",
        connection,
      ),
    {
      onSuccess: (d) => console.log(d?.toFixed()),
    },
  );
  return (
    <div className="flex flex-wrap items-center gap-6 rounded-[10px] bg-gray1 px-9 py-8 font-aeonikPro text-white">
      <div className="flex-[4]">
        <div className="mb-[14px]">
          <p className="mb-1 text-[28px] font-medium leading-8 ">
            Current Earnings
          </p>
          <p className="text-xs leading-4 text-white/80">
            Monthly Bonus for holders who stake NFTs
          </p>
        </div>
        <p className="mb-4 text-2xl font-medium text-fcon">
          {/* +2,485,499 FCON (~766 USD) */}
          {data?.total_earning
            ? `+${formatStats({
                n: data.total_earning,
                notation: "standard",
              })} FP`
            : "-"}
        </p>
        {/* <p className="mb-[14px] text-[15px] font-light tracking-wide">
          <span className="text-white/[0.62]">FCON/USDT</span>
        </p> */}
        <div className="flex items-center gap-5 max-[360px]:flex-col sm:gap-9">
          <div className="flex items-center justify-center gap-1 border border-white/[0.15] px-[14px] py-1 max-[360px]:w-full">
            <CheckIcon className="w-4 text-fcon" />
            <p className="text-xs font-light leading-4 text-white/60">
              Auto Compounding
            </p>
          </div>
          <div className="flex items-center justify-center gap-1 border border-white/[0.15] px-[14px] py-1 max-[360px]:w-full">
            <CheckIcon className="w-4 text-fcon" />
            <p className="text-xs font-light leading-4 text-white/60">
              Auto Subcribe
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-[5] justify-end gap-6 max-sm:flex-col">
        <div className="flex-1 rounded-[10px] border border-white/[0.12] bg-gray1 p-6">
          <p className="mb-10 leading-[21px] text-white/80">
            Total Platform Inventory
          </p>
          <div className="flex items-center gap-3">
            <div className="w-fit">
              <p className="flex items-center gap-1 text-[11px] leading-[14px] text-white/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="#00FFC2"
                    strokeLinejoin="round"
                    strokeWidth="0.875"
                    d="M1.75 2.406L7 .872l5.247 1.531v3.142a7.675 7.675 0 01-5.25 7.28 7.681 7.681 0 01-5.253-7.286V2.395l.006.011z"
                  ></path>
                </svg>{" "}
                Locked
              </p>
              <p className="text-center font-dinPro text-2xl font-bold text-white">
                {data?.total_locked || 0}
              </p>
            </div>
            <div className="h-[25px] w-[1px] bg-white/20"></div>
            <div className="w-fit">
              <p className="flex items-center gap-1 text-[11px] leading-[14px] text-white/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="#00FFC2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.875"
                    d="M9.582 3.245a2.656 2.656 0 00-2.51-1.787 2.655 2.655 0 00-2.666 2.643v1.265"
                  ></path>
                  <path
                    fillRule="evenodd"
                    stroke="#00FFC2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.875"
                    d="M9.294 12.25H4.837a2.212 2.212 0 01-2.212-2.212V7.536c0-1.222.99-2.212 2.212-2.212h4.457c1.222 0 2.212.99 2.212 2.212v2.502c0 1.222-.99 2.212-2.212 2.212z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    stroke="#00FFC2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.875"
                    d="M7.066 8.139v1.296"
                  ></path>
                </svg>{" "}
                Not Locked
              </p>
              <p className="text-center font-dinPro text-2xl font-bold text-white">
                {data?.total_inventory || 0}
              </p>
            </div>
            <div className="h-[25px] w-[1px] bg-white/20"></div>
            <div className="w-fit">
              <p className="flex items-center gap-1 text-[11px] leading-[14px] text-white/60">
                Total Supply
              </p>
              <p className="text-center font-dinPro text-2xl font-bold text-white">
                {data?.total_nfts || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between rounded-[10px] border border-white/[0.12] bg-gray1 p-6">
          <p className="leading-[21px] text-white/80">Total Inventory Value</p>
          <p className="break-all font-dinPro text-2xl font-bold text-white">
            $
            {formatStats({
              n:
                data?.total_inventory_value *
                (solanaPrice ? Math.round(solanaPrice) : 0),
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarningStats;

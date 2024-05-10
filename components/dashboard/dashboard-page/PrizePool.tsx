import React from "react";
import { scrollToCenterSmooth } from "utils/common";
import Link from "next/link";

export default function PrizePool() {
  return (
    <div className="h-full w-full p-2 md:w-[341px]">
      <div className="flex h-full flex-col justify-center border-l border-white/[0.15] bg-white/[0.08]">
        <div className="flex h-full flex-col gap-[14px] border-b border-white/[0.15] pb-4 pl-6 pr-[19px] pt-[19px] ">
          <div className="flex items-center gap-1">
            <div className="-mt-1 h-3 w-3 border border-[#9EFF00] bg-[rgba(158,255,0,0.40)] shadow-[0px_0px_6px_0px_rgba(158,255,0,0.45)]"></div>
            <span className="text-base uppercase leading-6">
              LIVE PRIZE POOL
            </span>
          </div>
          <div className="truncate text-4xl font-medium leading-[48px] tracking-[-0.72px]">
            100,000 USDT
          </div>
        </div>
        <div className="flex h-full flex-col justify-between p-6">
          <p className="text-base uppercase leading-6">
            ALL PLAYERS GET FCON AIRDROPPED, TOP PLAYERS GET MORE
            {/* MINT SPACE{" "}
            <span className="cursor-pointer font-bold text-fcon hover:opacity-[0.85]">
              FALCON CHAMPIONSHIP PASS{" "}
            </span>{" "}
            TO JOIN THE CHAMPIONSHIP. */}
          </p>
          <div className="flex items-center gap-4">
            <Link
              target="_blank"
              href={
                "https://whitepaper.spacefalcon.com/nfts/mint-and-nft-staking-guide-in-bnb-chain"
              }
              className="mt-[2px] hover:opacity-80"
            >
              RULE
            </Link>
            <div className="h-2 w-[1px] bg-white opacity-30"></div>
            <Link
              target="_blank"
              href={
                "https://twitter.com/SpaceFalconIO/status/1775166163565297866"
              }
              className="mt-[2px] hover:opacity-80"
            >
              LOGIN CODE INSTRUCTIONS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

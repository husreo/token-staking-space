"use client";
import ArrowRight from "@/components/shared/icons/arrow-right";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Translation from "utils/translation";

interface NFTAssets {
  src: string;
  title: string | React.ReactNode;
  value: string;
}
const mockData = [
  {
    src: "/images/Leaderboard/rectangle1.png",
    title: <Translation text="leaderboard.crates" />,
    value: "0",
  },
  {
    src: "/images/Leaderboard/rectangle2.png",
    title: <Translation text="leaderboard.ships" />,
    value: "0",
  },
  {
    src: "/images/Leaderboard/rectangle3.png",
    title: <Translation text="leaderboard.heroes" />,
    value: "0",
  },
];
const mockGiftBox: { src: string }[] = [
  // {
  //   src: "/images/Dashboard/gift-box.png",
  // },
  // {
  //   src: "/images/Dashboard/gift-box.png",
  // },
  // {
  //   src: "/images/Dashboard/gift-box.png",
  // },
  // {
  //   src: "/images/Dashboard/gift-box.png",
  // },
  // {
  //   src: "/images/Dashboard/gift-box.png",
  // },
  // {
  //   src: "/images/Dashboard/gift-box.png",
  // },
];
export default function MyNewNFTs({
  setSelectedIndex,
}: {
  setSelectedIndex: (d: number) => void;
}) {
  const { profileNFTs } = useSelector((state: RootState) => state.user);
  function linkToMyNFT() {
    setSelectedIndex(2);
  }

  return (
    <div className="flex flex-1 basis-0 flex-col gap-y-5 bg-transparent text-white">
      <div className="relative h-full w-full overflow-y-scroll rounded-[10px] border border-white/[0.12] bg-gray1 pb-5">
        <div className="sticky left-0 right-0 top-0 z-20 flex h-fit w-full flex-col items-center justify-between  gap-y-3 rounded-tl-[10px] rounded-tr-[10px] bg-white/[0.01] px-2 pb-3 pt-2 backdrop-blur-[6px] sm:h-[72px] sm:flex-row sm:gap-y-0 sm:px-6 sm:pt-6">
          <div className="flex h-fit flex-row items-center gap-x-3">
            <div className="relative h-9 w-9">
              <Image
                className="object-cover"
                src="/images/Dashboard/nfts.png"
                fill
                alt="nfts"
                sizes="(max-width: 600px) 100vw, 100vw"
              />
            </div>
            <h1 className="text-base font-medium ">
              <Translation text="dashboard.overview.my-new-nfts" />
            </h1>
          </div>
          <div className="w-1/2 rounded-[20px] bg-white/[0.15] px-3 py-[7px] text-center max-[414px]:w-full sm:w-auto sm:rounded-[10px]">
            <p className="flex h-full flex-col items-center justify-center text-[13px] font-normal opacity-60">
              <Translation text="dashboard.overview.buy-openSea" />
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-6">
          <div className="flex h-fit w-fit justify-center bg-transparent">
            <div className="flex w-full justify-between gap-x-5 max-[414px]:gap-x-0">
              <div className="flex w-16 flex-col items-center justify-center gap-y-[6px] px-1 pt-2">
                <div className="relative h-8 w-8">
                  <Image
                    src="/images/planet_nft.png"
                    fill
                    alt="nft"
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>

                <div className="w-full text-center font-medium">
                  <p className=" text-[11px]  text-[#ABB2B0]">Planets</p>
                  <p className="text-base">
                    {" "}
                    {profileNFTs?.filter(
                      (nft) =>
                        nft?.offChainMetadata?.metadata?.symbol.toLowerCase() ===
                          "fcon" ||
                        nft?.onChainMetadata?.metadata?.data.symbol === "fcon",
                    ).length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[26px] flex h-fit w-full flex-wrap justify-center gap-x-2 gap-y-3 sm:justify-start ">
            {mockGiftBox.map((img, index) => {
              return (
                <div
                  key={`gift-box${index}`}
                  className="relative h-[127px] w-[127px] rounded-[10px]"
                >
                  <div className="absolute top-5 z-0 h-full w-full scale-[1.1]">
                    <Image
                      className="object-cover"
                      src={"/images/Dashboard/gift-blur.png"}
                      fill
                      alt="gift-box"
                      sizes="(max-width: 600px) 100vw, 100vw"
                      priority
                    />
                  </div>

                  <Image
                    className="z-1 absolute object-cover"
                    src={img.src}
                    fill
                    alt="gift-box"
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full flex-row justify-center">
            <button
              onClick={linkToMyNFT}
              className="mt-12 flex h-[76px] w-[76px] flex-col items-center justify-center rounded-[46px] bg-white/10"
            >
              <ArrowRight />
            </button>
          </div>
          <p className="mt-2 text-center text-[13px] font-normal">
            <Translation text="dashboard.overview.go-my-nfts" />
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import RoundedArrowIcon from "@/components/shared/icons/homepage/rounded-arrow";
import Image from "next/image";
import { classNames } from "utils/string";
import DownloadGameIcon from "@/components/shared/icons/homepage/download-game";
import PlayAviatrixIcon from "@/components/shared/icons/homepage/play-aviatrix";
import FighterJetIcon from "@/components/shared/icons/homepage/fighter-jet";
import CoinCard from "public/images/Aviarix/coin-card.png";
import MutipleEllipeIcon from "public/images/Aviarix/mutiple-ellipe.png";
import RedeemRewardIcon from "@/components/shared/icons/homepage/redeem-rewards";
import Reward1 from "@/components/shared/icons/homepage/reward_1";
import Reward2 from "@/components/shared/icons/homepage/reward_2";
import Reward3 from "@/components/shared/icons/homepage/reward_3";
import Reward4 from "@/components/shared/icons/homepage/reward_4";
import LightningIcon from "@/components/shared/icons/homepage/lightning";
import Button from "@/components/shared/button";
import Translation from "utils/translation";
import { useRouter } from "next/navigation";
import BorderStartAction from "public/images/Aviarix/border-start-action.png";
import { useSelector } from "react-redux";
import { RootState } from "store";

const GameProgress = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative h-[214px] w-full overflow-hidden rounded-2xl bg-[#101010] backdrop-blur-[18px]">
      <div
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 42.71%, rgba(255, 255, 255, 0.00) 100%)",
        }}
        className="absolute bottom-0 left-0 right-0 h-[379px] w-full translate-y-[236px] transform rounded-[379px]"
      ></div>
      <div
        className={classNames(
          "relative z-10 flex h-full flex-col items-center py-[22px]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
const ContentProgress = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={classNames(
        "w-full px-3 text-center text-base leading-6 sm:w-[245px] sm:px-0",
        className,
      )}
    >
      {children}
    </p>
  );
};
const GridColum = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        "col-span-6 max-[414px]:col-span-12 lg:col-span-4",
        className,
      )}
    >
      {children}
    </div>
  );
};
export default function GameProgressionSteps({
  handleMoveToDownload,
}: {
  handleMoveToDownload?: () => void;
}) {
  const router = useRouter();
  const { session } = useSelector((state: RootState) => state.user);
  return (
    <div className="pt-12">
      <div className="flex flex-col items-center">
        <h1 className="w-full text-center font-aeonikMono text-[15px] uppercase">
          <Translation text="home.aviatrix.work" />
        </h1>
        <RoundedArrowIcon className="mt-3 h-4 w-[60px]" />
      </div>
      <div className="mt-3 grid grid-cols-12 gap-3 sm:gap-6">
        <GridColum>
          <GameProgress>
            <div className="mb-3 h-[100px] w-[100px] px-[10px] py-[14px]">
              <DownloadGameIcon className="h-[71px] w-[78px]" />
            </div>
            <ContentProgress>
              <Translation text="home.aviatrix.download-setup" />
            </ContentProgress>
          </GameProgress>
        </GridColum>
        <GridColum>
          <GameProgress>
            <div className="relative mb-6 flex h-[100px] w-[100px] items-center px-[10px] py-[14px]">
              <div className="relative">
                <PlayAviatrixIcon className="h-[62px] w-[79px]" />
              </div>
            </div>
            <ContentProgress>
              {" "}
              <Translation text="home.aviatrix.play-free" />
            </ContentProgress>
          </GameProgress>
        </GridColum>
        <GridColum>
          <GameProgress>
            <div className="mb-3 flex h-[100px] w-[100px] items-center justify-center">
              <div className="relative">
                <FighterJetIcon className="h-[88px] w-[76px]" />
                <LightningIcon className="absolute right-1 top-4 h-11 w-9" />
              </div>
            </div>
            <ContentProgress>
              <Translation text="home.aviatrix.upgrade" />
            </ContentProgress>
          </GameProgress>
        </GridColum>
        <GridColum>
          <GameProgress>
            <div className="mb-6 h-[100px] w-[100px] p-[14px]">
              <div className="relative h-[72px] w-[72px]">
                <Image
                  src={CoinCard}
                  alt="coin-card"
                  fill
                  sizes="(max-width: 600px) 100vw, 100vw"
                />
              </div>
            </div>
            <ContentProgress>
              <Translation text="home.aviatrix.redeem" />
            </ContentProgress>
          </GameProgress>
        </GridColum>
        <div className="col-span-12 lg:col-span-8">
          <div className="relative h-[214px] w-full rounded-2xl bg-[#1F1F1F] backdrop-blur-[18px]">
            <Image
              className="absolute bottom-0 left-0 right-0 top-0 rounded-2xl object-cover"
              src={MutipleEllipeIcon}
              alt="MutipleEllipeIcon"
              fill
              sizes="(max-width: 600px) 100vw, 100vw"
            />
            <Reward1 className="absolute left-10 top-[30px] z-20 h-10 w-10 max-[414px]:left-1 sm:left-36 sm:h-12 sm:w-12 md:left-[207px] lg:left-[167px]" />
            <Reward2 className="absolute bottom-0 left-20 z-20 h-10 w-16 max-[414px]:left-10 sm:left-32 sm:h-[53px] sm:w-[77px] lg:left-[167px]" />
            <div className="absolute right-16 top-[34px] z-20 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-white max-[414px]:right-1 sm:right-[174px]">
              <Reward3 className="h-3 w-[34px]" />
            </div>
            <div className="absolute bottom-1 right-5 z-20 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-white sm:bottom-5 sm:right-20 md:right-[120px] md:h-[60px] md:w-[60px]">
              <Reward4 className="h-8 w-6 md:h-9 md:w-[27px]" />
            </div>

            <div className="relative z-30 flex h-full w-full flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <RedeemRewardIcon className=" h-[60px] w-36 sm:h-[76px] sm:w-[160px]" />
                <p className="pt-[15px] text-center text-[13px] leading-[22px]">
                  <Translation text="home.aviatrix.play-earn" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full rounded-2xl px-9 py-6 backdrop-blur-[18px] md:px-12 md:py-[34px]">
        <Image
          className="absolute bottom-0 left-0 right-0 top-0"
          src={BorderStartAction}
          alt="border-start-action"
          fill
          sizes="(max-width: 600px) 100vw, 100vw"
        />
        <div className="relative z-10 flex w-full items-center justify-between gap-3 max-[450px]:flex-col">
          <p className="text-center font-dinPro text-[28px] font-bold uppercase sm:text-left">
            <Translation text="home.aviatrix.ready" />
          </p>
          <div className="flex flex-col gap-x-6 gap-y-3 text-base md:flex-row">
            <button
              onClick={handleMoveToDownload}
              className="flex h-14 w-[218px] items-center justify-center rounded-[10px] bg-white/10 px-3 py-[7px] font-medium text-white transition-all delay-75 duration-300 ease-linear hover:bg-white/50"
            >
              <Translation text="home.aviatrix.download" />
            </button>
            {!!session?.access_token ? (
              <Button
                onClick={() => router.push("/dashboard")}
                className="flex h-14 w-[218px] items-center justify-center rounded-[10px] px-3 py-[7px] !font-aeonikPro font-medium text-gray0"
              >
                <Translation text="nav.dashboard" />
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="flex h-14 w-[218px] items-center justify-center rounded-[10px] px-3 py-[7px] font-medium text-gray0"
              >
                <Translation text="button.login" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

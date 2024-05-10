"use client";
import DiscordIcon from "@/components/shared/icons/brand/discord/discord";
import TelegramIcon from "@/components/shared/icons/brand/telegram/telegram";
import SpaceFalconIcon from "@/components/shared/icons/spacefalcon";
import SimpleTooltip from "@/components/shared/tooltip/SimpleTooltip";
import { AVATARS } from "constants/socials";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { classNames, formatStats } from "utils/string";

type NFTType = {
  non_locked: number;
  locked: number;
};

const PlayerStatistics = ({
  title = "",
  value = "",
  className = "",
}: {
  title: string | React.ReactNode;
  value: string | React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={classNames(className)}>
      <p className="text-[13px] leading-[18px] text-[#707070]">{title}</p>
      <p className="font-dinPro text-base font-medium leading-[22px] text-[#E2E2E2]">
        {value}
      </p>
    </div>
  );
};
const LeaderboardCard = ({
  position,
  username,
  avatar,
  rank,
  nfts,
  rp_balance,
  last_play_duration,
  total_play_duration,
  discord_id,
  discord_username,
  telegram_id,
  telegram_username,
  lifetime_fcon,
  presale_bought,
}: {
  position: number;
  username: string;
  avatar?: string;
  rank: string;
  nfts: {
    crates: number;
    ships: number;
    heroes: number;
    planets: NFTType;
  };
  rp_balance: number;
  last_play_duration: number;
  total_play_duration: number;
  discord_id: string;
  discord_username: string;
  telegram_id: string;
  telegram_username: string;
  lifetime_fcon: number;
  presale_bought: number;
}) => {
  const { session } = useSelector((state: RootState) => state.user);
  
  return (
    <div
      className={classNames(
        "relative flex-1 xl:flex xl:flex-col xl:items-center xl:justify-center",
        position === 1 ? "order-3 md:order-2" : "",
        position === 2 ? "order-2 md:order-1" : "",
        position === 3 ? "md:order-3" : "",
      )}
    >
      {position === 1 && (
        <div className="absolute -top-14 z-0 h-[374px] w-full">
          <Image
            src="/images/Leaderboard/nft_1_bg.png"
            fill
            alt="nft"
            sizes="(max-width: 600px) 100vw, 100vw"
          />
        </div>
      )}
      <div className="relative flex w-full justify-center gap-4">
        <SimpleTooltip
          className={`left-1/2 -translate-x-1/2 px-7 ${
            session?.user?.is_display_social && (discord_username || discord_id)
              ? ""
              : "hidden"
          }`}
          text={
            session?.user?.is_display_social &&
            (discord_username ? discord_username : discord_id)
          }
        >
          <DiscordIcon className="ml-3 h-5 w-5 cursor-pointer opacity-60 hover:opacity-100" />
        </SimpleTooltip>
        <SimpleTooltip
          className={`left-1/2 -translate-x-1/2 px-7 ${
            session?.user?.is_display_social &&
            (telegram_username || telegram_id)
              ? ""
              : "hidden"
          }`}
          text={
            session?.user?.is_display_social &&
            (telegram_username ? telegram_username : telegram_id)
          }
        >
          <TelegramIcon className="ml-3 h-5 w-5 cursor-pointer opacity-60 hover:opacity-100" />
        </SimpleTooltip>
      </div>
      <div className="relative mx-auto mb-2 h-[156px] w-[156px] overflow-hidden">
        <div className="absolute z-0 h-[98px] w-[98px] translate-x-[37px] translate-y-[34px]">
          <Image
            src={AVATARS[position]}
            fill
            alt="nft"
            sizes="(max-width: 600px) 100vw, 100vw"
            className="rounded-full object-cover"
          />
        </div>

        {/* <Image
          src={rank || "/images/Leaderboard/rank_1.png"}
          fill
          alt="nft"
          sizes="(max-width: 600px) 100vw, 100vw"
          className="absolute z-10 object-cover"
        /> */}
      </div>
      <p className=" text-center font-aeonikPro text-base font-medium uppercase text-white">
        {username}
      </p>
      <div className="">
        <div className="relative mx-6 h-10 overflow-visible md:mx-2 lg:mx-4 xl:mx-0 xl:w-[286px]">
          <div
            style={{
              clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
            }}
            className="bottom-0 h-full w-full bg-leaderboard-clipPath "
          ></div>
          <p
            className={classNames(
              "absolute left-1/2 top-1 z-10 flex h-9 w-9 -translate-x-1/2 transform items-center justify-center rounded-[2px] border border-black/[0.15] font-dinPro text-lg font-medium uppercase",
              position === 1
                ? "bg-[#FFD15B]"
                : position === 2
                ? "bg-[#E4E4E4]"
                : "bg-[#DFAC9B]",
            )}
          >
            <span className="text-lg font-medium uppercase text-black">
              {position === 1 ? 1 : position === 2 ? 2 : 3}
            </span>
          </p>
        </div>
        <div
          className={classNames(
            "mx-6 flex justify-center gap-2 bg-leaderboard-clipPath-2 p-2 sm:p-4 md:mx-2 md:p-2 lg:mx-4 lg:p-5 xl:mx-0 xl:w-[286px]",
            position === 1
              ? "h-[163px]"
              : position === 2
              ? "h-[124px]"
              : "h-[105px] md:mb-5",
          )}
        >
          <div className="w-full text-center">
            <div className="flex w-full items-center justify-between rounded border border-white/[0.33] bg-[linear-gradient(91deg,#173D67_0%,#5085BE_100%)] py-1 pl-1 pr-2 shadow-[0px_0px_14px_0px_rgba(170,211,255,0.50)]">
              <div className="flex items-center">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.12]">
                  <SpaceFalconIcon className="h-[14px] w-[7px]" />
                </div>
                <span className="-mb-1 flex-1 text-left text-sm leading-[18px]">
                  &nbsp; Lifetime FCON
                </span>
              </div>
              <span className="break-all font-dinPro text-sm font-medium leading-[22px]">
                {formatStats({ n: lifetime_fcon, notation: "compact" })}
              </span>
            </div>
            {/* <p className="tex mb-[2px] font-aeonikPro text-[13px] text-[#707070]">
              <Translation text="leaderboard.score" />
            </p>
            <p className="mb-5 font-dinPro text-base font-bold text-[#E2E2E2]">
              {rp_balance}
            </p> */}
            <div className="mt-4 flex justify-between">
              <PlayerStatistics
                className="text-left"
                title="Locked NFTs"
                value={nfts.planets.locked}
              />
              <PlayerStatistics
                className="text-right"
                title="Score"
                value={rp_balance || 0}
              />
            </div>
            <div className="mt-4 flex h-12 items-center overflow-hidden rounded border border-white/[0.15]">
              <p className="flex-1 pl-3 text-left font-medium">Presale bought</p>
              <div
                className="flex h-full w-[80px] items-center justify-center rounded text-center"
                style={{
                  background:
                    "linear-gradient(95deg, #9948FF 0%, #6D48FF 100%)",
                }}
              >
                {presale_bought}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;

import EmptyBox from "@/components/shared/empty-data/empty-box";
import SpaceFalconIcon from "@/components/shared/icons/spacefalcon";
import SimpleTooltip from "@/components/shared/tooltip/SimpleTooltip";
import Image from "next/image";
import AvatarHero from "public/images/Leaderboard/avatar_hero_1.png";
import DiscordColorIcon from "public/images/socials/discord-color.svg";
import TelegramColorIcon from "public/images/socials/telegram-color.svg";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { LeaderboardRecord } from "types/stats";
import { formatStats } from "utils/string";
import Translation from "utils/translation";
import LoadingTable from "./LoadingTable";

export default function LeaderboardTable({
  data,
  isLoading = false,
}: {
  data: LeaderboardRecord[];
  isLoading?: boolean;
}) {
  const { session } = useSelector((state: RootState) => state.user);
  const { fconPrice } = useSelector((state: RootState) => state.token);
  return (
    <div className="mt-28 h-fit w-full max-w-[1204px] overflow-x-scroll rounded-2xl bg-gray1 bg-transparent">
      {isLoading ? (
        <LoadingTable />
      ) : (
        <>
          <table className="table-fixed rounded-2xl">
            <thead>
              <tr className="h-16 bg-gray2 text-left font-aeonikPro text-base font-medium text-white">
                <th className="sticky w-28 pl-5">
                  <p className="h-5 w-9 text-center opacity-60">#</p>
                </th>
                <th className="sticky w-60">
                  <p className="opacity-60">
                    <Translation text="leaderboard.player" />
                  </p>
                </th>
                <th className="sticky w-[130px]">
                  <p className="w-20 truncate pl-8 opacity-60 sm:w-full">
                    <Translation text="leaderboard.presale-bought" />
                  </p>{" "}
                </th>
                {/* <th className="sticky w-[210px]">
                  <p className="truncate opacity-60 max-sm:px-3">
                    <Translation text="leaderboard.NFTAsset" />
                  </p>
                </th> */}
                <th className="sticky w-[150px]">
                  <div className="flex w-[100px] justify-center md:w-full">
                    <div className="relative h-[27px] w-[27px]">
                      <Image
                        src={DiscordColorIcon}
                        alt="discord"
                        fill
                        sizes="(max-width: 600px) 100vw, 100vw"
                      />
                    </div>
                  </div>
                </th>
                <th className="sticky w-[150px]">
                  <div className="flex w-[100px] justify-center md:w-full">
                    <div className="relative h-[27px] w-[27px]">
                      <Image
                        src={TelegramColorIcon}
                        alt="telegram"
                        fill
                        sizes="(max-width: 600px) 100vw, 100vw"
                      />
                    </div>
                  </div>
                </th>

                <th className="sticky w-[150px]">
                  <p className="w-20 truncate pl-7 opacity-60 sm:w-full">
                    <Translation text="leaderboard.lifetime-earning" />
                  </p>{" "}
                </th>
                <th className="sticky w-[150px]">
                  <p className="w-20 truncate pl-2 text-right opacity-60 sm:w-full sm:pr-9">
                    <Translation text="leaderboard.score" />
                  </p>{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((item, idx) => {
                  const totalPlayDays = Math.floor(
                    item.total_play_duration / (24 * 60 * 60),
                  );
                  const totalPlayHours = Math.floor(
                    (item.total_play_duration % (24 * 60 * 60)) / (60 * 60),
                  );
                  const totalPlayMinutes = Math.floor(
                    (item.total_play_duration % (60 * 60)) / 60,
                  );
                  const remainingSeconds = Math.floor(
                    item.total_play_duration % 60,
                  );
                  // const timeFormat = [
                  //   totalPlayHours,
                  //   totalPlayMinutes,
                  //   remainingSeconds,
                  // ]
                  //   .map((val) => (val < 10 ? `0${val}` : val))
                  //   .join(":");
                  return (
                    <tr
                      key={`row${item.rank}`}
                      className="h-16 border-b border-white/[0.09] font-aeonikPro font-medium last:border-b-0"
                    >
                      <td className="pl-5">
                        <div className="flex h-5 w-9 flex-col justify-center text-center font-ibmPlexSans font-medium">
                          {item.rank}
                        </div>
                      </td>
                      <td>
                        <div className="relative flex gap-x-2 px-2 lg:px-0 ">
                          <div className="relative h-12 w-12">
                            <Image
                              src={AvatarHero}
                              fill
                              alt="nft"
                              sizes="(max-width: 600px) 100vw, 100vw"
                              className="rounded-full object-cover"
                            />
                          </div>
                          <SimpleTooltip
                            className="-top-8 px-5"
                            text={item.nickname}
                          >
                            <div className="flex h-12 w-full flex-col justify-center pr-3">
                              <span className="max-w-[180px] truncate">
                                {item.nickname}
                              </span>
                            </div>
                          </SimpleTooltip>
                        </div>
                      </td>
                      <td>
                        <div
                          className="mx-auto flex h-10 w-[80px] items-center justify-center rounded text-center"
                          style={{
                            background:
                              "linear-gradient(95deg, #9948FF 0%, #6D48FF 100%)",
                          }}
                        >
                          {item.presale_package}
                        </div>
                      </td>
                      {/* <td>
                        <div className="flex gap-x-1 px-2 lg:px-0">
                          <NFTHolding
                            collectionImage="/images/Leaderboard/leaderboard_planet.png"
                            collectionName="Chapter 1"
                            lockAmount={item.nfts.planets.locked}
                            notLockAmount={item.nfts.planets.non_locked}
                          />
                        </div>
                      </td> */}
                      <td className="relative">
                        <SimpleTooltip
                          className={`-top-6 px-5 ${
                            session?.user?.is_display_social &&
                            (item.discord.username || item.discord.id)
                              ? ""
                              : "hidden"
                          }`}
                          text={
                            item.discord.username
                              ? item.discord.username
                              : item.discord.id
                          }
                        >
                          <div className="flex h-12 w-full flex-col justify-center">
                            <span className="-mb-2 w-full max-w-[120px] truncate text-center text-base font-medium leading-[21px]">
                              {(session?.user?.is_display_social &&
                                (item.discord.username
                                  ? item.discord.username
                                  : item.discord.id)) ||
                                "-"}
                            </span>
                          </div>
                        </SimpleTooltip>
                      </td>
                      <td className="relative">
                        <SimpleTooltip
                          className={`-top-6 px-5 ${
                            session?.user?.is_display_social &&
                            (item.telegram.username || item.telegram.id)
                              ? ""
                              : "hidden"
                          }`}
                          text={
                            item.telegram.username
                              ? item.telegram.username
                              : item.telegram.id
                          }
                        >
                          <div className="flex h-12 w-full flex-col justify-center">
                            <span className="-mb-2 w-full max-w-[120px] truncate text-center text-base font-medium leading-[21px]">
                              {session?.user?.socials?.telegram?.uid &&
                              item.telegram.username
                                ? item.telegram.username
                                : item.telegram.id || "-"}
                            </span>
                          </div>
                        </SimpleTooltip>
                      </td>

                      <td>
                        <div className="flex items-center gap-1">
                          <span className="truncate pl-7 font-dinPro text-base font-medium leading-[22px]">
                            {formatStats({
                              n: fconPrice
                                ? (item?.lifetime_rp || 0) / fconPrice
                                : 0,
                              notation: "compact",
                            })}
                          </span>
                          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.12]">
                            <SpaceFalconIcon className="h-[14px] w-[7px]" />
                          </div>
                        </div>
                      </td>
                      <td className="truncate pl-3">
                        <div className="flex justify-end gap-2 truncate">
                          {/* <div className="relative h-5 w-5">
                          <Image
                            src={RPBage}
                            alt="rp"
                            fill
                            sizes="(max-width: 600px) 100vw, 100vw"
                          />
                        </div> */}
                          <span className="text-right font-dinPro text-base font-medium leading-[18px] sm:pr-9">
                            {item.rp_balance || 0}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="w-ful text-center font-aeonikPro text-sm capitalize italic opacity-60">
                  <td colSpan={10} className="pt-11">
                    <EmptyBox />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

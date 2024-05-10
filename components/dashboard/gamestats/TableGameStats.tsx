import AlarmClock from "@/components/shared/icons/alarm-clock";
import ClockIcon from "@/components/shared/icons/clock";
import PlayStation from "@/components/shared/icons/playstation";
import dayjs from "dayjs";
import AdvanceFormat from "dayjs/plugin/advancedFormat";
import UTC from "dayjs/plugin/utc";
import Image from "next/image";
import Badge from "public/images/FalconBadge/reward-point1.png";
import { GameStatType } from ".";
import Translation from "utils/translation";
import EmptyBox from "@/components/shared/empty-data/empty-box";

dayjs.extend(UTC);
dayjs.extend(AdvanceFormat);

const TableGameStats = ({ data }: { data: GameStatType[] }) => {
  return (
    <div className="rounded-[20px] bg-gray1 px-8 py-6 font-aeonikPro text-white">
      <p className="mb-6 text-[28px] font-medium ">
        <Translation text="dashboard.game-stats.history" />
      </p>
      {/* <p className="mb-6 font-medium text-gray6">
        Hold more NFTs to increase your RP earnings.
      </p> */}
      <div className="max-h-[500px] overflow-x-scroll overflow-y-scroll rounded-[20px] border border-[#e4e4e41a] pb-4">
        <table className="w-full">
          <thead>
            <tr
              style={{
                borderBottom: "1px solid rgba(228, 228, 228, 0.10)",
              }}
              className="text-left font-medium text-gray6"
            >
              <th className="truncate px-6 py-4">
                <Translation text="dashboard.game-stats.last" />
              </th>
              <th className="truncate px-6">
                <Translation text="dashboard.game-stats.playDuration" />
              </th>
              <th className="truncate px-6">
                <Translation text="dashboard.game-stats.score" />
              </th>
              <th className="truncate px-6">
                <Translation text="dashboard.game-stats.nft-holdings" />
              </th>
              <th className="truncate px-6">
                <Translation text="dashboard.game-stats.rp-earned" />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((d, idx) => (
                <tr key={`game-stats-${idx}`} className="relative h-[50px]">
                  <td className="px-6">
                    <div className="flex h-full w-full items-center gap-x-2">
                      <span>
                        <AlarmClock className="h-5 w-5" />
                      </span>
                      <span className="truncate text-base font-medium">
                        {/* 18th Oct 2023, 15:35 UTC */}
                        {dayjs(d.datetime)
                          .utc(true)
                          .format("Do MMM YYYY, HH:mm")}
                        UTC
                      </span>
                    </div>
                  </td>
                  <td className="px-6">
                    <div className="flex gap-x-2 ">
                      <span>
                        <ClockIcon strokeColor="#ABB2B0" className="h-5 w-5" />
                      </span>
                      <span className="truncate text-base font-medium">
                        {d.play_time}
                      </span>
                    </div>
                  </td>
                  <td className="px-6">
                    <div className="flex gap-x-2">
                      <span>
                        <PlayStation className="h-5 w-5" />
                      </span>
                      <span className="text-base font-medium">{d.score}</span>
                    </div>
                  </td>
                  <td className="px-6">
                    {/* <div className="flex gap-x-6">
                    <div className="flex items-center">
                      <span className="-mb-1 w-[23px] text-left text-base font-medium">
                        10
                      </span>
                      <span className="relative h-8 w-8">
                        <Image
                          className="object-cover"
                          src="/images/Leaderboard/rectangle1.png"
                          fill
                          alt=""
                          sizes="(max-width: 600px) 100vw, 100vw"
                        />
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="-mb-1 w-[23px] text-left text-base font-medium">
                        10
                      </span>
                      <span className="relative h-8 w-8">
                        <Image
                          className="object-cover"
                          src="/images/Leaderboard/rectangle2.png"
                          fill
                          alt=""
                          sizes="(max-width: 600px) 100vw, 100vw"
                        />
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="-mb-1 w-[23px] text-left text-base font-medium">
                        10
                      </span>
                      <span className="relative h-8 w-8">
                        <Image
                          className="object-cover"
                          src="/images/Leaderboard/rectangle3.png"
                          fill
                          alt=""
                          sizes="(max-width: 600px) 100vw, 100vw"
                        />
                      </span>
                    </div>
                  </div> */}
                  </td>
                  <td className="px-6">
                    <div className="flex gap-1">
                      {/* <span className="relative h-5 w-5">
                        <Image
                          className="object-cover"
                          src={Badge}
                          fill
                          alt="logo"
                          sizes="(max-width: 600px) 100vw, 100vw"
                        />
                      </span> */}
                      <span className=" font-dinPro text-[13px] font-bold">
                        0
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="w-full text-center font-aeonikPro text-sm italic opacity-60">
                <td colSpan={5} className="pt-4 text-center">
                  <EmptyBox
                    content={<Translation text="data-content.no-data" />}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableGameStats;

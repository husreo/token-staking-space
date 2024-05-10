"use client";
import dayjs from "dayjs";
// import Image from "next/image";
// import FPBadge from "public/images/FalconBadge/falcon-point1.png";
// import RPBadge from "public/images/FalconBadge/reward-point1.png";
import Translation from "utils/translation";
import { GameStatType } from "./ActivePlayerStats";
import LoadingTable from "./LoadingTable";

export default function TableGameStat({
  data,
  isLoading = false,
}: {
  data: { [key: string]: GameStatType | any };
  isLoading?: boolean;
}) {
  const dates = Object.keys(data);

  let totalActivePlayer = 0;
  let totalFPPurchased = 0;
  let totalRPRewarded = 0;
  let totalPlayDuration = 0;
  Object.values(data).forEach((day) => {
    totalActivePlayer += day.users;
    totalFPPurchased += day?.fp_spent || 0;
    totalRPRewarded += day.score;
    totalPlayDuration += day.play_duration;
  });
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #101111 0%, #101111 100%)",
      }}
      className="max-h-[448px] w-full overflow-x-auto overflow-y-scroll rounded-2xl max-md:max-w-[768px]"
    >
      {isLoading ? (
        <LoadingTable />
      ) : (
        <table className="relative w-full min-w-[700px] table-fixed overflow-x-auto max-[700px]:max-w-[700px]">
          <thead>
            <tr className="sticky top-0 z-10 h-16 bg-gray0 py-[21px] pl-9 pr-20 text-left text-base font-medium leading-[21px]">
              <th className="truncate pl-9 opacity-60">
                <Translation text="stats.month" />
              </th>
              <th className="truncate opacity-60">
                <Translation text="stats.active-players-count" />
              </th>
              {/* <th className="truncate opacity-60">
              <Translation text="stats.FPUsed" />
            </th>
            <th className="truncate opacity-60">
              <Translation text="stats.RPRewarded" />
            </th>
            <th className="truncate opacity-60">
              <Translation text="stats.NFTsTraded" />
            </th> */}
            </tr>
          </thead>
          <tbody>
            {dates.map((date, index) => {
              return (
                <tr
                  key={`row-stats-${index}`}
                  className="h-16 border-b border-white/[0.09] py-[21px] text-base font-medium"
                >
                  <td>
                    <div className="flex items-center gap-2 pl-9 leading-[21px]">
                      {/* <button onClick={() => toggleExpandRow(index)}>
                        <ArrowDownIcon
                          className={`h-6 w-6 transform transition-all ${
                            expandedRows.includes(index)
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                        />
                      </button> */}
                      <span className="-mb-1 flex items-center">
                        {dayjs(data[date].date).format("MMM DD")}
                      </span>
                    </div>
                  </td>
                  <td className="leading-[21px]">{data[date].users}</td>
                  {/* <td>
                  <div className="flex w-fit items-center gap-1 rounded-[5px] bg-gray2 py-[3px] pl-1 pr-2">
                    <div className="relative h-[18px] w-[18px]">
                      <Image
                        src={FPBadge}
                        fill
                        alt="fp_badge"
                        quality={100}
                        sizes="(max-width: 600px) 100vw, 100vw"
                      />
                    </div>
                    <span className="-mb-1">{data[date]?.fp_spent || 0}</span>
                  </div>
                </td>
                <td>
                  <div className="flex w-fit items-center gap-1 rounded-[5px] bg-gray2 py-[3px] pl-1 pr-2">
                    <div className="relative h-[18px] w-[18px]">
                      <Image
                        src={RPBadge}
                        fill
                        alt="rp_badge"
                        quality={100}
                        sizes="(max-width: 600px) 100vw, 100vw"
                      />
                    </div>
                    <span className="-mb-1">{data[date]?.score || 0}</span>
                  </div>
                </td>
                <td className="leading-[21px]">0</td> */}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr
              key={"footer"}
              className="sticky bottom-0 h-16 bg-[#151817] py-[21px] text-base font-medium"
            >
              <td>
                <div className="flex items-center gap-2 pl-9 leading-[21px]">
                  <span className="-mb-1 flex items-center">
                    <Translation text="stats.total" />
                  </span>
                </div>
              </td>
              <td className="leading-[21px]">{totalActivePlayer}</td>
              {/* <td>
              <div className="flex w-fit items-center gap-1 rounded-[5px] bg-gray2 py-[3px] pl-1 pr-2">
                <div className="relative h-[18px] w-[18px]">
                  <Image
                    src={FPBadge}
                    fill
                    alt="fp_badge"
                    quality={100}
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>
                <span className="-mb-1">{totalFPPurchased}</span>
              </div>
            </td>
            <td>
              <div className="flex w-fit items-center gap-1 rounded-[5px] bg-gray2 py-[3px] pl-1 pr-2">
                <div className="relative h-[18px] w-[18px]">
                  <Image
                    src={RPBadge}
                    fill
                    alt="rp_badge"
                    quality={100}
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>
                <span className="-mb-1">{totalRPRewarded}</span>
              </div>
            </td>
            <td className="leading-[21px]">0</td> */}
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

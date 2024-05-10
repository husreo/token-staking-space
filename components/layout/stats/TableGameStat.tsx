"use client";
// import ArrowDownIcon from "@/components/shared/icons/arrow-down";
import dayjs from "dayjs";
// import Image from "next/image";
import FPBadge from "public/images/FalconBadge/falcon-point1.png";
import RPBadge from "public/images/FalconBadge/reward-point1.png";
import Translation from "utils/translation";
import { GameStatType } from "./ActivePlayerStats";
import LoadingTable from "./LoadingTable";
import Image from "next/image";

export default function TableGameStat({
  data,
  isLoading = false,
}: {
  data: { [key: string]: GameStatType | any };
  isLoading?: boolean;
}) {
  // const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const dates = Object.keys(data);

  // const toggleExpandRow = (index: number) => {
  //   setExpandedRows((prevExpandedRows) => {
  //     const isRowExpanded = prevExpandedRows.includes(index);
  //     if (isRowExpanded) {
  //       return prevExpandedRows.filter((rowIndex) => rowIndex !== index);
  //     } else {
  //       return [...prevExpandedRows, index];
  //     }
  //   });
  // };
  let totalActivePlayer = 0;
  let totalFPPurchased = 0;
  let totalRPRewarded = 0;
  let totalPlayDuration = 0;
  Object.values(data).forEach((day) => {
    totalActivePlayer += day.users || 0;
    totalFPPurchased += day?.fp_spent || 0;
    totalRPRewarded += day.score || 0;
    totalPlayDuration += day.play_duration || 0;
  });
  const totalPlayDays = Math.floor(totalPlayDuration / (24 * 60 * 60));
  const totalPlayHours = Math.floor(
    (totalPlayDuration % (24 * 60 * 60)) / (60 * 60),
  );
  const totalPlayMinutes = Math.floor((totalPlayDuration % (60 * 60)) / 60);
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
              <th className="truncate opacity-60">
                <Translation text="stats.FPUsed" />
              </th>
              <th className="truncate opacity-60">
                <Translation text="stats.RPRewarded" />
              </th>
              <th className="truncate opacity-60">
                <Translation text="stats.PlayDuration" />
              </th>
            </tr>
          </thead>
          <tbody>
            {dates.map((date, index) => {
              const playHours = Math.floor(
                (data[date].play_duration % (24 * 60 * 60)) / (60 * 60),
              );
              const playMinutes = Math.floor(
                (data[date].play_duration % (60 * 60)) / 60,
              );
              return (
                <tr
                  key={`row-stats-${index}`}
                  className="h-16 border-b border-white/[0.09] py-[21px] text-base font-medium"
                >
                  <td>
                    <div className="flex items-center gap-2 pl-9 leading-[21px]">
                      {/* <button 
                      onClick={() => toggleExpandRow(index)}
                      >
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
                  <td>
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
                  <td className="leading-[21px]">
                    {playHours} <Translation text="stats.hours" /> {playMinutes}{" "}
                    <Translation text="stats.minutes" />{" "}
                  </td>
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
              <td>
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
              <td className="leading-[21px]">
                {totalPlayDays} <Translation text="stats.days" />{" "}
                {totalPlayHours} <Translation text="stats.hours" />{" "}
                {totalPlayMinutes} <Translation text="stats.minutes" />
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

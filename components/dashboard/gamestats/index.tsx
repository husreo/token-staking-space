import CalendarIcon from "@/components/shared/icons/calendar";
import ClockIcon from "@/components/shared/icons/clock";
import PlayStation from "@/components/shared/icons/playstation";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import AdvanceFormat from "dayjs/plugin/advancedFormat";
import UTC from "dayjs/plugin/utc";
import Image from "next/image";
import RewardPoint from "public/images/FalconBadge/reward-point1.png";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { formatStats } from "utils/string";
import Translation from "utils/translation";
import BorderStat from "./BorderStat";
import TableGameStats from "./TableGameStats";

dayjs.extend(UTC);
dayjs.extend(AdvanceFormat);
const mockData = [
  {
    src: "/images/planet_nft.png",
    title: "Planet",
    value: "0",
  },
];
const TitleStat = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="z-10 font-aeonikPro text-lg font-medium tracking-[-0.6px] text-white sm:text-xl">
      {children}
    </div>
  );
};
const ContentStat = ({
  line1,
  line2,
}: {
  line1: React.ReactNode;
  line2: React.ReactNode;
}) => {
  return (
    <div className="z-10 w-fit pb-0 font-aeonikPro text-white lg:pb-4">
      <div className="text-[40px] font-medium ">{line1}</div>
      <div className="flex items-center gap-x-2">{line2}</div>
    </div>
  );
};

export type GameStatType = {
  datetime: string;
  play_time: number;
  game: string;
  score: number;
};

const GameStats = () => {
  const { session, profileNFTs } = useSelector(
    (state: RootState) => state.user,
  );
  const rpBalance = session?.user.balances.rp_balance || 0;
  const handleGetGamestats = async () => {
    const req = await fetch("/api/game/stats", {
      method: "GET",
    });
    const dataJson = await req.json();

    return dataJson.data as GameStatType[];
  };
  // useRequest(() => dispatch(fetchProfileNFTs()), {
  //   pollingInterval: 30000,
  // });
  const { data = [] } = useRequest(handleGetGamestats, {});
  const lastPlay = data[0];
  const totalPlaytime = data.reduce((a, d) => a + d.play_time, 0);
  const totalPlayDays = Math.floor(totalPlaytime / (24 * 60 * 60));
  const totalPlayHours = Math.floor(
    (totalPlaytime % (24 * 60 * 60)) / (60 * 60),
  );
  const totalPlayMinutes = Math.floor((totalPlaytime % (60 * 60)) / 60);
  const totalScore = data.reduce((a, d) => a + d.score, 0);
  return (
    <>
      <div className="mb-10 rounded-2xl bg-gray1 p-2 font-aeonikPro sm:p-6">
        <p className="text-[28px] font-medium text-white">
          <Translation text="dashboard.game-stats.last-play" />
        </p>
        <p className="mb-6 font-medium text-gray6">
          <Translation text="dashboard.game-stats.hold-more" />
        </p>
        <div className="grid grid-cols-12 grid-rows-2 gap-5 lg:h-[524px]">
          <div className="relative col-start-1 col-end-13 row-start-1 row-end-3 flex flex-col justify-end gap-10 overflow-hidden rounded-[10px] pb-10 lg:col-start-1 lg:col-end-5">
            <div className="relative z-10 mx-auto flex h-[324px] w-full scale-75 transform items-center justify-center sm:w-[324px]">
              <Image
                src={RewardPoint}
                className="absolute z-10 mx-auto w-[302px] sm:bottom-[11px] sm:left-[11px] sm:right-[11px] sm:top-[11px]"
                alt="reward_point"
              />
              <Image
                src={RewardPoint}
                fill
                className="bottom-0 left-0 right-0 top-0 mx-auto w-[302px] blur-2xl"
                sizes="(max-width: 600px) 100vw, 100vw"
                alt="reward_point"
              />
            </div>
            <button className="relative z-10 mx-auto block h-14 w-[178px] rounded-[10px] bg-gray2 text-2xl text-white">
              {rpBalance
                ? rpBalance > 999999
                  ? formatStats({
                      n: rpBalance,
                      notation: "compact",
                    })
                  : rpBalance
                : 0}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="178"
                height="56"
                fill="none"
                viewBox="0 0 178 56"
                className="absolute bottom-0 left-0 right-0 top-0 rounded-[10px] "
              >
                <rect
                  width="177"
                  height="55"
                  x="0.5"
                  y="0.5"
                  stroke="url(#paint0_linear_5_27)"
                  rx="9.5"
                ></rect>
                <defs>
                  <linearGradient
                    id="paint0_linear_5_27"
                    x1="89"
                    x2="89"
                    y1="0"
                    y2="56"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#00FFC2" stopOpacity="0.65"></stop>
                    <stop offset="1" stopColor="#00FFC2" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </button>
            {/* <Image
              src={StatBG}
              fill
              alt="bg"
              className="absolute -z-0 object-cover"
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              className="absolute bottom-0 left-0 right-0 top-0"
            >
              <rect
                width="100%"
                height="100%"
                stroke="url(#paint0_linear_52_55)"
                strokeOpacity="0.8"
                strokeWidth={1}
                rx="10"
              ></rect>
              <rect
                width="100%"
                height="100%"
                stroke="url(#paint0_linear_52_56)"
                strokeOpacity="0.8"
                strokeWidth={1}
                className="origin-center rotate-180 transform"
                rx="10"
              ></rect>
              <defs>
                <linearGradient
                  id="paint0_linear_52_55"
                  // x1="10%"
                  // x2="120%"
                  y1="40%"
                  y2="65%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#00FFC2" stopOpacity={1}></stop>
                  <stop
                    offset="10%"
                    stopColor="#00FFC2"
                    stopOpacity={0.8}
                  ></stop>
                  <stop offset="30%" stopColor="#00FFC2" stopOpacity={0}></stop>
                </linearGradient>
                <linearGradient
                  id="paint0_linear_52_56"
                  // x1="10%"
                  // x2="120%"
                  y1="40%"
                  y2="65%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#00FFC2" stopOpacity={1}></stop>
                  <stop
                    offset="10%"
                    stopColor="#00FFC2"
                    stopOpacity={0.8}
                  ></stop>
                  <stop offset="30%" stopColor="#00FFC2" stopOpacity={0}></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <BorderStat className="col-span-12 rounded-[10px] bg-gray1 sm:col-span-6 lg:col-span-4">
            <div className="flex h-full flex-col justify-between p-6">
              <TitleStat>
                <Translation text="dashboard.game-stats.play-date" />
              </TitleStat>
              <ContentStat
                line1={
                  lastPlay
                    ? `${dayjs(lastPlay.datetime)
                        .utc(true)
                        .format("hh:mm")} UTC`
                    : ""
                }
                line2={
                  <>
                    <span>
                      <CalendarIcon className="h-5 w-5" />
                    </span>
                    <span className="text-base font-medium">
                      {lastPlay
                        ? dayjs(lastPlay.datetime)
                            .utc(true)
                            .format("Do MMM YYYY")
                        : ""}
                    </span>
                  </>
                }
              />
            </div>
          </BorderStat>
          <BorderStat className="col-span-12 rounded-[10px] bg-gray1 sm:col-span-6 lg:col-span-4">
            <div className="flex h-full flex-col justify-between p-6">
              <TitleStat>
                <Translation text="dashboard.game-stats.play-duration" />
              </TitleStat>

              <div className="lg:pb-4">
                <p className="flex flex-wrap items-center gap-2 font-aeonikPro text-white">
                  <span className="inline-flex items-end gap-1">
                    <span className="text-3xl font-medium md:text-4xl lg:text-5xl">
                      {totalPlayDays}
                    </span>
                    <span className="font-light">
                      <Translation text="dashboard.game-stats.days" />
                    </span>
                  </span>
                  <span className="inline-flex items-end gap-1">
                    <span className="text-3xl font-medium md:text-4xl lg:text-5xl">
                      {totalPlayHours}
                    </span>
                    <span className="font-light">
                      <Translation text="dashboard.game-stats.hours" />
                    </span>
                  </span>
                  <span className="inline-flex items-end gap-1">
                    <span className="text-3xl font-medium md:text-4xl lg:text-5xl">
                      {totalPlayMinutes}
                    </span>
                    <span className="font-light">
                      <Translation text="dashboard.game-stats.minutes" />
                    </span>
                  </span>
                </p>
                <ClockIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </BorderStat>
          <BorderStat className="col-span-12 rounded-[10px] bg-gray1 sm:col-span-6 lg:col-span-4">
            <div className="flex h-full flex-col justify-between p-6">
              <TitleStat>
                <Translation text="dashboard.game-stats.game-score" />
              </TitleStat>
              <ContentStat
                line1={totalScore}
                line2={
                  <>
                    <span>
                      <PlayStation className="h-5 w-5" />
                    </span>
                    <span className="text-base font-medium">
                      <Translation text="dashboard.game-stats.total-score" />
                    </span>
                  </>
                }
              />
            </div>
          </BorderStat>
          <BorderStat className="col-span-12 rounded-[10px] bg-gray1 sm:col-span-6 lg:col-span-4">
            <div className="flex h-full flex-col justify-between p-6 font-aeonikPro text-white">
              <TitleStat>
                <Translation text="dashboard.game-stats.nft-holdings" />
              </TitleStat>
              <div className="z-10 flex w-full justify-center bg-transparent">
                <div className="flex w-full justify-between gap-x-5 max-[414px]:gap-x-0">
                  <div className="flex flex-col items-center justify-center gap-y-[6px] px-1 pt-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full md:h-[60px] md:w-[60px]">
                      <Image
                        className="object-contain"
                        src="/images/planet_nft.png"
                        fill
                        alt="nft"
                        sizes="(max-width: 600px) 100vw, 100vw"
                      />
                    </div>

                    <div className="w-full text-center font-medium">
                      <p className="text-base text-[#ABB2B0]">Planet</p>
                      <p className="text-base">
                        {profileNFTs?.filter(
                          (nft) =>
                            nft?.offChainMetadata?.metadata?.symbol.toLowerCase() ===
                              "fcon" ||
                            nft?.onChainMetadata?.metadata?.data.symbol ===
                              "fcon",
                        ).length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BorderStat>
        </div>
      </div>
      <TableGameStats data={data} />
    </>
  );
};

export default GameStats;

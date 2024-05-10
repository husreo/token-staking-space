import { useTranslations } from "next-intl";
import { formatStats } from "utils/string";
const DetailDailyReward = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="flex w-full justify-between  md:flex-col md:justify-start">
      <p className=" text-[13px] font-medium uppercase leading-[18px] opacity-70">
        {title}
      </p>
      <p className="text-[17px] font-bold">{value}</p>
    </div>
  );
};

export default function DailyReward({ rate }: { rate: number }) {
  const t = useTranslations();
  const tranlate = (text: string) => t(`leaderboard.${text}`);
  return (
    <div
      style={{
        background:
          "linear-gradient(271deg, rgba(255, 199, 0, 0.30) 0.01%, rgba(255, 130, 14, 0.30) 100%)",
      }}
      className="mt-4 flex w-full flex-col gap-4 rounded-lg border border-white/[0.09] px-5 py-7 backdrop-blur-[27px] sm:px-9 sm:py-8"
    >
      <p className="flex flex-col items-center justify-between text-center text-[15px] font-bold text-[#E2E2E2] sm:flex-row">
        <span>
          {tranlate("daily-reward")} (Start & End date: 00:00 - 23:00 UTC)
        </span>
        {/* <span className="font-normal">Jan 23 2024 to March 23 2024</span> */}
      </p>
      <div className="h-[1px] w-full bg-white/[0.09]"></div>
      <div className="flex flex-col justify-between md:flex-row">
        <DetailDailyReward
          title={`${tranlate("rank")} 1`}
          value={
            rate > 0
              ? `${formatStats({ n: 30 / rate, notation: "compact" })} FCON`
              : ""
          }
        />
        <DetailDailyReward
          title={`${tranlate("rank")} 2`}
          value={
            rate > 0
              ? `${formatStats({ n: 15 / rate, notation: "compact" })} FCON`
              : ""
          }
        />
        <DetailDailyReward
          title={`${tranlate("rank")} 3`}
          value={
            rate > 0
              ? `${formatStats({ n: 10 / rate, notation: "compact" })} FCON`
              : ""
          }
        />
        <DetailDailyReward
          title={`${tranlate("rank")} 4 - 10`}
          value={
            rate > 0
              ? `${formatStats({ n: 5 / rate, notation: "compact" })} FCON`
              : ""
          }
        />
        <DetailDailyReward
          title={`${tranlate("rank")} 11 - 20`}
          value={
            rate > 0
              ? `${formatStats({ n: 1 / rate, notation: "compact" })} FCON`
              : ""
          }
        />
      </div>
    </div>
  );
}

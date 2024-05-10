import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Button, { AnimationSpin } from "@/components/shared/button";
import { formatStats } from "utils/string";
import { useTranslations } from "next-intl";
import Translation from "utils/translation";
import { useRequest } from "ahooks";
import Link from "next/link";

const DetailInfo = ({
  title = "",
  value = "",
  icon = false,
}: {
  title: string;
  value: string | React.ReactNode;
  icon?: boolean;
}) => {
  return (
    <div className="w-fit min-w-[100px]">
      <h3 className="truncate font-aeonikPro text-[15px] font-normal text-[#9C9C9C]">
        {" "}
        {title}
      </h3>
      <div className="flex flex-row items-center gap-x-1">
        {icon && (
          <div className="relative flex h-5 w-5">
            <Image
              className="object-cover"
              src="/images/Leaderboard/badge-icon.png"
              fill
              alt=""
              sizes="(max-width: 600px) 100vw, 100vw"
            />
          </div>
        )}
        <div
          className={`-mb-1 font-aeonikPro text-xl font-semibold text-[#E2E2E2] `}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default function MyRatingInfo() {
  const { session } = useSelector((state: RootState) => state.user);
  const t = useTranslations();
  const tranlate = (text: string) => t(`leaderboard.${text}`);
  // const totalTime = session?.user.total_play_duration || 0;
  // const totalPlayDays = Math.floor(totalTime / (24 * 60 * 60));
  // const totalPlayHours = Math.floor((totalTime % (24 * 60 * 60)) / (60 * 60));
  // const totalPlayMinutes = Math.floor((totalTime % (60 * 60)) / 60);
  // const remainingSeconds = totalTime % 60;

  // function convertSecondsToHMS(seconds: number) {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   const remainingSeconds = seconds % 60;

  //   return [hours, minutes, remainingSeconds]
  //     .map((val) => (val < 10 ? `0${val}` : val))
  //     .join(":");
  // }

  // const formattedTime = convertSecondsToHMS(totalTime);

  const { data, loading } = useRequest(
    async () => {
      const req = await fetch("/api/tournament/get-owned-ticket", {
        method: "GET",
        cache: "no-cache",
      });
      const data = await req.json();
      return data;
    },
    {
      ready: !!session?.user?.username,
    },
  );
  return (
    <div className="mt-20 flex min-h-[138px] flex-row items-center justify-between gap-8 rounded-bl-lg rounded-br-lg bg-[linear-gradient(180deg,rgba(24,38,35,0.00)0%,rgba(24,38,35,0.38)100%)] p-2 max-md:flex-col sm:mt-12 sm:p-8 lg:mt-0">
      <div className="flex gap-10 sm:gap-x-16">
        <div className="flex items-center gap-4 max-[500px]:flex-col">
          <div className="relative mx-auto h-[87px] w-[87px] overflow-hidden">
            <Image
              className="rounded-full object-cover"
              src={"/images/Leaderboard/avatar_3.png"}
              fill
              alt=""
              sizes="(max-width: 600px) 100vw, 100vw"
            />
          </div>
          <h1 className="flex w-full flex-1 items-center text-xl font-medium max-[500px]:text-center sm:text-[29px]">
            <span className="max-w-[150px] truncate">
              {session?.user?.username || "User"}
            </span>
          </h1>
        </div>
        <div className="flex w-full flex-1 flex-col justify-center gap-y-5 font-aeonikPro max-[500px]:items-center">
          <div className="w-full">
            <div className="flex gap-x-20 gap-y-5 max-lg:flex-wrap xl:gap-x-10">
              <DetailInfo
                title={tranlate("your-rank")}
                // value={session?.user.score_rank || 0}
                value={0}
              />
              <DetailInfo
                title={tranlate("presale-bought")}
                // value={
                //   <div className="flex items-center">
                //     {totalPlayDays > 0 ? ` ${totalPlayDays}D : ` : ""}{" "}
                //     {totalPlayHours}H:{totalPlayMinutes}M:{remainingSeconds}S
                //   </div>
                // }
                value={0}
                // value={session?.user?.presale_package || 0}
              />
              <DetailInfo
                title={tranlate("lifetime-score")}
                value={0}
                // value={session?.user?.lifetime_total_score || 0}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-[10px] rounded-xl border border-fcon bg-[#044F3D] p-4 lg:w-[326px]">
        {(!loading &&
          (data?.total_tickets > 0 ? (
            <p className="flex-1 text-center font-medium leading-[18px]">
              {tranlate("enrolled")}
            </p>
          ) : (
            <>
              <p className="flex-1 text-[13px] font-normal leading-[18px]">
                {tranlate("enroll-text")}
              </p>
              <Link href="/dashboard?tab=overview">
                <Button className="flex items-center justify-center rounded px-4 py-[6px] text-black lg:h-9">
                  <Translation text="button.get-ticket" />
                </Button>
              </Link>
            </>
          ))) || <AnimationSpin />}
      </div>
    </div>
  );
}

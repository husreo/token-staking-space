"use client";

import Aviatrix from "@/components/shared/icons/aviatrix";
import NotificationIcon from "@/components/shared/icons/notification-icon";
import { useCountDown, useRequest } from "ahooks";
import { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IPlatformStats } from "types/stats";
import { addLeadingZero } from "utils/string";
import StarterPackIcon from "./StarterPackIcon";

const CountdownUnit = ({
  value,
  unit,
}: {
  value: string | number;
  unit: string;
}) => {
  return (
    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md border border-white/[0.12] bg-gray3">
      <p
        suppressHydrationWarning
        className="mb-[6px] font-dinPro text-[28px] font-bold leading-6 text-white"
      >
        {value}
      </p>
      <p
        suppressHydrationWarning
        className="font-aeonikPro font-medium leading-4 text-white"
      >
        {unit}
      </p>
    </div>
  );
};

const CountdownMint = () => {
  const [targetDate, _setTargetDate] = useState<Dayjs | undefined>();
  const [_countdown, formattedRes] = useCountDown({
    targetDate: targetDate,
  });
  const { hours, minutes, seconds, days } = formattedRes;
  const t = useTranslations();
  const whitelist = useSelector((state: RootState) => state.user.whiteList);
  const translate = (text: string) => t(`aviatrix.${text}`);

  const { data } = useRequest(async () => {
    const d = await fetch("/api/platform", {
      cache: "no-cache",
    });
    const dJson = await d.json();
    return dJson as any as IPlatformStats;
  });
  // useEffect(() => {
  //   setTargetDate(dayjs().add(1, "day").endOf("date"));
  //   return () => {
  //     setTargetDate(undefined);
  //   };
  // }, []);
  return (
    <div className="grid grid-cols-12 gap-4 pt-48 font-aeonikPro md:gap-5 md:pt-28 lg:pt-0">
      <div className="col-span-12 sm:col-span-9 md:col-span-7 lg:col-span-5">
        <div className="mb-5 flex flex-wrap items-end gap-6">
          <div>
            <Aviatrix className="mb-6 w-[226px]" />
            <div className="flex items-center gap-[10px] text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="7"
                fill="none"
                viewBox="0 0 7 7"
              >
                <path
                  fill="#fff"
                  d="M3.158-.005l3.159 3.158L3.158 6.31 0 3.153 3.158-.005z"
                ></path>
              </svg>
              <StarterPackIcon className="w-[182px]" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="7"
                fill="none"
                viewBox="0 0 7 7"
              >
                <path
                  fill="#fff"
                  d="M3.158-.005l3.159 3.158L3.158 6.31 0 3.153 3.158-.005z"
                ></path>
              </svg>
            </div>
          </div>
          <p className="border-2 border-white/[0.03] bg-white/10 px-3 py-1 font-aeonikPro text-[13px] text-white">
            <span className="font-bold">{data?.total_whitelisted || 0}</span>{" "}
            <span className="uppercase">{t("aviatrix.user-whitelisted")}</span>
          </p>
        </div>
        <p className="font-aeonikPro text-[13px] text-white">
          {translate("description")}
        </p>
      </div>
      <div className="col-span-12 flex items-end lg:col-span-7 xl:col-span-6 xl:col-start-7">
        <div
          style={{
            background:
              "linear-gradient(270deg, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.00) 100%)",
          }}
          className="flex flex-1 flex-col items-end justify-between rounded-xl md:flex-row md:px-3 md:pb-4"
        >
          <div className="pb-1">
            <p className="mb-[6px] flex flex-wrap items-center gap-[6px] font-aeonikPro text-white">
              <span className="capitalize text-white/60">
                {translate("mint-time")}
              </span>
              <span className="inline-flex h-5 items-center gap-1 rounded-[45px] bg-white/[0.12] px-[6px] text-[13px] uppercase">
                {translate("remind")}
                <NotificationIcon className="w-[14px]" />
              </span>
            </p>
            <p className="font-aeonikPro text-lg font-medium text-white">TBA</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {whitelist?.is_qualified ? (
              <p className="inline-flex w-fit items-center gap-[6px] rounded-lg border border-[#24BE3D] bg-[#24be3d40] p-[7px]">
                <span className="inline-block h-[10px] w-[10px] rounded-full bg-[#24BE3D]"></span>
                <span className="font-aeonikMono text-[13px] text-white">
                  {translate("claimed-whitelist-spot")}
                </span>
              </p>
            ) : (
              <p className="inline-flex w-fit items-center gap-[6px] rounded-lg border border-[#FF2C2C] bg-[#ff0000]/30 p-[7px]">
                <span className="inline-block h-[10px] w-[10px] rounded-full bg-[#FF2C2C]"></span>
                <span className="font-aeonikMono text-[13px] text-white">
                  {translate("claim-whitelist-spot")}
                </span>
              </p>
            )}
            <div className="flex items-center gap-4">
              <p className="inline-flex items-end gap-2">
                <span className="font-dinPro text-4xl text-white md:text-4xl lg:text-5xl">
                  {addLeadingZero(days)}
                </span>
                <span className="text-white/60">{translate("days")}</span>
              </p>
              <div className="h-[18px] w-[1px] bg-white/20"></div>
              <p className="font-dinPro text-4xl text-white md:text-4xl lg:text-5xl">
                <span>{addLeadingZero(hours)}</span>
                <span>:</span>
                <span>{addLeadingZero(minutes)}</span>
                <span>:</span>
                <span>{seconds}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownMint;

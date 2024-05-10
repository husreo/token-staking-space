"use client";
import Image from "next/image";
import Badge from "public/images/FalconBadge/reward-point1.png";
import RedeemBG from "./RedeemBG";

import { useCountDown, useSize } from "ahooks";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import BadgeBG from "./BadgeBG";
import TotalRPBorder from "./TotalRPBorder";
import { useTranslations } from "next-intl";

const dataTable = [
  {
    dateTime: "18th Oct 2023, 15:35 UTC",
    redeemType: "Apple gift card",
    amount: "748",
  },
  {
    dateTime: "18th Oct 2023, 15:35 UTC",
    redeemType: "Apple gift card",
    amount: "748",
  },
  {
    dateTime: "18th Oct 2023, 15:35 UTC",
    redeemType: "Apple gift card",
    amount: "748",
  },
  {
    dateTime: "18th Oct 2023, 15:35 UTC",
    redeemType: "Apple gift card",
    amount: "748",
  },
  {
    dateTime: "18th Oct 2023, 15:35 UTC",
    redeemType: "Apple gift card",
    amount: "748",
  },
];

const CountDown = ({
  time = "",
  unit = "",
}: {
  time: string | number;
  unit: string;
}) => {
  return (
    <div className="flex h-11 w-11 flex-col items-center justify-center rounded-md border border-white/[0.12] bg-[#2D3130]">
      <p className="mt-1 font-dinPro text-xl font-bold">{time}</p>
      <p className="-mt-1 text-[10px] font-medium">{unit}</p>
    </div>
  );
};
const RedeemRPStats = () => {
  const formatNumber = (number: number) => number.toString().padStart(2, "0");
  const { session } = useSelector((state: RootState) => state.user);
  const [targetDate, setTargetDate] = useState<Dayjs | undefined>();
  const [_countdown, formattedRes] = useCountDown({
    targetDate,
  });
  const { hours, minutes, seconds } = formattedRes;
  const ref = useRef(null);
  const size = useSize(ref);
  const t = useTranslations();
  const translate = (text: string) => t(`dashboard.redeem.${text}`);

  useEffect(() => {
    setTargetDate(dayjs().endOf("day"));
    return () => {
      setTargetDate(undefined);
    };
  }, []);

  return (
    <div className="relative col-span-12 overflow-hidden rounded-[10px] bg-gray1 p-3 sm:p-6">
      <RedeemBG className="absolute bottom-0 left-0 right-0 top-0 h-full w-full" />
      <div className="mb-3 flex items-center gap-x-4">
      <p className="z-10 text-center text-[28px] font-bold">
          {translate("redeem-rp")}
        </p>
        <div className="z-10 flex h-12 items-center justify-center gap-x-[6px] rounded-[10px] bg-gray2 p-[7px]">
          <Image
            className="h-5 w-5 object-cover"
            src={Badge}
            alt="logo"
            sizes="(max-width: 600px) 100vw, 100vw"
          />
          <p className="font-dinPro text-[13px] font-bold">RP/USD</p>
        </div>
      </div>
      <div className="flex flex-col gap-x-7 gap-y-16 max-[414px]:gap-y-10 sm:gap-y-12 lg:flex-row lg:gap-y-0">
        <div className="z-10 flex flex-1 flex-col items-center gap-[13px]">
          <div className="relative flex h-[183px] w-[183px] items-center justify-center">
            <BadgeBG className="absolute bottom-0 left-0 right-0 top-0 h-full w-full" />
            <Image
              className="z-10 h-[172px] w-[172px] object-cover"
              src={Badge}
              alt="logo"
              sizes="(max-width: 600px) 100vw, 100vw"
              quality={100}
            />
          </div>
          <div className="relative flex h-[155px] w-[220px] flex-col items-center rounded-2xl bg-[#1A1A1A] px-5 pt-4 sm:w-[290px]">
            <TotalRPBorder className="absolute bottom-0 left-0 right-0 top-0" />
            <p className="relative z-10 mb-[10px] text-base font-medium">
              {translate("total-rp")}
            </p>
            <div className="relative z-10 mb-2 flex h-14 w-[178px] items-center justify-center rounded-[10px] border border-[#2D3130] bg-gray2 p-[7px] text-center text-2xl font-bold">
              {Intl.NumberFormat("en", { notation: "compact" }).format(
                session?.user?.rp_accumulated || 0,
              )}{" "}
              RP
            </div>
            {/* <p className="flex h-7 w-full items-center justify-center text-sm font-medium text-[#1FCAA1]">
              ~ 756.45 USD
            </p> */}
          </div>
        </div>
        {/* <div
          ref={ref}
          className="relative z-10 flex h-[378px] w-full flex-1 flex-col rounded-2xl bg-[#1A1A1A] px-6 py-4 max-[414px]:mt-5 max-[350px]:mt-0 lg:w-[592px]"
        >
          <CountDownBorder
            sizeWidth={size?.width}
            sizeHeight={size?.height}
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
          />
          <div className="z-10 h-full w-full">
            <div className="mt-[5px] flex h-[41px] items-center justify-center gap-x-[17px]">
              <span className="truncate text-sm font-normal">
                Daily limit resets in
              </span>
              <div className="flex items-center gap-x-2">
                <CountDown time={formatNumber(hours)} unit="Hr" />
                <ColunIcon className="h-[10px] w-1" />
                <CountDown time={formatNumber(minutes)} unit="M" />
                <ColunIcon className="h-[10px] w-1" />
                <CountDown time={formatNumber(seconds)} unit="S" />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 py-1 sm:justify-center">
              <div className="flex gap-[2px] text-sm font-medium sm:gap-[5px]">
                <span className="text-[#4F5654]">Daily Limit:</span> &nbsp;
                <span>10,000 RP</span>
              </div>
              <span className="h-[10px] w-[1px] bg-[#404544]"></span>
              <div className="flex gap-[2px] text-sm font-medium sm:gap-[5px]">
                <span className="text-[#4F5654]">Minimum Amount:</span> &nbsp;
                <span>2,000 RP</span>
              </div>
              <span className="h-[10px] w-[1px] bg-[#404544]"></span>
              <div className="text-sm font-medium">
                <span className="text-[#4F5654]">Redeemed:</span>&nbsp;
                <span className="text-[#FF2C2C]">5,000 RP</span>
              </div>
            </div>
            <div className="mt-4">
              <AmountTable data={dataTable} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RedeemRPStats;

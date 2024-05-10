"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import AviatrixStatsBG from "public/images/Aviarix/aviatrix-stats.png";
import React from "react";
import { classNames } from "utils/string";
const StatValue = ({
  value1 = "",
  value2 = "",
}: {
  value1?: string;
  value2?: string | React.ReactNode;
}) => {
  return (
    <div>
      <p className="truncate text-[32px] font-medium">{value1}</p>
      <p className="text-base tracking-[-0.48px] text-gray7">{value2}</p>
    </div>
  );
};
const StatTitle = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={classNames("text-xl font-medium tracking-[-0.6px]", className)}
    >
      {children}
    </p>
  );
};
const StatBox = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        "col-span-12 flex h-[178px] w-full flex-col justify-between rounded-[10px] border border-white/[0.12] bg-gray1 py-6 pl-8 pr-2 sm:col-span-6 lg:col-span-4",
        className,
      )}
    >
      {children}
    </div>
  );
};
export default function StatsBox() {
  const t = useTranslations();
  const translate = (text: string) => t(`stats.${text}`);
  return (
    <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <Image
        src={AviatrixStatsBG}
        alt="aviatrix-stats"
        priority
        className="w-[183px]"
        sizes="(max-width: 600px) 100vw, 100vw"
      />
      {/* <div className="grid w-full grid-cols-12 gap-6">
        <StatBox>
          <StatTitle>December 2023</StatTitle>
          <StatValue value1="35,946,000" value2={translate('play-track')} />
        </StatBox>
        <StatBox>
          <StatTitle>December 2023</StatTitle>
          <StatValue value1="35,946,000" value2={translate('play-track')} />
        </StatBox>
        <StatBox>
          <StatTitle>December 2023</StatTitle>
          <StatValue value1="35,946,000" value2={translate('play-track')} />
        </StatBox>
      </div> */}
    </div>
  );
}

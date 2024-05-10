"use client";

import Image from "next/image";
import SolCircle from "public/images/tokens/sol_circle.png";
import { MouseEventHandler, ReactNode, useState } from "react";
import { classNames } from "utils/string";
import Translation from "utils/translation";

interface TabListItem {
  id: number;
  title: string;
  price: string;
  supply: string;
  date: string | ReactNode;
  status: string;
}

const TAB_LIST: TabListItem[] = [
  {
    id: 1,
    title: "Presale",
    price: "1.2 SOL",
    supply: "3500",
    date: <Translation text="presale.date-detail" />,
    status: "LIVE",
  },
  {
    id: 2,
    title: "Whitelisted",
    price: "TBA",
    supply: "TBA",
    date: "TBA",
    status: "TBA",
  },
  {
    id: 3,
    title: "Non-whitelisted",
    price: "TBA",
    supply: "TBA",
    date: "TBA",
    status: "TBA",
  },
];

// color: var(--White, #FFF);
// font-feature-settings: 'clig' off, 'liga' off;
// font-family: "Helvetica Neue";
// font-size: 30px;
// font-style: normal;
// font-weight: 400;
// line-height: 120%; /* 36px */

const MintInfoItem = ({
  record,
  isTabActive,
  onClick = () => {},
}: {
  record: TabListItem;
  isTabActive: boolean;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}) => (
  <div
    onClick={onClick}
    className={classNames(
      "cursor-pointer rounded-[18px] border border-solid p-8 backdrop-blur-[27px]",
      isTabActive
        ? "border-[#00FFC2] bg-[#00ffc2]/[0.08]"
        : "border-white/[0.08] bg-white/[0.08]",
    )}
  >
    <div className="mb-[34px] text-[30px] leading-[36px]">{record?.title}</div>
    <div className="grid grid-cols-2 gap-[14px] text-[15px]">
      <div className="opacity-[0.65]">
        <Translation text="presale.price" />
      </div>
      <div className="flex items-center justify-end gap-2 text-right">
        <div>
          <Image src={SolCircle} alt="" width={16} height={16} />
        </div>
        <div>{record?.price}</div>
      </div>
      <div className="opacity-[0.65]">
        <Translation text="presale.supply" />
      </div>
      <div className="text-right">{record?.supply}</div>
      <div className="opacity-[0.65]">
        <Translation text="presale.date" />
      </div>
      <div className="text-right">{record?.date}</div>
    </div>
  </div>
);

const PresaleMintInfo = () => {
  const [tabActive, setTabActive] = useState(1);

  const handleChangeTab = (tab: number) => {
    setTabActive(tab);
  };

  return (
    <div className="container relative mx-auto px-3 font-aeonikPro text-white md:px-0">
      <div className="text-[50px] leading-[60px]">
        <Translation text="presale.mint-info" />
      </div>
      <div className="mt-4 text-[20px]">
        <Translation text="presale.opportunities" />
      </div>
      <div
        className="mt-[53px] grid grid-cols-1 gap-6 md:grid-cols-3"
        onClick={() => {}}
      >
        {TAB_LIST.map((i) => (
          <MintInfoItem
            key={i.id}
            isTabActive={i.id === tabActive}
            record={i}
            onClick={() => {
              // handleChangeTab(i.id);
            }}
          />
        ))}
      </div>
      <div className="mt-8 hidden grid-cols-3 md:grid">
        {TAB_LIST.map((i) => (
          <div
            key={i.id}
            className={classNames(
              "pointer-events-none flex h-[1px] w-full select-none justify-center bg-white/[0.08]",
            )}
          >
            <div
              key={i.id}
              className={classNames(
                "pointer-events-none h-[1px] select-none",
                tabActive === i.id
                  ? "w-full bg-[#00FFC2]"
                  : "w-[175px] bg-white/[0.18]",
              )}
            >
              &nbsp;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresaleMintInfo;

"use client";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { classNames } from "utils/string";
import ArrowDownIcon from "@/components/shared/icons/arrow-down";
import dayjs from "dayjs";
import Translation from "utils/translation";

export default function MobileTab({
  rangeSelectTabs,
  handleChangeMonthTab = (tabKey, tabNumber) => {},
  timeFilter,
  className = "",
}: {
  rangeSelectTabs: any[];
  handleChangeMonthTab: (tabKey: string, tabNumber: number) => void;
  timeFilter: any;
  className?: string;
}) {
  return (
    <div className={classNames("relative", className)}>
      <Menu>
        <Menu.Button className="flex h-14 w-full items-center hover:bg-white/10 justify-between rounded-lg border border-white/10 px-[14px] py-2 sm:min-w-[307px]">
          <div className="text-left font-normal">
            <p className="text-[13px] text-gray6"><Translation text="leaderboard.time-range"/></p>
            <p className="text-base leading-[22px]">
              {timeFilter}, {dayjs().format("YYYY")}
            </p>
          </div>
          <ArrowDownIcon className="h-5 w-5 opacity-40" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-1/2 z-50 w-full -translate-x-1/2 transform rounded-md bg-gray2 shadow-lg focus:outline-none">
            <div className="flex flex-col px-1 py-1">
              {rangeSelectTabs.map((tab, idx) => {
                return (
                  <Menu.Item key={`month-${idx}`}>
                    <button
                      onClick={() =>
                        handleChangeMonthTab(tab.key, tab.numberDate)
                      }
                      className="cursor-pointer rounded-[10px] ring-offset-0 focus:border-none focus:outline-none"
                    >
                      <div
                        className={classNames(
                          "flex h-9 items-center justify-center rounded-[10px] px-3 py-[7px] capitalize text-white transition-all delay-75 duration-75 ease-in-out hover:bg-[rgba(0,255,194,0.07)]",
                          timeFilter == tab.key
                            ? "border border-white/[0.12] bg-[#2D3130]"
                            : "border border-none bg-transparent",
                        )}
                      >
                        {tab.title}
                      </div>
                    </button>
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

"use client";
import ArrowDownIcon from "@/components/shared/icons/arrow-down";
import CelendarIcon from "@/components/shared/icons/calendar-icon";
//@ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Translation from "utils/translation";
import { GameStatType } from "../ActivePlayerStats";
import LineChart from "./LineChart";
import { classNames } from "utils/string";
import dayjs from "dayjs";
import RocketLoading from "@/components/shared/loading/RocketLoading";

const PoolChart = ({
  data,
  fromDate,
  toDate,
  setFromDate = (date) => {},
  setToDate = (date) => {},
  chartFilter = "",
  setChartFilter = (value) => {},
  // handleChangeTab = () => {},
  labelTitle = "Active Player",
  keyTable,
  isLoading = false,
}: {
  data: { [key: string]: GameStatType | any };
  fromDate?: any;
  toDate?: any;
  chartFilter?: string;
  setFromDate?: (date: any) => void;
  setToDate?: (date: any) => void;
  setChartFilter?: (value: string) => void;
  labelTitle?: string;
  keyTable: string;
  isLoading?: boolean;
}) => {
  const rangeSelectTabs = [
    {
      title: "7d",
      onClick: () => {
        setChartFilter("7d");
      },
    },
    {
      title: "30d",
      onClick: () => {
        setChartFilter("30d");
      },
    },
    {
      title: "90d",
      onClick: () => {
        setChartFilter("90d");
      },
    },
    {
      title: "1y",
      onClick: () => {
        setChartFilter("1y");
      },
    },
    {
      title: "All",
      onClick: () => {
        setChartFilter("All");
      },
    },
  ];

  return (
    <div className="h-fit w-full rounded bg-gray1 px-2 pt-[26px] lg:h-[366px] lg:px-5">
      <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
        <div className="flex items-center gap-4 max-[400px]:flex-col">
          <p className="text-lg font-medium tracking-[-0.36px]">
            <Translation text="stats.view-by" />
          </p>
          <div className="flex items-center gap-2 rounded-[10px] bg-gray2 p-2 text-[13px] font-bold">
            {rangeSelectTabs.map((tab, idx) => {
              return (
                <div
                  key={`${keyTable}-${idx}`}
                  onClick={() => {
                    if (tab.onClick) {
                      tab.onClick();
                    }
                  }}
                  className="cursor-pointer rounded-[10px] ring-offset-0 transition-all delay-100 duration-200 ease-out hover:scale-110 hover:bg-green-200 hover:bg-opacity-50 hover:text-white/80 focus:border-none focus:outline-none"
                >
                  <div
                    className={classNames(
                      "flex h-9 items-center  justify-center rounded-[10px] px-3 py-[7px]",
                      chartFilter == tab.title ? "bg-fcon text-gray0" : "",
                    )}
                  >
                    {tab.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-4 max-[450px]:flex-col">
          <div>
            <p className="mb-[7px] text-sm font-medium tracking-[-0.28px] text-gray7">
              <Translation text="stats.from-date" />
            </p>
            <div className="duration-400 relative flex h-9 cursor-pointer items-center rounded-[10px] border border-white/20 bg-gray2 px-3 py-[7px] transition-all delay-100 ease-in-out hover:bg-white/20">
              <DatePicker
                onChange={(date: any) => setFromDate(date)}
                selected={fromDate}
                showIcon
                className="relative z-10 w-full cursor-pointer border border-none bg-transparent pl-0 text-center text-[13px] focus:border-none focus:ring-0"
                icon={
                  <CelendarIcon className="left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform !p-0" />
                }
                dateFormat="MMMM d, yyyy"
                maxDate={dayjs(toDate).subtract(2, "day").toDate()}
              />
              <div className="absolute bottom-0 right-3 top-2">
                <ArrowDownIcon className="h-4 w-4 " />
              </div>
            </div>
          </div>
          <div>
            <p className="mb-[7px] text-sm font-medium tracking-[-0.28px] text-gray7">
              <Translation text="stats.to-date" />
            </p>
            <div className="duration-400 relative flex h-9 cursor-pointer items-center rounded-[10px] border border-white/20 bg-gray2 px-3 py-[7px] transition-all delay-100 ease-in-out hover:bg-white/20">
              {/* <div className="absolute bottom-0 left-3 top-2 z-10">
                  <CelendarIcon className="h-4 w-4" />
                </div> */}
              <DatePicker
                selected={toDate}
                onChange={(date: any) => setToDate(date)}
                showIcon
                className="relative z-10 w-full cursor-pointer border border-none bg-transparent pl-0 text-center text-[13px] focus:border-none focus:ring-0"
                icon={
                  <CelendarIcon className="left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform !p-0" />
                }
                dateFormat="MMMM d, yyyy"
                minDate={dayjs(fromDate).subtract(-2, "day").toDate()}
              />
              <div className="absolute bottom-0 right-3 top-2">
                <ArrowDownIcon className="h-4 w-4 " />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div key={chartFilter}>
        {isLoading ? (
          <div className="relative w-full h-[200px]">
            <RocketLoading className="h-24 w-24" />
          </div>
        ) : (
          <div className="mt-11 w-full overflow-x-scroll">
            <div className="w-[2000px] md:w-full">
              <LineChart
                chartFilter={chartFilter}
                dataChart={data}
                labelTitle={labelTitle}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolChart;

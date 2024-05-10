"use client";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import PoolChart from "./PoolChart";
import TableWebStat from "./TableWebStat";
import { useTranslations } from "next-intl";
export interface GameStatType {
  date: string;
  users: number;
  play_duration: number;
  score: number;
  fp_spent: number;
}
export default function ActiveUserStats() {
  const defaultFromDate = dayjs().subtract(6, "day").toDate();
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(new Date());
  const formatFromDate = dayjs(fromDate).format("YYYY-MM-DD");
  const formatToDate = dayjs(toDate).format("YYYY-MM-DD");
  const [data, setData] = useState([]);
  const [chartFilter, setChartFilter] = useState("7d");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations()
  const handleGetGamestats = async () => {
    try {
      setIsLoading(true);
      const req = await fetch(
        `/api/platform/game-stats/active-users?from_date=${formatFromDate}&to_date=${formatToDate}&is_all=${isAllDate}`,
        {
          method: "GET",
        },
      );

      const dataJson = await req.json();
      setData(dataJson);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const isAllDate = useMemo(() => {
    return chartFilter === "All" ? true : false;
  }, [chartFilter]);
  useEffect(() => {
    handleGetGamestats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);
  useEffect(() => {
    if (chartFilter === "7d") {
      setFromDate(dayjs().subtract(6, "day").toDate());
      setToDate(dayjs().toDate())
    } else if (chartFilter === "30d") {
      setFromDate(dayjs().subtract(29, "day").toDate());
      setToDate(dayjs().toDate())
    } else if (chartFilter === "90d") {
      setFromDate(dayjs().subtract(89, "day").toDate());
      setToDate(dayjs().toDate())
    } else if (chartFilter === "1y") {
      setFromDate(dayjs().subtract(364, "day").toDate());
      setToDate(dayjs().toDate())
    } else if (chartFilter === "All") {
      setFromDate(dayjs("2023-11-20").toDate());
      setToDate(dayjs().toDate())
    }
  }, [chartFilter]);
  return (
    <>
      <PoolChart
        data={data}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        chartFilter={chartFilter}
        setChartFilter={setChartFilter}
        labelTitle={t('stats.active-user')}
        keyTable="active_stats"
        isLoading={isLoading}
      />
      <TableWebStat data={data} isLoading={isLoading} />
    </>
  );
}

import LineChartV2 from "@/components/layout/stats/LineChartV2";
import { formatStats } from "utils/string";
import SelectTime from "./SelectTime";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import { ReactNode, useEffect, useState } from "react";
import { StatsInterval, StatsType } from "types/stats";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BarChart from "@/components/layout/stats/BarChart";

type Props = {
  statsType?: StatsType;
  title: string | ReactNode;
  chartType?: "line" | "bar";
  chartLogo?: ReactNode;
  dataKey: string;
  hasRange?: boolean;
  hasPlan?: boolean;
};

const StatsChart: React.FC<Props> = ({
  statsType = "new-user",
  title,
  chartType = "line",
  chartLogo,
  dataKey,
  hasRange,
  hasPlan = true,
}) => {
  const [plan, setPlan] = useState(7);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const { data = [], run } = useRequest(
    async (p: {
      date_from: string;
      date_to: string;
      interval: StatsInterval;
    }) => {
      const req = await fetch(
        `/api/stats?date_from=${p.date_from}&date_to=${p.date_to}&interval=${p.interval}&stats_type=${statsType}`,
      );

      const d = await req.json();

      return d?.data || [];
    },
    {
      manual: true,
    },
  );

  const handlePlanChaning = (d: number) => {
    let date_from;
    let date_to;
    let interval: StatsInterval = "day";

    if (d === 1) {
      interval = "day";
    } else if (d === 7) {
      interval = "week";
    } else if (d === 30) {
      interval = "month";
    } else if (d === 365) {
      interval = "year";
    }
    date_from = dayjs().startOf(interval).format("YYYY-MM-DD");
    date_to = dayjs().endOf(interval).format("YYYY-MM-DD");
    setDateRange([null, null]);
    run({
      date_from,
      date_to,
      interval: "day",
    });
  };

  const handleSelectRange = (date_from: string, date_to: string) => {
    run({
      date_from,
      date_to,
      interval: "day",
    });
  };

  useEffect(() => {
    handlePlanChaning(7);
  }, []);

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        {chartLogo}
        <div>
          <p className="text-2xl font-medium">{title}</p>
          {hasRange ? (
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update: any) => {
                setDateRange(update);
                if (!!update?.[0] && !!update?.[1]) {
                  handleSelectRange(
                    dayjs(update[0]).format("YYYY-MM-DD"),
                    dayjs(update[1]).format("YYYY-MM-DD"),
                  );
                }
              }}
              placeholderText="Today"
              dateFormat={"yyyy/MM/dd"}
              withPortal
              className="border-none bg-transparent p-0 text-sm text-white focus:ring-0"
            />
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3">
        <p className="font-dinPro text-[36px] font-bold">
          {formatStats({
            n: data?.reduce(
              (a: any, d: Record<string, number>) => a + d[dataKey as string],
              0,
            ),
            notation: "standard",
          })}
        </p>
        <div className="rounded border border-white/10">
          {chartType === "line" ? (
            <LineChartV2
              maxTicks={7}
              chartValue={data.map((d: Record<string, number>) => d[dataKey])}
              labels={data.map((d: any) => d.date)}
            />
          ) : (
            <BarChart
              maxTicks={7}
              chartValue={data.map((d: Record<string, number>) => d[dataKey])}
              labels={data.map((d: any) => d.date)}
            />
          )}
          {hasPlan ? (
            <SelectTime
              plan={plan}
              setPlan={(e) => {
                setPlan(e);
                handlePlanChaning(e);
              }}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default StatsChart;

"use client";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { memo } from "react";
import { Line } from "react-chartjs-2";
import { GameStatType } from "../ActivePlayerStats";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  TimeScale,
);

export type ChartValue = {
  date: string;
  value: number;
};
const LineChart = ({
  dataChart,
  chartFilter = "7d",
  labelTitle = "Active Player",
  setChartFilter = (value) => {},
}: {
  dataChart: Record<string, GameStatType>;
  fromDate?: any;
  toDate?: any;
  chartFilter?: string;
  labelTitle?: string;
  setChartFilter?: (value: string) => void;
}) => {

  const labels = Object.keys(dataChart);
  const dataValues = labels.map((label) => dataChart[label]?.users || 0);
  const data = {
    labels,
    datasets: [
      {
        label: labelTitle,
        data: dataValues,
        fill: false,
        backgroundColor: "transparent",
      },
    ],
  };
  const myPlugin = {
    id: "customShadow",
    beforeDraw: (chart: any) => {
      const ctx = chart.ctx;
      ctx.save();

      const originalLineDraw = ctx.stroke;
      ctx.stroke = function () {
        ctx.save();
        ctx.shadowColor = "#00FFC2";
        ctx.shadowBlur = 30;
        ctx.backgroundColor = "transparent";
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 0;
        originalLineDraw.apply(this, arguments);
        ctx.restore();
      };
    },
  };
  const formatDate = (value: string | Date) => {
    return dayjs(value).format("MMM DD");
  };
  
  return (
    <Line
      height={250}
      plugins={[myPlugin]}
      options={{
        // responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 100,
          easing: "easeOutQuart",
        },
        normalized: true,
        datasets: {
          line: {
            pointRadius: 0,
          },
        },
        parsing: {
          xAxisKey: "dataChart[label]?.date",
        },
        elements: {
          point: {
            radius: 1,
            hitRadius: 1,
            borderWidth: 1,
            hoverBackgroundColor: "black",
            hoverBorderColor: "#00FFC2",
            hoverRadius: 7,
          },
          line: {
            borderJoinStyle: "round",
            tension: 0.4,
            borderWidth: 2,
            borderColor: "#00FFC2",
          },
        },
        plugins: {
          decimation: {
            enabled: false,
            algorithm: "min-max",
          },
          legend: {
            // position: "top" as const,
            display: false,
          },
          title: {
            display: false,
            text: "Chart.js Line Chart",
          },
          tooltip: {
            enabled: true,
            yAlign: "top",
            callbacks: {
              title: (tooltipItems: any) => {
                return dayjs(tooltipItems[0].label).format(
                  "MMMM D, YYYY",
                );
              },
            },
          },
        },

        scales: {
          y: {
            grid: {
              display: true,
              color: "rgba(255, 255, 255, 0.1)",
              lineWidth: 1,
            },
            ticks: {
              font: {
                weight: 500,
              },
              color: "#757575",
              maxTicksLimit: 3,
            },
            border: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              autoSkip: false,
              source:
                chartFilter === "7d" ||
                chartFilter === "30d" ||
                (chartFilter === "90d" && dataValues.length > 90) ||
                chartFilter === "All" && dataValues.length > 365
                  ? "auto"
                  : "data",
              padding: 30,
              maxRotation: 0,
              minRotation: 0,
              font: {
                weight: 500,
                size: 14,
              },
              color: "#757575",
              callback: function (value: any, index) {
                const date: any = dayjs(this.getLabelForValue(value));
                switch (chartFilter) {
                  case "7d":
                    if (dataValues.length > 7) {
                      return index % 2 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    } else if (dataValues.length > 30) {
                      return index % 3 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    } else if (dataValues.length > 90) {
                      return index % 7 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    } else if (dataValues.length > 365) {
                      return index % 30 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    } else {
                      return index % 1 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    }
                  case "30d":
                    if (dataValues.length > 30) {
                      return index % 3 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    } else if (dataValues.length > 91) {
                      return index % 7 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    } else if (dataValues.length > 365) {
                      return index % 30 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    } else {
                      return index % 2 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    }

                  case "90d":
                    if (dataValues.length > 90) {
                      return index % 8 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    } else if (dataValues.length > 365) {
                      return index % 30 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    } else {
                      return index % 7 === 0
                        ? formatDate(this.getLabelForValue(value))
                        : "";
                    }

                  case "1y":
                    if (date.date() === 1) {
                      return formatDate(date);
                    }
                    return "";
                  case "All":
                    if (date.date() === 1) {
                      return formatDate(date);
                    }
                    return "";
                  default:
                    return "";
                }
              },
            },
          },
        },
        interaction: {
          mode: "index",
          axis:"x",
          intersect: false,
        },
      }}
      data={data}
    />
  );
};

export default memo(LineChart);

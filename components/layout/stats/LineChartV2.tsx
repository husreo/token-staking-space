"use client";
import {
  ArcElement,
  CategoryScale,
  ChartArea,
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
import { formatStats } from "utils/string";
import { GameStatType } from "./ActivePlayerStats";
import "./style.css";

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
const LineChartV2 = ({
  maxTicks = 10,
  chartValue,
  labels,
}: {
  maxTicks?: number;
  chartValue: number[];
  labels: string[];
}) => {
  // const labels = Object.keys(dataChart);
  function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
    const colorStart = "#51CD68";
    const colorEnd = "rgba(81, 205, 104, 0.00)";
    const gradient = ctx.createLinearGradient(
      0,
      area?.top - 15 || 0,
      0,
      area?.bottom + 30 || 0,
    );

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);

    return gradient;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: chartValue,
        fill: true,
        backgroundColor(ctx: any, b: any) {
          const chartArea = ctx.chart.chartArea;
          const context = document
            .createElement("canvas")
            .getContext("2d") as any;
          const gradient = createGradient(context, chartArea);

          return gradient;
        },
      },
    ],
  };
  const myPlugin = {
    id: "customVertical",
    afterDraw: function (chart: any, easing: any) {
      if (chart.tooltip?._active && chart.tooltip?._active.length) {
        const activePoint = chart.tooltip._active[0];
        const ctx = chart.ctx;
        const x = activePoint.element.x;
        const topY = chart.scales.y.top - 20;
        const bottomY = chart.scales.y.bottom + 15;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.57)";
        ctx.setLineDash([2, 2]);
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  return (
    <>
      <Line
        className="h-[250px] max-h-[250px] p-2"
        plugins={[myPlugin]}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          // animation: {
          //   duration: 100,
          //   easing: "easeOutQuart",
          // },
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
              hoverBackgroundColor: "white",
              hoverBorderColor: "#DEDEDE",
              hoverRadius: 5,
            },
            line: {
              borderJoinStyle: "round",
              tension: 0,
              borderWidth: 2,
              borderColor: "#51CD68",
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
              enabled: false,
              yAlign: "top",
              external: function (context) {
                let tooltipEl: any = document.getElementById("chartjs-tooltip");
                if (!tooltipEl) {
                  tooltipEl = document.createElement("div");
                  tooltipEl.id = "chartjs-tooltip";
                  tooltipEl.innerHTML = "<div></div>";
                  tooltipEl.classList.add("tooltip-chart");
                  document.body.appendChild(tooltipEl);
                }
                const tooltipModel: any = context.tooltip;
                if (tooltipModel.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }
                tooltipEl.classList.remove("above", "below", "no-transform");
                if (tooltipModel.yAlign) {
                  tooltipEl.classList.add(tooltipModel.yAlign);
                } else {
                  tooltipEl.classList.add("no-transform");
                }

                function getBody(bodyItem: any) {
                  return bodyItem.lines;
                }
                if (tooltipModel.body) {
                  const titleLines = tooltipModel.title || []; //ngày
                  const bodyLines = tooltipModel.body.map(getBody);

                  let innerHtml = "<div style='width:100%'>";
                  titleLines.forEach(function (title: any) {
                    let styleTitle = `font-family: DINPro;`;
                    // styleTitle += ";display:flex";
                    // styleTitle += ";gap:5";
                    innerHtml +=
                      "<div style=' " +
                      styleTitle +
                      " color:white; font-size:13px;opacity:0.6; display:flex; justify-content:space-between; width:100%; font-weight:500; letter-spacing:-0.65px'>" +
                      "<span>" +
                      dayjs(title).format("DD/MM/YYYY") +
                      "</span>" +
                      "<span>" +
                      dayjs(title).format("HH:mm:ss") +
                      "</span>" +
                      "</div>";
                  });

                  innerHtml += "</div><div>";
                  bodyLines.forEach(function (body: any, i: any) {
                    const colors = tooltipModel.labelColors[i];
                    let style = "background:tranparent";
                    style +=
                      "; margin-top: 10px; font-family: DINPro; font-size:16px; font-weight:700; color:white ";
                    const span = '<p style="' + style + '">' + body[0] + "</p>";
                    innerHtml += span;
                  });
                  innerHtml += "</div>";

                  let divRoot = tooltipEl.querySelector("div");
                  divRoot.innerHTML = innerHtml;
                }
                const position = context.chart.canvas.getBoundingClientRect();
                const tooltipHeight = tooltipEl.offsetHeight;
                tooltipEl.style.opacity = 1;
                tooltipEl.style.position = "absolute";
                tooltipEl.style.left =
                  position.left +
                  window.pageXOffset +
                  tooltipModel.caretX +
                  6 +
                  "px";
                tooltipEl.style.top =
                  position.top +
                  window.pageYOffset +
                  tooltipModel.caretY -
                  tooltipHeight / 2 +
                  "px";
                tooltipEl.style.width = "204px";
                tooltipEl.style.padding = "12px";
                tooltipEl.style.display = "flex";
                tooltipEl.style.flexDirection = "column";
                tooltipEl.style.columnGap = "10px";
                tooltipEl.style.borderRadius = "6px";
                tooltipEl.style.backgroundColor = "#2C2E2E";
                tooltipEl.style.pointerEvents = "none";
                tooltipEl.style.boxShadow =
                  "0px 0px 4px 0px rgba(0, 0, 0, 0.25)";
              },
            },
          },

          scales: {
            y: {
              grid: {
                display: true,
                color: "rgba(255, 255, 255, 0.35)",
                lineWidth: 1,
                tickBorderDash: [2, 2],
              },
              ticks: {
                font: {
                  weight: 400,
                  family: "aeonikMono",
                },

                color: "rgba(255, 255, 255, 0.5)",
                maxTicksLimit: 3,
                callback: function (value: any, index: any) {
                  return formatStats({ n: Number(value), notation: "compact" });
                },
              },
              border: {
                display: true,
                dash: [2, 2],
              },
              min: 0,
            },
            x: {
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
              ticks: {
                autoSkip: true,
                padding: 20,
                maxRotation: 0,
                minRotation: 0,
                maxTicksLimit: maxTicks,
                font: {
                  weight: 500,
                  size: 14,
                  family: "aeonikMono",
                },
                color: "#757575",
                callback: function (value: any, index: any) {
                  return dayjs(this.getLabelForValue(value)).format("DD/MM");
                },
              },
            },
          },
          interaction: {
            mode: "index",
            axis: "x",
            intersect: false,
          },
        }}
        data={data}
      />
    </>
  );
};

export default memo(LineChartV2);

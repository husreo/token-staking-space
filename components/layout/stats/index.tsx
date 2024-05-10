import ComponentContainer from "@/components/shared/container/ComponentContainer";
import Aviatrix from "@/components/shared/icons/aviatrix";
import Translation from "utils/translation";
import ActivePlayerStats from "./ActivePlayerStats";
import ActiveUserStats from "./ActiveUserStats";
import StatsBox from "./StatsBox";
import LineChartV2 from "./LineChartV2";
import mockdata from "./mockdata.json";

export default function StatsView() {
  return (
    <ComponentContainer className="mt-44 px-3 font-aeonikPro font-normal text-white xl:px-0">
      <div>
        {/* <LineChartV2 dataChart={mockdata} /> */}
      </div>
      <h1 className="text-[40px] font-medium">
        <Translation text="stats.statistics" />
      </h1>
      <Aviatrix className="mt-6 h-5 w-[76px]" />
      <div className="flex flex-col gap-4">
        <StatsBox />
        <ActivePlayerStats />
      </div>
      <div className="mt-14 flex flex-col gap-4">
        <h1 className="text-[28px] font-bold tracking-[-0.84px]">
          <Translation text="stats.web" />
        </h1>
        <ActiveUserStats />
      </div>
    </ComponentContainer>
  );
}

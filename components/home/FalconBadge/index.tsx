import ComponentContainer from "@/components/shared/container/ComponentContainer";
import BadgeCard from "./BadgeCard";
import HomeTitle from "../HomeTitle";
import Translation from "utils/translation";

export default function FalconBadge() {
  return (
    <ComponentContainer className="font-aeonikPro font-normal md:pl-3 md:pr-14">
      <div className="flex flex-col items-center justify-center gap-5 lg:flex-row lg:items-start lg:justify-between">
        <HomeTitle className="w-full pt-2 text-center sm:w-[303px] sm:text-left">
          <Translation text="home.falcon-badge.title" />
        </HomeTitle>
        <BadgeCard />
      </div>
    </ComponentContainer>
  );
}

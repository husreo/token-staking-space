import ComponentContainer from "@/components/shared/container/ComponentContainer";
import Translation from "utils/translation";

export default function AboutUs() {
  return (
    <ComponentContainer className="px-12 py-48 md:px-32 lg:px-48 xl:px-64">
      <div className="flex flex-col gap-[136px]">
        <div className="font-normal text-white">
          <h1 className="mb-4 text-4xl md:text-6xl">
            <Translation text="about-us.our-mission" />
          </h1>
          <p className="w-auto text-base leading-[22px] lg:w-[592px]">
            <Translation text="about-us.our-mission-content" />
          </p>
        </div>
        <div className="font-normal text-white">
          <h1 className="mb-4 text-4xl md:text-6xl">
            <Translation text="about-us.team" />
          </h1>
          <p className="w-auto text-base leading-[22px] lg:w-[592px]">
            <Translation text="about-us.team-content" />
          </p>
        </div>
        <div className="font-normal text-white">
          <h1 className="mb-4 text-4xl md:text-6xl">
            <Translation text="about-us.careers" />
          </h1>
          <p className="w-auto text-base leading-[22px] lg:w-[592px]">
            <Translation text="about-us.careers-content" />
          </p>
        </div>
      </div>
    </ComponentContainer>
  );
}

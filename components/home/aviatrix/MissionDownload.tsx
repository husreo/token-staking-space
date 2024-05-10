import React from "react";
import StepCard from "./StepCard";
import DownloadIconGreen from "@/components/shared/icons/download-icon-green";
import Translation from "utils/translation";
export default function MissionDownload({ active }: { active: boolean }) {
  return (
    <div className="w-full">
      <StepCard
        stepNumber="3"
        content={<Translation text="home.aviatrix.step3" />}
        active={active}
      >
        <button className="flex h-12 w-full items-center justify-center gap-x-[6px] rounded-[10px] border border-white/[0.11] bg-transparent px-3 py-[7px]">
          <span className="-mb-[6px] text-[15px] font-medium">
            <Translation text="home.aviatrix.download-now" />
          </span>
          <DownloadIconGreen className="h-4 w-4" />
        </button>
      </StepCard>
    </div>
  );
}

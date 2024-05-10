import AppleIcon from "@/components/shared/icons/apple";
import Aviatrix from "@/components/shared/icons/aviatrix";
import EpicIcon from "@/components/shared/icons/epic-icon";
import WindowPC from "@/components/shared/icons/window-pc";
import {
  AVIATRIX_DOWNLOAD_EPIC,
  AVIATRIX_DOWNLOAD_MAC,
  AVIATRIX_DOWNLOAD_PC,
} from "constants/global";
import Translation from "utils/translation";
import BorderAvailable from "./BorderAvailable";

export default function TitleAviatrix({ refDownload }: { refDownload?: any }) {
  return (
    <>
      <div
        ref={refDownload}
        className="mt-10 flex flex-col items-center justify-center gap-2 pb-3 sm:mt-16 sm:flex-row sm:items-end sm:justify-between"
      >
        <Aviatrix className="h-12 w-32 md:h-14 md:w-40 lg:h-16 lg:w-[190px]" />
        <div className="relative mb-1 flex w-64 items-center justify-center rounded-[53px] px-6 py-4 text-[13px] uppercase sm:w-[300px] sm:px-[10px] sm:py-2">
          <BorderAvailable className="absolute bottom-0 left-0 right-0 top-0 h-full w-full" />
          <span className="relative z-10 -mb-[3px] uppercase sm:mb-0">
            <Translation text="home.aviatrix.available" />
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-center text-[17px] sm:w-[739px] sm:text-left">
          <Translation text="home.aviatrix.description" />
        </p>
        <div className="flex items-end justify-center gap-4 max-[414px]:flex-wrap sm:justify-between">
          <a
            href={AVIATRIX_DOWNLOAD_EPIC}
            target="_blank"
            className="flex h-11 w-11 items-center justify-center rounded border border-white/20 bg-black/5 p-1 backdrop-blur-[1px]"
          >
            <EpicIcon className="h-[33px] w-[29px]" />
          </a>
          <a
            href={AVIATRIX_DOWNLOAD_MAC}
            target="_blank"
            className="flex h-11 w-fit items-center gap-x-2 rounded border border-white/20 bg-black/5 px-[10px] py-1 backdrop-blur-[1px]"
          >
            <AppleIcon className="h-6 w-6" />
            <span className="font-mouchaVintage text-base font-normal uppercase">
              MAC
            </span>
          </a>
          <a
            href={AVIATRIX_DOWNLOAD_PC}
            target="_blank"
            className="flex h-11 w-fit items-center gap-x-2 rounded border border-white/20 bg-black/5 px-[10px] py-1 backdrop-blur-[1px]"
          >
            <span className="flex h-6 w-6 items-center">
              <WindowPC className="h-[18px] w-[18px]" />
            </span>
            <span className="font-mouchaVintage text-base font-normal uppercase">
              Windows
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

import Appstore from "@/components/shared/icons/brand/appstore-download";
import GooglePlayDownload from "@/components/shared/icons/brand/googleplay-download";
import Translation from "utils/translation";
import HomeTitle from "../HomeTitle";
import BorderAvailable from "../aviatrix/BorderAvailable";
import { AVIATRIX_DOWNLOAD_IOS, GALAXY_WARLORDS_DOWNLOAD_GOOGLE_PLAY } from "constants/global";
export default function TitleSkyWarlords() {
  return (
    <>
      <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="mb-3 flex flex-col items-center justify-center sm:items-start sm:justify-start">
          <p className="pb-3 text-[13px] opacity-60">
            <Translation text="home.sky-warlord.mobile" />
          </p>
          <HomeTitle>Aviatrix Mobile</HomeTitle>
        </div>
        <div className="relative mb-1 flex w-64 items-center justify-center rounded-[53px] px-[10px] py-2 text-[13px] uppercase sm:w-[337px]">
          <BorderAvailable className="absolute bottom-0 left-0 right-0 top-0 h-full w-full" />
          <span className="relative z-10 -mb-[3px] text-[13px] sm:mb-0">
            <Translation text="home.sky-warlord.free" />
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 pt-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-center text-[17px] sm:w-[739px] sm:text-left">
          <Translation text="home.sky-warlord.description" />
        </p>
        <div className="flex items-end justify-center gap-y-2 max-[414px]:flex-wrap sm:justify-between">
          <a
            href={AVIATRIX_DOWNLOAD_IOS}
            target="_blank"
            style={{
              background: "rgba(23, 23, 23, 0.90)",
            }}
            className="flex h-11 w-[168px] items-center justify-center rounded-[7px] border border-white/[0.16] px-4 py-2"
          >
            <Appstore className="h-[35px] w-[136px]" />
          </a>
          <a href={GALAXY_WARLORDS_DOWNLOAD_GOOGLE_PLAY} target="_blank">
            <GooglePlayDownload className="h-11 w-[168px]" />
          </a>
        </div>
      </div>
    </>
  );
}

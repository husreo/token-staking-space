import APKIcon from "@/components/shared/icons/apk";
import AppleIcon from "@/components/shared/icons/apple";
import EpicIcon from "@/components/shared/icons/epic-icon";
import WindowPC from "@/components/shared/icons/window-pc";
import {
  AVIATRIX_DOWNLOAD_EPIC,
  AVIATRIX_DOWNLOAD_IOS,
  AVIATRIX_DOWNLOAD_MAC,
  AVIATRIX_DOWNLOAD_PC,
  GALAXY_DOWNLOAD_APK,
  GALAXY_WARLORDS_DOWNLOAD_GOOGLE_PLAY,
} from "constants/global";
import { useEffect, useRef } from "react";
import { scrollToCenterSmooth } from "utils/common";

export default function EpicGameStore() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window) {
      const hash = window.location.hash;
      if (hash && hash === "#" + "download-to-play" && ref.current) {
        scrollToCenterSmooth(ref.current);
      }
    }
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-3 font-mouchaVintage">
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={AVIATRIX_DOWNLOAD_MAC}
          target="_blank"
          className="flex h-11 w-full items-center justify-center gap-x-2 rounded border border-white/20 bg-white/5 px-[10px] py-1 backdrop-blur-[1px] sm:w-[94px]"
        >
          <AppleIcon className="h-5 w-5" />
          <span className="text-base uppercase">MAC</span>
        </a>
        <a
          href={AVIATRIX_DOWNLOAD_PC}
          target="_blank"
          className="flex h-11 w-full items-center justify-center gap-x-2 rounded border border-white/20 bg-white/5 px-[10px] py-1 backdrop-blur-[1px] sm:w-[139px]"
        >
          <WindowPC className="h-[18px] w-[18px]" />
          <span className="text-base uppercase">WINDOWS</span>
        </a>
        <a
          href={GALAXY_DOWNLOAD_APK}
          target="_blank"
          className="flex h-11 w-full items-center justify-center gap-x-2 rounded border border-white/20 bg-white/5 px-[10px] py-1 backdrop-blur-[1px] sm:w-[87px]"
        >
          <APKIcon className="h-5 w-[18px]" />
          <span className="text-base uppercase">apk</span>
        </a>
      </div>
      <div className="flex h-11 w-full flex-1 flex-col justify-center gap-3 sm:flex-row">
        <a
          href={AVIATRIX_DOWNLOAD_IOS}
          target="_blank"
          className="flex h-11 w-full items-center justify-center gap-x-2 rounded border border-white/20 bg-white/5 backdrop-blur-[1px] sm:w-[177px]"
        >
          <AppleIcon className="h-5 w-5" />
          <span className="text-base uppercase">APP STORE</span>
        </a>
        <a
          href={GALAXY_WARLORDS_DOWNLOAD_GOOGLE_PLAY}
          target="_blank"
          className="flex h-11 w-full items-center justify-center gap-x-2 rounded border border-white/20 bg-white/5 px-[10px] py-1 backdrop-blur-[1px] sm:w-[155px]"
        >
          <APKIcon className="h-5 w-[18px]" />
          <span className="text-base uppercase">GOOGLE PLAY</span>
        </a>
      </div>
      <div className="flex h-11 w-full flex-1 flex-col justify-center gap-3 sm:flex-row">
        <a
          href={AVIATRIX_DOWNLOAD_EPIC}
          target="_blank"
          className="flex h-11 w-full items-center justify-center gap-x-2 rounded border border-white/20 bg-white/5 backdrop-blur-[1px]"
        >
          <EpicIcon className="h-[33px] w-[29px]" />
          <span className="text-base uppercase">EPIC GAME STORE</span>
        </a>
      </div>
    </div>
  );
}

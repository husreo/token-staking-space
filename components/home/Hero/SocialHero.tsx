import { DownloadIconGreen } from "@/components/shared/icons";
import Appstore from "@/components/shared/icons/brand/appstore-download";
import DiscordIcon from "@/components/shared/icons/brand/discord/discord";
import GooglePlayDownload from "@/components/shared/icons/brand/googleplay-download";
import TelegramIcon from "@/components/shared/icons/brand/telegram/telegram";
import TwitterIcon from "@/components/shared/icons/brand/twitter/twitter";
import UserIcon from "@/components/shared/icons/user-icon";
import { SOCIAL_LINK } from "constants/global";
import Link from "next/link";
import Translation from "utils/translation";

export default function SocialHero() {
  return (
    <div className="">
      <div className="flex-1">
        <p className="mb-1 pl-[12px] text-left font-bold text-fcon/80">
          Download For Free
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between gap-y-5 rounded-lg bg-black/[0.12] px-[10px] py-[10px] dark:bg-black/[0.12] md:flex">
        <div className="flex flex-wrap items-center gap-3">
          <div className="">
            <button className="rounded-[10px] bg-white p-1">
              <Appstore className="h-8 w-[110px]" />
            </button>
          </div>
          <button className="rounded-[10px] bg-white p-1">
            <GooglePlayDownload className="h-8 w-[110px]" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex w-fit items-center gap-3 rounded bg-background1 px-3 py-2 text-center dark:bg-background1">
            <button>
              <DownloadIconGreen className="h-5 w-5 text-white" />
            </button>
            <div className="text-base font-medium text-white dark:text-white">
              1000+ <Translation text="home.hero.downloads" />
            </div>
          </div>
          <div className="flex w-fit items-center gap-3 rounded bg-background1 px-3 py-2 text-center dark:bg-background1">
            <button>
              <UserIcon className="h-5 w-5 text-white" />
            </button>
            <div className="text-base font-medium text-white dark:text-white">
              1000+ <Translation text="home.hero.users" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <Link target="_blank" href={SOCIAL_LINK.TWITTER}>
            <TwitterIcon className="h-6 w-6" />
          </Link>
          <Link target="_blank" href={SOCIAL_LINK.DISCORD}>
            <DiscordIcon className="h-6 w-6 text-white" />
          </Link>
          <Link target="_blank" href={SOCIAL_LINK.TELEGRAM}>
            <TelegramIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}

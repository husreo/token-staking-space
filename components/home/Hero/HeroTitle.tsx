import DiscordIcon from "@/components/shared/icons/brand/discord/discord";
import FacebookIcon from "@/components/shared/icons/brand/facebook/facebook";
import TelegramIcon from "@/components/shared/icons/brand/telegram/telegram";
import TwitterIcon from "@/components/shared/icons/brand/twitter/twitter";
import { SOCIAL_LINK } from "constants/global";
import Link from "next/link";
import Translation from "utils/translation";
const HeroTitle = () => {
  return (
    <div className="flex flex-col gap-2 sm:gap-5 lg:gap-0">
      <div className="flex w-fit sm:mb-5">
        <div className="flex items-center gap-4">
          <Link target="_blank" href={SOCIAL_LINK.TELEGRAM}>
            <TelegramIcon className="h-5 w-5 opacity-60" />
          </Link>
          <Link target="_blank" href={SOCIAL_LINK.DISCORD}>
            <DiscordIcon className="h-5 w-5 text-white opacity-60" />
          </Link>
          <Link target="_blank" href={SOCIAL_LINK.TWITTER}>
            <TwitterIcon className="h-5 w-5 opacity-60" />
          </Link>
          <Link target="_blank" href={SOCIAL_LINK.FACEBOOK}>
            <FacebookIcon className="h-6 w-6 opacity-60" />
          </Link>
        </div>
      </div>
      <h1 className="w-fit text-xl lg:w-[275px]">
        <Translation text="home.hero.title1" />
      </h1>
      <h1 className="flex items-center font-mouchaVintage text-4xl font-normal uppercase sm:text-5xl lg:w-[650px] lg:py-4 lg:text-[64px]">
        <Translation text="home.hero.title2" />
      </h1>
      <p className="text-[17px] tracking-[-0.17px] text-shadow-3 lg:w-[525px]">
        <Translation text="home.hero.description1" />
      </p>
    </div>
  );
};

export default HeroTitle;

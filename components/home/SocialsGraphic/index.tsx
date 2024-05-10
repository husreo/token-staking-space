import ComponentContainer from "@/components/shared/container/ComponentContainer";
import { SOCIAL_LINK } from "constants/global";
import Image from "next/image";
import Link from "next/link";
import Translation from "utils/translation";
import HomeSubTitle from "../SubTitle";
import HomeTitle from "../Title";

interface IIconData {
  icon: string;
  quantity: string | number;
  socialFollower: string;
  iconDark: string;
  href: string;
}

const iconsData: IIconData[] = [
  {
    icon: "/images/Falconians/discord-icon.png",
    quantity: "21K",
    socialFollower: "Discord",
    iconDark: "/images/Falconians/discord-dark-icon.png",
    href: SOCIAL_LINK.DISCORD,
  },
  {
    icon: "/images/Falconians/telegram-icon.png",
    quantity: "22K",
    socialFollower: "Telegram",
    iconDark: "/images/Falconians/telegram-dark-icon.png",
    href: SOCIAL_LINK.TELEGRAM,
  },
  {
    icon: "/images/Falconians/facebook-icon.png",
    quantity: "16K",
    socialFollower: "Facebook",
    iconDark: "/images/Falconians/facebook-dark-icon.png",
    href: SOCIAL_LINK.FACEBOOK,
  },
  {
    icon: "/images/Falconians/twitter-icon.png",
    quantity: "225K",
    socialFollower: "X",
    iconDark: "/images/Falconians/twitter-dark-icon.png",
    href: SOCIAL_LINK.TWITTER,
  },
  {
    icon: "/images/Falconians/tiktok-icon.png",
    quantity: "1.2K",
    socialFollower: "TikTok",
    iconDark: "/images/Falconians/tiktok-dark-icon.png",
    href: SOCIAL_LINK.TIKTOK,
  },
  {
    icon: "/images/Falconians/youtube-icon.png",
    quantity: "48K",
    socialFollower: "Youtube",
    iconDark: "/images/Falconians/youtube-icon.png",
    href: SOCIAL_LINK.YOUTUBE,
  },
];

export default function SocialsGraphic() {
  return (
    <div className="relative max-h-[1000px] w-screen overflow-hidden max-[280px]:h-[850px] min-[281px]:h-[900px] md:h-screen md:min-h-[850px] lg:max-h-none">
      <Image
        src="/images/socials/table_graphic.png"
        className="z-0 object-cover "
        fill
        alt="table_graphic"
      />
      <ComponentContainer className="relative flex h-full items-center justify-center">
        <div className="mt-1">
          <div className="mb-5 md:mb-11">
            <HomeTitle className="mx-auto mb-8 max-w-[650px] text-center text-white dark:text-white">
              <Translation text="home.join-table-now" />
            </HomeTitle>
            <div className="mx-auto flex justify-center px-4 text-center md:px-1  lg:px-0">
              <HomeSubTitle className="text-white">
                <Translation text="home.sub-join-table" />
              </HomeSubTitle>
            </div>
          </div>
          <div className="grid w-full max-w-[800px] grid-cols-6 flex-col gap-2 px-5 md:mx-0 md:gap-5 lg:px-0 ">
            {iconsData.map((item: IIconData, index: number) => {
              return (
                <Link
                  href={item?.href || ""}
                  target="_blank"
                  key={`falconian-graphic-${index}`}
                  className="col-span-6 flex gap-5 rounded-xl border border-black/[0.05] bg-white/[0.08] p-2 dark:border-white/5 sm:col-span-3 md:col-span-3 md:gap-[10px] md:p-4 lg:col-span-2"
                >
                  <div className="relative flex items-center">
                    <Image
                      className="rounded"
                      src={item.iconDark}
                      width={50}
                      height={50}
                      alt={item.socialFollower}
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-left text-white">
                    <p className="font-dinPro text-lg font-medium text-white md:text-xl">
                      {item.quantity}
                    </p>
                    <p className="font-normal text-white/70 md:text-[15px] ">
                      {item.socialFollower}{" "}
                      {item.socialFollower === "Telegram" ? (
                        <Translation text="home.members" />
                      ) : (
                        <Translation text="home.followers" />
                      )}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </ComponentContainer>
    </div>
  );
}

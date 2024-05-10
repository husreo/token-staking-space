import ComponentContainer from "@/components/shared/container/ComponentContainer";
import Image from "next/image";
import Translation from "utils/translation";

interface IIconData {
  icon: string;
  quantity: string | number;
  socialFollower: string;
  iconDark: string;
}

const iconsData: IIconData[] = [
  {
    icon: "/images/Falconians/discord-icon.png",
    quantity: "21K",
    socialFollower: "Discord",
    iconDark: "/images/Falconians/discord-dark-icon.png",
  },
  {
    icon: "/images/Falconians/telegram-icon.png",
    quantity: "56K",
    socialFollower: "Telegram",
    iconDark: "/images/Falconians/telegram-dark-icon.png",
  },
  {
    icon: "/images/Falconians/facebook-icon.png",
    quantity: "16K",
    socialFollower: "Facebook",
    iconDark: "/images/Falconians/facebook-dark-icon.png",
  },
  {
    icon: "/images/Falconians/twitter-icon.png",
    quantity: "71K",
    socialFollower: "X",
    iconDark: "/images/Falconians/twitter-dark-icon.png",
  },
  {
    icon: "/images/Falconians/tiktok-icon.png",
    quantity: "1.2K",
    socialFollower: "TikTok",
    iconDark: "/images/Falconians/tiktok-dark-icon.png",
  },
  {
    icon: "/images/Falconians/instagram-icon.png",
    quantity: "48K",
    socialFollower: "Instagram",
    iconDark: "/images/Falconians/instagram-dark-icon.png",
  },
];

export default function Falconians() {
  return (
    <ComponentContainer className="mt-10 max-w-full py-10 md:pt-32 lg:pt-52">
      <div className="mx-auto w-full max-w-[1204px]">
        <div className="items-center justify-center text-center">
          <div className="font-normal tracking-wide">
            <p className="text-3xl text-black dark:text-white md:text-[40px]">
              <Translation text="home.join-falconians" />
            </p>
            <div className="flex justify-center text-center">
              <p className="mt-2 px-4 text-[15px] text-[#757575] dark:text-[#ADADAD] sm:px-0">
                <Translation text="home.community-description" />
              </p>
            </div>
          </div>

          <div className="relative mt-10 flex-shrink justify-center lg:h-[428px]">
            <div className="flex items-center justify-center">
              <div className="mx-5 mb-4 grid w-[800px] grid-cols-6 flex-col gap-2 py-4 md:mx-0 md:gap-5">
                {iconsData.map((item: IIconData, index: number) => {
                  return (
                    <div
                      className="col-span-6 flex gap-[10px] rounded-xl  border border-black/[0.05] p-4 dark:border-white/5 sm:col-span-3 md:col-span-3 lg:col-span-2"
                      key={`falconian${index}`}
                    >
                      <div className="relative h-[50px] w-[50px]">
                        <Image
                          className="rounded dark:hidden"
                          src={item.icon}
                          fill
                          alt={item.socialFollower}
                          sizes="(max-width: 600px) 100vw, 100vw"
                        />
                        <Image
                          className="hidden rounded dark:flex"
                          src={item.iconDark}
                          fill
                          alt={item.socialFollower}
                          sizes="(max-width: 600px) 100vw, 100vw"
                        />
                      </div>
                      <div className="flex flex-col gap-1 text-left dark:text-white">
                        <p className="text-xl font-medium text-black dark:text-white">
                          {item.quantity}
                        </p>
                        <p className="text-[15px] font-normal text-[#848484] ">
                          {item.socialFollower}{" "}
                          {item.socialFollower === "Telegram" ? (
                            <Translation text="home.members" />
                          ) : (
                            <Translation text="home.followers" />
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentContainer>
  );
}

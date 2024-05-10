import ComponentContainer from "@/components/shared/container/ComponentContainer";
import Image from "next/image";
import React from "react";
import Translation from "utils/translation";

interface Player {
  title: React.ReactNode;
  value: string | number;
}

interface OperatingSystem {
  icon: string;
  name: string;
  amount: string;
}

const StatusPlayer: Player[] = [
  {
    title: <Translation text="home.active-players" />,
    value: "32.049",
  },
  {
    title: <Translation text="home.player-trading-asset" />,
    value: "56.593",
  },
];
const System: OperatingSystem[] = [
  {
    icon: "/images/Milestones/computer-icon.png",
    name: "PC",
    amount: "59K",
  },
  {
    icon: "/images/Milestones/android-icon.png",
    name: "Android",
    amount: "23K",
  },
  {
    icon: "/images/Milestones/apple-icon.png",
    name: "Apple",
    amount: "17K",
  },
];
export default function Milestones() {
  return (
    <ComponentContainer className="mb-10 max-w-full pt-12 md:mb-20 md:px-0 md:pt-20 lg:mb-32 lg:pt-32">
      <div className="mx-auto w-full max-w-[1204px]">
        <div className="sm:overflow-none relative z-0 h-[550px] w-full overflow-hidden rounded bg-black sm:h-[600px]">
          <video
            className="absolute bottom-0 left-20 right-0 top-0 scale-150 transform object-contain lg:-top-1/3 lg:left-1/3 lg:scale-100"
            autoPlay
            loop
            muted
            preload="true"
          >
            <source
              src="https://storage.googleapis.com/spacefalcon-c08f2.appspot.com/flying-ship.mp4"
              type="video/mp4"
            />
          </video>
          <div className="h-full w-full text-white">
            <div className="absolute bottom-0 left-6 top-0 z-10 flex flex-col justify-between py-14 sm:left-14">
              <div className="relative h-16 w-[214px]">
                <Image
                  src="/images/galaxy_warlord_logo.png"
                  fill
                  alt="logo"
                  sizes="(max-width: 600px) 100vw, 100vw"
                />
              </div>
              <div>
                <div className="block gap-12 md:flex">
                  {StatusPlayer.map((item, idx) => {
                    return (
                      <div key={`player${idx}`}>
                        <div className="mb-2">
                          <p className="text-sm font-normal md:text-base">
                            {item.title}
                          </p>
                          <p className="text-2xl font-medium md:text-[32px]">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-16">
                  <div className="mb-[18px] flex gap-1 text-[13px] font-normal uppercase opacity-60">
                    <div>
                      <Image
                        src="/images/Milestones/download-icon.png"
                        width={20}
                        height={20}
                        alt="download-icon"
                      />
                    </div>
                    <div className="mt-1">Downloads</div>
                  </div>
                  <div className="flex gap-9 md:gap-24">
                    {System.map((item) => {
                      return (
                        <div key={`system${item.name}`}>
                          <div className="flex gap-1 text-sm font-normal md:text-base">
                            <div>
                              <Image
                                src={item.icon}
                                width={20}
                                height={20}
                                alt={item.name}
                              />
                            </div>
                            <div>{item.name}</div>
                          </div>
                          <p className="text-2xl font-medium md:text-[32px]">
                            {item.amount}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentContainer>
  );
}

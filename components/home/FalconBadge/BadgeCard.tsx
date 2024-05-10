import React from "react";
import ArrowRight from "@/components/shared/icons/arrow-right";
import Image from "next/image";
import Translation from "utils/translation";
import Link from "next/link";

const badgeData = [
  {
    title: <Translation text="home.falcon-badge.falcon-point" />,
    description: <Translation text="home.falcon-badge.description-falcon" />,
    src: "/images/FalconBadge/falcon-point-new.png",
    href: "https://spacefalcon.substack.com/p/introduction-to-falcon-points",
  },
  {
    title: <Translation text="home.falcon-badge.reward-point" />,
    description: <Translation text="home.falcon-badge.description-reward" />,
    src: "/images/FalconBadge/reward-point-new.png",
    href: "https://spacefalcon.substack.com/p/introduction-to-reward-points",
  },
];
export default function BadgeCard() {
  return (
    <div className="mt-4 flex flex-col gap-y-14 max-sm:w-full">
      {badgeData.map((item, index) => {
        return (
          <Link
            href={item.href}
            target="_blank"
            key={`badge${index}`}
            className="group relative flex h-auto w-full flex-col rounded-lg bg-white/[0.08] backdrop-blur-[30px] sm:h-[260px] sm:flex-row md:w-[614px]"
          >
            <div className="relative h-[350px] w-full sm:h-[260px] sm:w-[260px]">
              <div className="absolute -left-4 -top-4 h-full w-full  rounded-lg border border-white/10 bg-[#020202] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <Image
                  className="rounded-lg object-cover"
                  src={item.src}
                  fill
                  alt="fp"
                  sizes="(max-width: 600px) 100vw, 100vw"
                  quality={100}
                />
              </div>
            </div>
            <div className="flex w-full items-center px-2 sm:w-[292px] sm:px-0">
              <div className="text-center sm:text-left">
                <h1 className="pb-2 text-2xl font-medium">{item.title}</h1>
                <p className="text-[15px] leading-5 opacity-70">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="mb-3 flex w-full justify-center sm:mb-0 sm:w-fit">
              <button className="mr-4 mt-4 flex h-12 w-12 flex-col items-center justify-center rounded-[84px] border border-white/10">
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

import { Session } from "next-auth";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import BorderAviatrixImg from "public/images/Border/border-aviatrix.png";
import { classNames } from "utils/string";
import { NavLink } from "../../shared/string";
// import ActiveTitle from "./ActiveTitle";
// import Flame from "public/images/flame.png";
import DollarIcon from "@/components/shared/icons/dollar";
import { useTranslations } from "next-intl";
import TextEffect from "../../shared/animation/TextEffect";
interface CustomItem {
  title: string;
  href: string;
  type: "custom";
  render: React.ReactNode;
  isBlank?: boolean;
}

interface LinkItem {
  title: string;
  href: string;
  type: "link";
  isBlank?: boolean;
}

const NewsComponent = () => {
  const t = useTranslations();
  return (
    <Link
      href="https://spacefalcon.substack.com/"
      target="_blank"
      key={`nav-customrender-games`}
      className="flex w-[80px] cursor-pointer items-center justify-end gap-1 text-base font-medium text-current lg:h-full lg:justify-normal"
    >
      <TextEffect speed={10} text={t(`nav.news`)} />
    </Link>
  );
};
const TournamentComponent = () => {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <div
      key="Tournament"
      className="flex w-[190px] cursor-pointer items-center text-base font-medium text-current lg:h-full lg:justify-normal"
    >
      <Link href="/dashboard?tab=overview" key={`nav-customrender-tournament`}>
        <div className="">
          <div className="flex items-center gap-[6px]">
            <DollarIcon className="h-5 w-5" />
            <div className="w-[90px]">
              <TextEffect speed={10} text={t(`nav.tournament`)} />
            </div>
            <div className="flex h-[18px] items-center justify-center rounded border border-white/[0.35] bg-[radial-gradient(65.1%_100%_at_50%_100%,#FFCD1A_0%,#FF7A00_100%)] p-1 shadow-[0px_0px_26px_0px_rgba(255,180,92,0.78)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  fill="#fff"
                  d="M1.32 10.546c0 .956.56 1.454 1.517 1.454h2.69V6.859H1.32v3.687zM6.467 12h2.696c.95 0 1.517-.498 1.517-1.454V6.859H6.467V12zM.5 5.393c0 .613.343.853.962.853h4.065V3.15h-.893c-.9 0-1.426-.567-1.426-1.197 0-.63.458-.996 1.088-.996.681 0 1.23.515 1.23 1.363v.83h.94v-.83c0-.848.55-1.363 1.23-1.363.63 0 1.088.367 1.088.996 0 .63-.52 1.197-1.425 1.197h-.893v3.097h4.07c.619 0 .962-.24.962-.853V4.002c0-.613-.343-.853-.962-.853H9.21c.332-.315.532-.744.532-1.248C9.741.79 8.865 0 7.755 0c-.802 0-1.466.44-1.758 1.208C5.705.441 5.047 0 4.24 0 3.135 0 2.253.79 2.253 1.9c0 .505.2.934.538 1.249H1.463c-.59 0-.962.24-.962.853v1.391z"
                ></path>
              </svg>
            </div>
          </div>
          <div
            className={classNames(
              "h-[2px] w-full rounded-[46px] bg-fcon",
              pathname === "/tournament" || pathname === "/vn/tournament"
                ? "opacity-100"
                : "opacity-0",
            )}
          ></div>
        </div>
      </Link>
    </div>
  );
};
type ThreeKeyItem = (CustomItem | LinkItem)[];

export const NAV_LINKS: ThreeKeyItem = [
  {
    title: "home",
    href: "/",
    type: "link",
  },
  {
    title: "play",
    href: "/#download-to-play",
    type: "link",
  },
  {
    title: "dashboard",
    href: "/dashboard",
    type: "link",
  },
  {
    title: "presale",
    href: "/presale",
    type: "link",
  },
  {
    title: "tournament",
    href: "/dashboard?tab=overview",
    type: "custom",
    isBlank: true,
    render: <TournamentComponent />,
  },
  // {
  //   title: "dashboard",
  //   href: "/dashboard",
  //   type: "link",
  // },
  // {
  //   title: "aviatrix",
  //   href: "/aviatrix",
  //   type: "custom",
  //   isBlank: true,
  //   render: (
  //     <div
  //       key="aviatrix"
  //       className="flex items-center text-current lg:h-full lg:justify-normal 2xl:px-7"
  //     >
  //       <Link
  //         href="/aviatrix"
  //         // target="_blank"
  //         key={`nav-customrender-aviatrix`}
  //         className="relative flex cursor-pointer items-center justify-end rounded-[5px] px-3 py-2 text-current hover:opacity-50 lg:justify-normal lg:bg-[#25afff33]"
  //       >
  //         <div className="absolute bottom-0 left-0 right-0 top-0 hidden h-full w-full lg:block">
  //           <Image
  //             className="object-cover"
  //             src={BorderAviatrixImg}
  //             fill
  //             alt="logo"
  //             sizes="(max-width: 600px) 100vw, 100vw"
  //           />
  //         </div>
  //         <Aviatrix className="z-10 h-4 w-12 rounded-[5px]" />
  //       </Link>
  //     </div>
  //   ),
  // },
  {
    title: "leaderboard",
    href: "/leaderboard",
    type: "link",
  },
  // {
  //   title: "referral",
  //   href: "/referral-leaderboard",
  //   type: "custom",
  //   isBlank: true,
  //   render: (
  //     <div
  //       key="referral"
  //       className="flex cursor-pointer items-center px-3 text-base font-medium text-current hover:text-white/50 lg:h-full lg:justify-normal 2xl:px-7"
  //     >
  //       <Link href="/referral-leaderboard" key={`nav-customrender-referral`}>
  //         <div className="flex gap-x-1 min-[1400px]:gap-x-3 hover:text-white/50">
  //           <div className="relative h-5 w-5">
  //             <Image
  //               className="object-cover"
  //               src={Flame}
  //               fill
  //               alt="referral-icon"
  //               sizes="(max-width: 600px) 100vw, 100vw"
  //             />
  //           </div>
  //           <span className="text-base font-medium">Referral</span>
  //         </div>
  //       </Link>
  //     </div>
  //   ),
  // },
  {
    title: "news",
    href: "https://spacefalcon.substack.com/",
    type: "custom",
    isBlank: true,
    render: <NewsComponent />,
  },
];

const RenderNavLink = ({ session }: { session?: Session }) => {
  const pathname = usePathname();
  const t = useTranslations();
  return (
    <div className="group flex h-full items-center font-aeonikPro transition-all duration-100 ease-linear hover:text-white min-[1100px]:text-base">
      {NAV_LINKS.map((link, idx) => {
        if (link.type === "link")
          return (
            <NavLink
              className={classNames(
                "relative flex h-full flex-col items-center justify-center border-transparent text-sm font-medium transition-all duration-200 lg:text-[14px] xl:text-base",
              )}
              key={`nav-${idx}`}
              href={link.href}
            >
              <div
                className={classNames(
                  "overflow-hidden",
                  link.title === "home"
                    ? "w-[80px]"
                    : link.title === "play"
                    ? "w-[70px]"
                    : link.title === "dashboard"
                    ? "w-[120px]"
                    : link.title === "presale"
                    ? "w-[90px]"
                    : link.title === "leaderboard"
                    ? "w-[140px]"
                    : "w-fit",
                )}
              >
                <div className="w-fit">
                  <TextEffect speed={10} text={t(`nav.${link.title}`)} />
                  <div
                    className={classNames(
                      "h-[2px] w-full rounded-[46px] bg-fcon",
                      pathname === link.href ||
                        pathname.replace("/vn", "") === link.href
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  ></div>
                </div>
              </div>
            </NavLink>
          );

        if (link.type === "custom") {
          return (
            <div
              key={link.title}
              className="relative flex h-full flex-col items-center justify-center"
            >
              {link.render}
            </div>
          );
        }
      })}

      {session && <NavLink href="/me">Me</NavLink>}
    </div>
  );
};

export default RenderNavLink;

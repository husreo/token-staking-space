import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "utils/string";
import { NavLink } from "@/components/shared/string";
import { useTranslations } from "next-intl";

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

type ThreeKeyItem = (CustomItem | LinkItem)[];

const StakeNav = () => {
  const pathname = usePathname();
  const t = useTranslations();
  return (
    <NavLink
      href="/stake"
      key={`stake`}
      className={classNames(
        "flex h-full items-center gap-1 px-2 lg:px-4 xl:px-[30px]",
        pathname === "/stake" || pathname === "/vn/stake"
          ? "border-t-2 border-[#00FFC2] bg-white/[0.08]"
          : "border-none bg-transparent",
      )}
    >
      <span className="uppercase opacity-60">stake</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        className="-mt-1"
        viewBox="0 0 24 24"
      >
        <g fill="#fff" clipPath="url(#clip0_1742_711)" opacity="0.6">
          <path d="M21 4.5H3V6h18V4.5zM21 18H3v1.5h18V18zM21 9H3v1.5h18V9zM21 13.5H3V15h18v-1.5z"></path>
        </g>
        <defs>
          <clipPath id="clip0_1742_711">
            <path fill="#fff" d="M0 0H24V24H0z"></path>
          </clipPath>
        </defs>
      </svg>
    </NavLink>
  );
};
const LearderboardNav = () => {
  const pathname = usePathname();
  const t = useTranslations();
  return (
    <NavLink
      href="/leaderboard"
      key={`leaderboard`}
      className={classNames(
        "flex h-full items-center gap-1 px-2 lg:px-4 xl:px-[30px]",
        pathname === "/leaderboard" || pathname === "/vn/leaderboard"
          ? "border-t-2 border-[#00FFC2] bg-white/[0.08]"
          : "border-none bg-transparent",
      )}
    >
      <span className="uppercase opacity-60">leaderboard</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        className="-mt-1"
        viewBox="0 0 24 24"
      >
        <g fill="#fff" clipPath="url(#clip0_1742_711)" opacity="0.6">
          <path d="M21 4.5H3V6h18V4.5zM21 18H3v1.5h18V18zM21 9H3v1.5h18V9zM21 13.5H3V15h18v-1.5z"></path>
        </g>
        <defs>
          <clipPath id="clip0_1742_711">
            <path fill="#fff" d="M0 0H24V24H0z"></path>
          </clipPath>
        </defs>
      </svg>
    </NavLink>
  );
};
const StatsdNav = () => {
  return (
    <NavLink
      href="https://dune.com/spacefalconteam/space-falcon-grant-performance"
      target="_blank"
      key={`stats`}
      className={classNames(
        "flex h-full items-center gap-1 px-2 lg:px-4 xl:px-[30px]",
      )}
    >
      <span className="uppercase opacity-60">Stats</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_2093_166)" opacity="0.6">
          <path
            fill="#fff"
            d="M7.5 4.5V6h9.442L4.5 18.442 5.558 19.5 18 7.058V16.5h1.5v-12h-12z"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_2093_166">
            <path fill="#fff" d="M0 0H24V24H0z"></path>
          </clipPath>
        </defs>
      </svg>
    </NavLink>
  );
};
export const NAV_LINKS: ThreeKeyItem = [
  {
    title: "home",
    href: "/",
    type: "link",
  },
  {
    title: "dashboard",
    href: "/dashboard",
    type: "link",
  },
  {
    title: "stake",
    href: "/stake-redeem",
    type: "custom",
    render: <StakeNav />,
  },
  // {
  //   title: "transactions",
  //   href: "/transactions",
  //   type: "link",
  // },
  {
    title: "leaderboard",
    href: "/leaderboard",
    type: "custom",
    render: <LearderboardNav />,
  },
  {
    title: "Stats",
    href: "https://dune.com/spacefalconteam/space-falcon-grant-performance",
    type: "custom",
    render: <StatsdNav />,
  },
];

const RenderNav = ({ session }: { session?: Session }) => {
  const pathname = usePathname();
  return (
    <div className="group flex h-full items-center font-chakraPetch transition-all duration-100 ease-linear hover:text-white">
      {NAV_LINKS.map((link, idx) => {
        if (link.type === "link")
          return (
            <NavLink
              className={classNames(
                "relative flex h-full flex-col items-center justify-center px-2 font-medium transition-all duration-200 lg:px-4 xl:px-[30px]",
                pathname === link.href ||
                  pathname.replace("/vn", "") === link.href
                  ? "border-t-2 border-[#00FFC2] bg-white/[0.08]"
                  : "border-none bg-transparent",
              )}
              key={`nav-${idx}`}
              href={link.href}
            >
              <div className="w-fit">
                <span
                  className={classNames(
                    "uppercase leading-6 transition-all duration-300 ease-in-out hover:text-white",
                    pathname === link.href ||
                      pathname.replace("/vn", "") === link.href
                      ? "opacity-1"
                      : "opacity-60",
                  )}
                >
                  {link.title}
                </span>
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

      {/* {session && <NavLink href="/me">Me</NavLink>} */}
    </div>
  );
};

export default RenderNav;

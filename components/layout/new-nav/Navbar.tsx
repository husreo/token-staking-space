"use client";
import { useScroll } from "ahooks";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "public/images/logo.png";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { classNames } from "utils/string";
import { NavLink } from "../../shared/string";
import RenderNav from "./RenderNav";
import NavUser from "./NavUser";
import MobileNav from "./MobileNav";

//loading animation, running from left to right and back
export const LoadingNav = () => {
  return (
    <div className="w-full max-w-sm animate-pulse rounded-md pr-5 shadow blur-lg">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 h-5 rounded bg-white/25"></div>
      </div>
    </div>
  );
};

export default function NavBar() {
  const [mounted, setMounted] = useState(false);
  const scroll: any = useScroll();
  const pathname = usePathname();
  const t = useTranslations();
  const { loadingSession } = useSelector((state: RootState) => state.user);

  const scrollNav = useMemo(() => {
    return scroll?.top >= 10 ? "backdrop-blur-2xl" : "backdrop-blur-0";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll, pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div
      className={`fixed left-0 right-0 top-0 z-[999] h-[88px] bg-transparent text-white transition-all`}
    >
      <div className={classNames("relative w-full bg-transparent px-0",scrollNav)}>
        <div
          className={classNames(
            "mx-auto flex h-[88px] max-w-[1656px] items-center justify-between gap-2 border-l border-r border-white/[0.15]",
          )}
        >
          <div className="flex h-full items-center">
            <NavLink
              href="/"
              className="flex h-full items-center border-white/[0.15] px-[30px] sm:border-r"
            >
              <div className="relative h-[32px] w-[82px]">
                <Image
                  src={Logo}
                  fill
                  alt="logo"
                  quality={100}
                  sizes="(max-width: 600px) 100vw, 100vw"
                />
              </div>
            </NavLink>
            <div className="hidden h-full lg:flex">
              <RenderNav />
            </div>
          </div>
          <div className="flex h-full items-center">
            {loadingSession ? <LoadingNav /> : <NavUser />}
            <MobileNav isLoading={loadingSession} />
          </div>
        </div>
        {/* <MobileNav isLoading={loadingSession} /> */}
      </div>
    </div>
  );
}

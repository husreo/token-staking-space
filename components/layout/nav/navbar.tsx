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
import MobileNav from "./MobileNav";
import NavUser from "./NavUser";
import RenderNavLink from "./RenderNavLink";

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
    return scroll?.top >= 50 ? "bg-black/80" : "bg-transparent";
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
      className={`fixed left-0 right-0 top-0 z-[999] text-white transition-all xl:px-0`}
    >
      <div className={classNames("relative w-full bg-black px-0")}>
        <div className="hidden h-[100px] items-center justify-between gap-2 py-2 lg:gap-0 2xl:flex 2xl:py-0">
          <div className="flex h-full items-center">
            <NavLink href="/" className="flex h-full items-center px-7">
              <div className="relative h-[50px] w-[128px]">
                <Image
                  src={Logo}
                  fill
                  alt="logo"
                  quality={100}
                  sizes="(max-width: 600px) 100vw, 100vw"
                />
              </div>
            </NavLink>
            <RenderNavLink />
          </div>
          {loadingSession ? <LoadingNav /> : <NavUser />}
        </div>
        {/* <UserVerificationBanner /> */}

        <MobileNav isLoading={loadingSession} />
      </div>
    </div>
  );
}

"use client";

import Button from "@/components/shared/button";
import SpaceFalconIcon from "@/components/shared/icons/spacefalcon";
import { Session } from "next-auth";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FPBadge from "public/images/FalconBadge/falcon-point1.png";
import RPBadge from "public/images/FalconBadge/reward-point1.png";
import BGPPointNav from "public/images/bg-point-nav.png";
import StarLight from "public/images/startlight.png";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setTabDashboardMenuActive } from "store/features/user/userSlice";
import { classNames, formatStats } from "utils/string";
import Translation from "utils/translation";
import LoginButton from "../LoginButton";
import SwitchLocale from "../SwitchLocale";
import AccountDropdown from "./AccountDropdown";

interface IProp {
  session?: Session;
  isMobileNav?: boolean;
}

const NavUser: React.FC<IProp> = ({ isMobileNav = false }) => {
  const { session } = useSelector((state: RootState) => state.user);
  const fconBalance = session?.user?.balances?.fcon_balance || 0;
  const rpBalance = session?.user?.balances?.rp_balance || 0;
  const fpBalance = session?.user?.balances?.fp_balance || 0;
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigationBuyFP = useMemo(() => {
    return pathname.includes("/vn")
      ? "/vn/dashboard#buyFp"
      : "/dashboard#buyFp";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );
  const handleChangeTabMenuActive = (idx: number) => {
    dispatch(setTabDashboardMenuActive(idx));
    router.replace(`dashboard?${createQueryString("tab", "buy-fp")}`, {
      scroll: false,
    });
  };

  return (
    <div className="items-center justify-center gap-12 lg:flex lg:flex-wrap lg:gap-8">
      <div
        className={classNames(
          // loadingSession ? "opacity-0" : "opacity-100",
          "flex items-center gap-3 transition-all duration-100",
        )}
      >
        {!!session?.access_token ? (
          <div className="relative  flex flex-wrap items-center justify-center gap-2 pr-5 xl:gap-3">
            <button
              style={
                {
                  // background:"radial-gradient(38.16% 100% at 50% 100%, #F0B4FF 0%, #9B37FF 100%, #7737FF 100%)"
                }
              }
              className="relative h-9 w-[86px] rounded-[10px] border border-white/30 shadow-[0px_0px_24px_0px_rgba(199,142,255,0.66)]"
            >
              <Image
                alt="bg_point_nav"
                src={BGPPointNav}
                fill
                sizes="(max-width: 600px) 100vw, 100vw"
                className="absolute bottom-0 left-0 right-0 top-0 object-cover"
              />
              <div className="relative z-10 flex h-full w-full items-center justify-center gap-[6px]">
                <div className="relative h-5 w-[21px]">
                  <Image
                    className="object-cover"
                    alt="starlight"
                    src={StarLight}
                    fill
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>
                <span className="text-[13px] font-medium text-shadow-[0px_0px_2px_rgba(0,0,0,0.25)]">
                  <Translation text="nav.points" />
                </span>
              </div>
            </button>
            <div className="flex flex-col items-center justify-center px-1">
              <div className="h-4 w-[1px] bg-white/[0.33]"></div>
            </div>
            <button
              onClick={() => handleChangeTabMenuActive(1)}
              className="flex h-9 items-center justify-center gap-[6px] rounded-[10px] bg-white/10 px-3 py-[7px]"
            >
              <span className="-mb-1 text-[13px]">
                <Translation text="nav.buy-fp" />
              </span>
              <div className="flex h-[18px] w-[29px] items-center justify-center rounded-[10px] border border-white/[0.35] bg-[radial-gradient(65.1%_100%_at_50%_100%,#FFCD1A_0%,#FF7A00_100%)] p-1 shadow-[0px_0px_26px_0px_rgba(255,180,92,0.78)]">
                <span className="font-dinPro text-[11px] font-medium">+5%</span>
              </div>
            </button>
            <div className="flex h-9 w-fit items-center rounded-[10px] bg-white/10 font-dinPro">
              <div className="flex items-center gap-[6px] p-[7px]">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.12]">
                  <SpaceFalconIcon className="h-[14px] w-[7px]" />
                </div>
                <p className="text-[13px] font-bold text-white">
                  {formatStats({
                    n: fconBalance,
                    notation: fconBalance > 1000000 ? "compact" : "standard",
                  })}{" "}
                </p>
              </div>
              <div className="flex items-center gap-[6px] p-[7px]">
                <div className="relative h-5 w-5">
                  <Image
                    src={RPBadge}
                    fill
                    alt="fp_badge"
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>

                <p className="text-[13px] font-bold text-white">
                  {formatStats({
                    n: rpBalance || 0,
                    notation:
                      (rpBalance || 0) > 1000000 ? "compact" : "standard",
                  })}{" "}
                </p>
              </div>
              <div className="flex w-fit items-center gap-[6px] p-[7px]">
                <div className="relative h-5 w-5">
                  <Image
                    src={FPBadge}
                    fill
                    alt="fp_badge"
                    quality={100}
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>
                <p className="text-[13px] font-bold text-white">
                  {formatStats({
                    n: fpBalance,
                    notation: fpBalance > 1000000 ? "compact" : "standard",
                  })}{" "}
                </p>
              </div>
            </div>
            <AccountDropdown
              username={session?.user?.username || ""}
              avatar={"/images/mock_nft.png"}
              FPValue={fpBalance}
              RPValue={rpBalance}
              navigationBuyFP={navigationBuyFP}
            />
            <Button
              onClick={() => router.push("/dashboard")}
              className="flex h-9 items-center justify-center rounded-[10px] px-3 py-[7px] text-[13px] font-bold text-gray0"
            >
              <Translation text="button.go-dashboard" />
            </Button>
          </div>
        ) : (
          <>
            <div className="mr-7 mt-4 flex items-center justify-center gap-6 lg:mt-0">
              {/* <SwitchTheme isMobileNav={isMobileNav} /> */}
              <SwitchLocale isMobileNav={isMobileNav} />
              <div className="w-[200px]">
                <LoginButton shouldLoginAfterConnect />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavUser;

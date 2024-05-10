"use client";

import PowerIcon from "@/components/shared/icons/power";
import SpaceFalconIcon from "@/components/shared/icons/spacefalcon";
import useWindowSize from "@/lib/hooks/use-window-size";
import { useClickAway } from "ahooks";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Image from "next/image";
import FalconPoint from "public/images/FalconBadge/falcon-point1.png";
import RewardPoint from "public/images/FalconBadge/reward-point1.png";
import Logo from "public/images/logo.png";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { classNames, formatStats } from "utils/string";
import Translation from "utils/translation";
import { NavLink } from "../../shared/string";
import LoginButton from "../LoginButton";
import SwitchLocale from "../SwitchLocale";
import RenderNavLink, { NAV_LINKS } from "./RenderNavLink";
import { LoadingNav } from "./navbar";
interface IProps {
  isLoading?: boolean;
}
const MobileNav: React.FC<IProps> = ({ isLoading }) => {
  const { session } = useSelector((state: RootState) => state.user);
  const fconBalance = session?.user?.balances?.fcon_balance || 0;
  const rpBalance = session?.user?.balances?.rp_balance || 0;
  const fpBalance = session?.user?.balances?.fp_balance || 0;
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  const {
    windowSize: { height },
  } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    toggle();
  }, ref);

  return (
    <div className="relative flex h-20 items-center justify-between pl-0 pr-4 text-white 2xl:hidden ">
      <div className="flex items-center gap-2">
        <NavLink href="/" className="flex h-full items-center px-7">
          <div className="relative h-10 w-[120px]">
            <Image
              className="object-cover"
              src={Logo}
              fill
              alt="logo"
              quality={100}
              sizes="(max-width: 600px) 100vw, 100vw"
            />
          </div>
        </NavLink>
        <div className="hidden lg:block">
          <RenderNavLink />
        </div>
      </div>
      {isLoading ? (
        <LoadingNav />
      ) : (
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 100,
                transitionDuration: "1000",
              }}
              className="flex items-center gap-2"
            >
              <button
                onClick={toggle}
                className="h-[34px] w-12 cursor-pointer rounded-xl bg-white/20 text-white active:inset-0 active:bg-none active:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  className="mx-auto"
                >
                  <path
                    d="M1 0.666504H13"
                    stroke="white"
                    strokeLinecap="round"
                  />
                  <path d="M1 4H13" stroke="white" strokeLinecap="round" />
                  <path
                    d="M1 7.33301H13"
                    stroke="white"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            animate={{
              opacity: 100,
              animationDuration: "500",
              display: "block",
              right: 0,
            }}
            initial={{
              display: "none",
              opacity: 0,
              transformOrigin: "100% 0%",
              right: -800,
            }}
            exit={{ right: -800, animationDuration: "1000", opacity: 0 }}
            className={classNames(
              "fixed right-10 top-0 flex h-screen w-full justify-between overflow-y-auto bg-gray0/90 py-5 text-white sm:w-[410px]",
            )}
          >
            <div>
              <div className="flex items-start justify-between gap-2 px-4">
                {session?.access_token ? (
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray0">
                        <Image
                          src={"/images/mock_nft.png"}
                          alt="avatar"
                          fill
                          sizes="(max-width: 600px) 100vw, 100vw"
                        />
                      </div>
                      <p className="truncate max-[300px]:max-w-[140px]">
                        {session?.user?.public_id || ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.12]">
                        <SpaceFalconIcon className="h-[14px] w-[7px]" />
                      </div>
                      <p className="text-[13px] font-bold text-white">
                        {formatStats({
                          n: fconBalance || 0,
                          notation:
                            (fconBalance || 0) > 1000000
                              ? "compact"
                              : "standard",
                        })}{" "}
                        FCON
                      </p>
                    </div>
                    <p className="flex items-center gap-1">
                      <Image
                        src={FalconPoint}
                        width={20}
                        height={20}
                        alt="logo"
                        sizes="(max-width: 600px) 100vw, 100vw"
                      />
                      {formatStats({
                        n: fpBalance,
                        notation: fpBalance > 999999 ? "compact" : "standard",
                      })}{" "}
                      FP
                    </p>
                    <p className="flex items-center gap-1">
                      <Image
                        src={RewardPoint}
                        width={20}
                        height={20}
                        alt="logo"
                        sizes="(max-width: 600px) 100vw, 100vw"
                      />
                      {formatStats({
                        n: rpBalance,
                        notation: rpBalance > 999999 ? "compact" : "standard",
                      })}{" "}
                      RP
                    </p>
                  </div>
                ) : null}
                <div className="flex items-center gap-2">
                  {!session?.access_token && (
                    <LoginButton shouldLoginAfterConnect />
                  )}
                  <button
                    onClick={toggle}
                    className="h-[34px] w-12 cursor-pointer rounded-xl bg-white/20 text-white active:inset-0 active:bg-none active:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="none"
                      viewBox="0 0 12 12"
                      className="mx-auto"
                    >
                      <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M.666.667l10.667 10.666M.666 11.333L11.333.667"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div
                onClick={toggle}
                className="text-lg sm:justify-center lg:text-base"
              >
                {NAV_LINKS.map((link, idx) => {
                  return (
                    <NavLink
                      className="relative flex items-center justify-end border-b border-white/10 px-4 py-5 text-right font-aeonikPro text-base font-medium lg:px-7"
                      key={`nav-${idx}`}
                      href={link.href}
                    >
                      <Translation text={`nav.${link.title}`} />
                    </NavLink>
                  );
                })}
                {/* <NavUser session={session} isMobileNav={true} /> */}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 px-4 pt-4">
              {session && (
                <div className="flex w-full flex-col items-end gap-2">
                  <NavLink
                    href={"/dashboard?tab=buy-fp"}
                    className="relative flex w-full items-center justify-end border-b border-white/10 py-5 text-right font-aeonikPro text-base font-medium lg:px-7"
                  >
                    <Translation text="button.buy-fp" />
                  </NavLink>
                  <NavLink
                    href={"/dashboard"}
                    className="relative flex w-full items-center justify-end border-b border-white/10 py-5 text-right font-aeonikPro text-base font-medium lg:px-7"
                  >
                    <Translation text="button.go-dashboard" />
                  </NavLink>
                  <NavLink
                    className="relative flex w-full items-center justify-end border-b border-white/10 py-5 text-right font-aeonikPro text-base font-medium lg:px-7"
                    href={"/account-setting"}
                  >
                    <Translation text={`nav.account-setting`} />
                  </NavLink>
                  <NavLink
                    target="_blank"
                    href="https://whitepaper.spacefalcon.com/resources/faq"
                    className="relative flex w-full items-center justify-end border-b border-white/10 py-5 text-right font-aeonikPro text-base font-medium lg:px-7"
                  >
                    <Translation text="nav.FAQ" />
                  </NavLink>
                  <button
                    onClick={() => signOut()}
                    className="flex w-fit items-center gap-1 rounded-[20px] border border-white/40 px-5 py-1"
                  >
                    <PowerIcon className="h-5 w-5" />{" "}
                    <Translation text="button.logout" />
                  </button>
                </div>
              )}
              <SwitchLocale isMobileNav />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;

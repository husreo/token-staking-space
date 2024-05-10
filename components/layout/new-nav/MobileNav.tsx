"use client";

import PowerIcon from "@/components/shared/icons/power";
import useWindowSize from "@/lib/hooks/use-window-size";
import { useClickAway } from "ahooks";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { classNames, shortAddress } from "utils/string";
import { NavLink } from "../../shared/string";
import LoginButton from "../LoginButton";
import SwitchLocale from "../SwitchLocale";
import { LoadingNav } from "./Navbar";
import { NAV_LINKS } from "./RenderNav";
interface IProps {
  isLoading?: boolean;
}
const MobileNav: React.FC<IProps> = ({ isLoading }) => {
  const { session } = useSelector((state: RootState) => state.user);
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
    <div className="relative flex h-full items-center justify-between border-l border-white/[0.15] pl-0  text-white lg:hidden ">
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
                className="px-[30px] text-base font-medium uppercase leading-6"
              >
                Menu
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
                <div className="flex w-full items-center justify-between gap-2">
                  {!session?.access_token ? (
                    <div className="h-20 w-[200px]">
                      <LoginButton shouldLoginAfterConnect />
                    </div>
                  ) : (
                    <div>{shortAddress(session?.user?.username) || ""}</div>
                  )}
                  <div className="flex items-center gap-2">
                    {session?.access_token && (
                      <button
                        className="flex h-[34px] w-12 cursor-pointer items-center justify-center rounded-xl bg-white/20 text-white active:inset-0 active:bg-none active:outline-none"
                        onClick={() => {
                          signOut({ redirect: false });
                        }}
                      >
                        <PowerIcon className="h-[14px] w-[14px]" />
                      </button>
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
              </div>
              <div
                onClick={toggle}
                className="text-lg sm:justify-center lg:text-base"
              >
                {NAV_LINKS.map((link, idx) => {
                  return (
                    <NavLink
                      target={
                        link.type === "custom" && link.title === "stats"
                          ? "_blank"
                          : ""
                      }
                      className="relative flex items-center justify-end border-b border-white/10 px-4 py-5 text-right font-aeonikPro text-base font-medium uppercase lg:px-7"
                      key={`nav-${idx}`}
                      href={link.href}
                    >
                      {link.title}
                    </NavLink>
                  );
                })}
                {/* <NavUser session={session} isMobileNav={true} /> */}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 px-4 pt-4">
              {/* {session && (
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
              )} */}
              <SwitchLocale isMobileNav />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;

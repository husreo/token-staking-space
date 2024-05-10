"use client";

import useWindowSize from "@/lib/hooks/use-window-size";
import { useClickAway } from "ahooks";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef } from "react";
import { classNames } from "utils/string";
import XIcon from "../icons/x-icon";

interface DrawerProps {
  title?: string;
  width: number;
  children: React.ReactNode;
  isOpen: boolean;
  closeModal?: () => void;
  btnFooter?: any;
}
export default function Drawer({
  title = "",
  width = 662,
  children,
  isOpen,
  closeModal,
  btnFooter
}: DrawerProps) {
  const { isMobile } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    if (typeof closeModal === "function") {
      closeModal();
    }
  }, ref);

  const rightValue = useMemo(() => {
    return -width - 200;
  }, [width]);

  return (
    <div className="relative flex h-full items-center justify-between font-chakraPetch  text-white">
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9990] bg-black opacity-70" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{
              display: "none",
              opacity: 0,
              transformOrigin: "100% 0%",
              right: rightValue,
            }}
            animate={{
              opacity: 100,
              animationDuration: "500",
              display: "block",
              right: 0,
            }}
            exit={{ right: rightValue, animationDuration: "1000", opacity: 0 }}
            className={classNames(
              "z-[9999] fixed right-10 bottom-0 top-0 justify-between bg-white/[0.08] text-white shadow-xl backdrop-blur-[20px]",
              isMobile ? "" : `w-[${width}px]`,
            )}
            style={{ width: isMobile ? "100%" : `${width}px` }}
          >
            <div className="flex h-full flex-col z-[100] relative">
              <div className="relative z-50 overflow-hidden">
                <div
                  className="flex items-center justify-between border-b
                border-[#ffffff26] p-9 text-4xl font-semibold leading-[40px] tracking-[-0.72]
                  fixed z-50 w-full"
                >
                  {title}
                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      className="relative z-10 flex h-[44px] w-[44px] items-center justify-center gap-2 rounded-[22px] hover:bg-white/[0.12]"
                    >
                      <XIcon className="w-[22px] opacity-40" />{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={classNames(
                  "flex-1 mt-[116px] absolute w-full overflow-y-auto",
                  !!btnFooter ? "h-[calc(100vh-216px)]" : "h-[calc(100vh-116px)]"
                )}
              >
                {children}
              </div>
              {btnFooter && (
                <div className="fixed z-50 w-full bottom-0 min-h-[100px] flex flex-col justify-end">{btnFooter}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

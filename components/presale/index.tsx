"use client";

import { useEffect, useRef } from "react";
import { scrollToCenterSmooth } from "utils/common";
import { classNames } from "utils/string";
import Translation from "utils/translation";
import ComponentContainer from "../shared/container/ComponentContainer";
import PresaleDeposit from "./PresaleDeposit";
import PresaleFaq from "./PresaleFaq";
import PresaleFund from "./PresaleFund";
import PresaleMintInfo from "./PresaleMintInfo";
import PresaleTitle from "./PresaleTitle";
import PresaleTopBanner from "./PresaleTopBanner";
import PresaleUtilities from "./PresaleUtilities";

const TagItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex whitespace-nowrap rounded-full border border-white/[14%] px-2 py-0.5 uppercase">
    {children}
  </div>
);

const LinkItem = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    {...props}
    className={classNames(
      "cursor-pointer select-none whitespace-nowrap text-xl text-white hover:opacity-100",
      className ? className : "",
    )}
  >
    {children}
  </div>
);

const PresaleView = () => {
  const ultilitiesRef = useRef<HTMLDivElement>(null);
  const mintRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const depositRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window) {
      const hash = window.location.hash;
      if (hash && hash === "#" + "buy-presale" && depositRef.current) {
        scrollToCenterSmooth(depositRef.current);
      }
    }
  }, []);

  return (
    <div>
      <div className="relative h-screen min-h-[500px] w-screen font-aeonikPro md:min-h-[1200px] lg:min-h-[1000px]">
        <ComponentContainer className="relative left-0 right-0 top-[372px] z-20 hidden w-full px-3 md:top-[172px] md:block">
          <PresaleTopBanner />
        </ComponentContainer>
        <div className="container relative left-0 right-0 z-20 mx-auto mt-0 flex h-full w-full flex-col justify-end px-3 text-white md:bottom-[300px] md:mt-[100px]">
          <div className="text-[50px] tracking-[-3.84px] md:text-[64px]">
            Limited Spots
          </div>
          <div className="relative ml-0 mt-0 flex flex-wrap items-center gap-6 md:-mt-[62px] md:ml-[18%]">
            <div className="hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="404"
                height="85"
                viewBox="0 0 404 85"
                fill="none"
                strokeWidth="1"
                stroke="rgba(255, 255, 255, 0.15)"
              >
                <path
                  d="M403.5 0V54C403.5 70.5685 390.069 84 373.5 84H0"
                  stroke="white"
                  strokeOpacity="0.15"
                />
              </svg>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <TagItem>
                <Translation text="presale.benefit-free-tickets" />
              </TagItem>
              <TagItem>
                <Translation text="presale.benefit-airdrop" />
              </TagItem>
              <TagItem>
                <Translation text="presale.benefit-staking" />
              </TagItem>
              <TagItem>
                <Translation text="presale.benefit-farming" />
              </TagItem>
            </div>
          </div>
          <div className="relative -mb-[62px] ml-[calc(18%+404px)] hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="451"
              height="85"
              viewBox="0 0 451 85"
              fill="none"
              strokeWidth="1"
              stroke="rgba(255, 255, 255, 0.15)"
            >
              <path
                d="M1 85V31C1 14.4315 14.4315 1 31 1H451"
                stroke="white"
                strokeOpacity="0.15"
              />
            </svg>
          </div>
          <div className="mt-8 w-full items-center justify-between md:mt-0 md:flex">
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              {/* {["PRESALE", "UTILITIES", "MINT INFO", "FAQ"].map((i) => (
                <LinkItem
                  key={i}
                  className={i !== "PRESALE" ? "opacity-50" : ""}
                >
                  {i}
                </LinkItem>
              ))} */}
              <LinkItem>PRESALE</LinkItem>
              <div
                onClick={() => {
                  if (ultilitiesRef.current) {
                    scrollToCenterSmooth(ultilitiesRef.current);
                  }
                }}
              >
                <LinkItem className="opacity-50">UTILITIES</LinkItem>
              </div>
              <div
                onClick={() => {
                  if (mintRef.current) {
                    scrollToCenterSmooth(mintRef.current);
                  }
                }}
              >
                <LinkItem className="opacity-50">MINT INFO</LinkItem>
              </div>
              <div
                onClick={() => {
                  if (faqRef.current) {
                    scrollToCenterSmooth(faqRef.current);
                  }
                }}
              >
                <LinkItem className="opacity-50">FAQ</LinkItem>
              </div>
            </div>
            <div className="text-[50px] tracking-[-3.84px] md:text-right md:text-[64px]">
              Infinite Potential
            </div>
          </div>
          <div className="mt-[70px] flex w-full justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="16"
              viewBox="0 0 56 16"
              fill="none"
              strokeWidth="1"
              stroke="rgba(255, 255, 255, 0)"
            >
              <path
                d="M1 1L23.1436 13.302C26.1638 14.9799 29.8362 14.9799 32.8564 13.302L55 1"
                stroke="url(#paint0_linear_8300_886)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_8300_886"
                  x1="28"
                  y1="1"
                  x2="28"
                  y2="16"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="1" stopColor="white" stopOpacity="0.45" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        {/* <Image
          src="/images/presale_bg.png"
          className="object-cover"
          fill
          alt="bg"
        /> */}
      </div>
      <div
        className="pointer-events-none relative -mt-[563px] h-[603px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
        }}
      >
        &nbsp;
      </div>
      <div className="min-h-screen bg-black">
        <div className="relative -top-[96px] z-10 mx-auto flex h-full w-screen max-w-[1401px] items-center pb-10 md:pb-32 lg:items-end">
          <div
            ref={depositRef}
            className="flex flex-1 flex-col items-center justify-center gap-y-5 px-2 md:px-5 lg:flex-row lg:justify-between lg:gap-0"
          >
            <PresaleTitle />
            <PresaleDeposit />
          </div>
        </div>
        <div ref={ultilitiesRef}>
          <PresaleUtilities />
        </div>
        <div ref={mintRef} className="mt-[288px]">
          <PresaleMintInfo />
        </div>
        <div className="mt-[471px]">
          <PresaleFund />
        </div>
        <div ref={faqRef} className="mt-[288px]">
          <PresaleFaq />
        </div>
      </div>
    </div>
  );
};

export default PresaleView;

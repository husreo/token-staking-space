"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

export default function PassReferral() {
  const { session } = useSelector((state: RootState) => state.user);

  const generateLinkReferral = () => {
    //get current url
    const url = window.location.origin;

    const code = session?.user?.referrals?.code;
    const link = `${url}/?referral=${code}`;

    navigator.clipboard.writeText(link);
  };
  return (
    <div className="relative flex w-full flex-col justify-between border-b border-l border-r border-white/[0.15] p-9 max-lg:border-r lg:h-[400px]">
      <div className="absolute bottom-0 left-0 right-0 h-[319px] w-full bg-[linear-gradient(0deg,rgba(235,255,0,0.22)_0%,rgba(235,255,0,0.00)_100%)]"></div>
      <div className="relative z-10 flex h-full w-full flex-col justify-between max-lg:gap-10">
        <div>
          <p className="text-xl leading-[30px]">
            AVIATRIX CHAMPIONSHIP REFERRAL PROGRAM
          </p>
          <p className="w-full text-4xl font-semibold leading-[48px] tracking-[-0.72px]">
            REFER YOUR FRIEND TO MINT THE NFT PASS TO EARN REF SCORES
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex w-full flex-wrap items-center justify-between border border-white/[0.15] bg-white/10 p-6 text-base">
            <div>REF SCORES</div>
            {session?.user?.public_id
              ? session?.user?.referrals?.total_invited || 0
              : null}
          </div>
          <div className="flex w-full flex-wrap items-center justify-between border border-white/[0.15] bg-white/10 p-6 text-base">
            <div>YOUR REFERRAL CODE</div>
            <div className="flex items-center gap-2">
              <p className="font-bold">
                {session?.user?.public_id
                  ? session?.user?.referrals?.code
                  : null}
              </p>
              <button
                onClick={generateLinkReferral}
                className="border border-white/[0.08] p-3 transition-all duration-100 ease-linear hover:bg-white/[0.08] active:bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <g fill="#fff" clipPath="url(#clip0_1909_2145)">
                    <path d="M21 7.5V21H7.5V7.5H21zM21 6H7.5A1.5 1.5 0 006 7.5V21a1.5 1.5 0 001.5 1.5H21a1.5 1.5 0 001.5-1.5V7.5A1.5 1.5 0 0021 6z"></path>
                    <path d="M3 13.5H1.5V3A1.5 1.5 0 013 1.5h10.5V3H3v10.5z"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_1909_2145">
                      <path fill="#fff" d="M0 0H24V24H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

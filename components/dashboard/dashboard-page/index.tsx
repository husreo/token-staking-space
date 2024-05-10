"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { scrollToCenterSmooth } from "utils/common";
import { classNames } from "utils/string";
import ChampionshipInfo from "./ChampionshipInfo";
import ConnectPhantomModal from "./ConnectPhantomModal";
import FAQModal from "./FAQModal";
import FalconChampionShip from "./FalconChampionShip";
import LoginCode from "./LoginCode";
import LoginCodeModal from "./LoginCodeModal";
import MintFalconChampionshipPass from "./MintFalconChampionshipPass";
import MintModal from "./MintModal";
import MintNFTWrapper from "./MintNFTWrapper";
import PassReferral from "./PassReferral";
import RedeemModal from "./RedeemModal";
import ReferralCodeParams from "./ReferralCodeParams";
import StepByStep from "./StepByStep";

export default function DashboardPage() {
  const mintFormRef = useRef<HTMLDivElement>(null);

  const { clickStep } = useSelector((state: RootState) => state.newDashboard);

  useEffect(() => {
    if (clickStep === "1" && mintFormRef.current) {
      scrollToCenterSmooth(mintFormRef.current);
    }
  }, [clickStep]);

  return (
    <>
      {/* <ConnectPhantomModal /> */}
      <div
        className="min-h-screen bg-lightgray bg-planet
        bg-cover bg-fixed bg-[center_center] bg-no-repeat font-chakraPetch text-white"
      >
        <div className="min-h-screen bg-planet-color pb-32">
          <div className="mx-auto grid max-w-[1656px] grid-cols-12">
            <div className="col-span-12">
              <StepByStep />
            </div>
            <div className="col-span-12 flex justify-between border-b border-l border-t border-white/[0.15] lg:col-span-8">
              <FalconChampionShip />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <LoginCode />
            </div>
            {/* <div className="col-span-12 lg:col-span-6">
              <ChampionshipTerminal />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <ChampionshipRedeem />
            </div> */}
            <div className="col-span-12 lg:col-span-8">
              <ChampionshipInfo />
            </div>
            <div
              className={classNames(
                "col-span-12 outline transition-all duration-300 ease-in-out lg:col-span-4",
                clickStep === "1" ? "outline-fcon" : "outline-transparent",
              )}
              ref={mintFormRef}
            >
              <MintNFTWrapper>
                <MintFalconChampionshipPass />
              </MintNFTWrapper>
            </div>
            <div className="col-span-12">
              <PassReferral />
            </div>
            {/* <div ref={faqRef} className="col-span-12 lg:col-span-6">
              <FAQChampionship />
            </div> */}
          </div>
        </div>
      </div>

      <MintModal />
      <LoginCodeModal />
      <RedeemModal />
      <FAQModal />
      <ReferralCodeParams />
    </>
  );
}

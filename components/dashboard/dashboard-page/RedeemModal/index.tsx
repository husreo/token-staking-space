"use client";

import {
  addToInventory,
  checkIsApprovedForAllNFTs,
  setApproveForAllNFTs,
} from "@/lib/api/bsc";
import { toastError } from "@/lib/toastify";
import { useRequest } from "ahooks";
import { targetChainMint } from "constants/bscNFTTicket/mint";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setLastUpdateBSC } from "store/features/bsc/bscSlice";
import {
  setShowNDModalBurnNFT,
  setShowNDModalLoginCode,
  setShowNDModalMint,
} from "store/features/newDashboard/newDashboardSlice";
import { setUpdatedAt } from "store/features/user/userSlice";
import { Hex } from "viem";
import { useAccount } from "wagmi";
import Button from "../../../shared/button";
import Drawer from "../../../shared/drawer";
import CupIcon from "../../../shared/icons/cup-icon";
import Alert from "../Alert";
import ConnectWalletWrapper from "../ConnectWalletWrapper";
import RowInfo from "../RowInfo";

const RedeemModal = () => {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();
  const { showNDModalBurnNFT } = useSelector(
    (state: RootState) => state.newDashboard,
  );
  const { nftBalance, mintAmount } = useSelector(
    (state: RootState) => state.bsc,
  );
  const { session } = useSelector((state: RootState) => state.user);
  const closeModal = () => dispatch(setShowNDModalBurnNFT(false));
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const accountWallet = session?.user.wallets?.find((w) => w.is_evm);
  const isConnectedRightAddress = accountWallet?.wallet_address === address;

  useEffect(() => {
    if (!showNDModalBurnNFT) {
      setIsSubmitSuccess(false);
      setIsLoading(false);
    }
  }, [showNDModalBurnNFT]);

  // const { run: submitForm, loading } = useRequest(onSubmit, {
  //   manual: true,
  //   onSuccess: async () => {
  //     await sleep(1500);
  //     setIsLoading(false);
  //     setIsSubmitSuccess(true);
  //     toastSuccess("Successfully!");
  //   },
  //   onError(e: any) {
  //     console.log(e);
  //     setIsLoading(false);
  //     toastError(e?.shortMessage ?? e?.message ?? "Error occur!");
  //   },
  // });

  const {
    data: isApprovedForAll,
    loading: loadingCheckApproveNFTs,
    run: runCheckIsApprovedForAllNFTs,
  } = useRequest(() => checkIsApprovedForAllNFTs({ owner: address as Hex }), {
    ready: isConnected && !!address,
  });

  const { runAsync: runSetApproveNFTs, loading: loadingApproveNFTs } =
    useRequest(setApproveForAllNFTs, {
      manual: true,
      onSuccess: () => {
        runCheckIsApprovedForAllNFTs();
      },
      onError(e: any) {
        console.log(e);
        toastError(e?.shortMessage ?? e?.message ?? "Error occur!");
      },
    });

  const { runAsync: runAddToInventory, loading: loadingAddInventory } =
    useRequest(addToInventory, {
      ready: isConnected && !!address,
      manual: true,
      onSuccess: async (d) => {
        if (d) {
          setIsSubmitSuccess(true);
          dispatch(setLastUpdateBSC());
          dispatch(setUpdatedAt(Date.now()));
        }
      },
    });

  return (
    <Fragment>
      <Drawer
        title={isSubmitSuccess ? "BURN SUCCESSFULLY" : "CONFIRM YOUR BURN"}
        isOpen={showNDModalBurnNFT}
        closeModal={closeModal}
        width={662}
        btnFooter={
          !isSubmitSuccess ? (
            <Fragment>
              <ConnectWalletWrapper targetChainId={targetChainMint}>
                <>
                  {(isApprovedForAll && (
                    <Button
                      className="h-[86px] flex-1 text-xl font-bold text-black shadow-topBtn"
                      onClick={runAddToInventory}
                      loading={isLoading || loadingAddInventory}
                      disabled={!isConnectedRightAddress || nftBalance < 1}
                    >
                      {isConnectedRightAddress
                        ? nftBalance < 1
                          ? "You don't have any NFTs"
                          : "REDEEM NOW"
                        : "You are not logged in with your wallet"}
                    </Button>
                  )) ||
                    null}
                  {nftBalance < 1 && !isApprovedForAll && (
                    <Button
                      className="h-[86px] flex-1 text-xl font-bold text-black shadow-topBtn"
                      disabled
                    >
                      You don&apos;t have any NFTs
                    </Button>
                  )}
                  {(!isApprovedForAll && nftBalance > 0 && (
                    <Button
                      className="h-[86px] flex-1 text-xl font-bold text-black shadow-topBtn"
                      onClick={runSetApproveNFTs}
                      loading={loadingCheckApproveNFTs || loadingApproveNFTs}
                    >
                      APPROVE NFTs
                    </Button>
                  )) ||
                    null}
                </>
              </ConnectWalletWrapper>
            </Fragment>
          ) : null
        }
      >
        <div className="relative flex h-full flex-col">
          <div>
            {isSubmitSuccess ? (
              <div className="flex h-full w-full flex-col items-center">
                <div className="my-[50px] flex justify-center">
                  <div className="flex h-[350px] w-[450px] items-center">
                    <Image
                      src="/images/chip-aviatrix.png"
                      alt="RP"
                      width={429}
                      height={350}
                      className="h-[350px] w-[429px]"
                    />
                  </div>
                </div>
                <div className="mt-9 px-9 text-[30px] font-bold">
                  YOU REDEEMED 1 NFT INTO TICKETS
                </div>
                <div className="my-6 w-full">
                  <div className="mx-9 border border-white/[0.15] px-9 py-6">
                    <RowInfo
                      title1="REDEEM QUANTITY"
                      value1="1"
                      title2={
                        <div className="flex items-center justify-end gap-1">
                          <div className="text-[#ebff00]">
                            <CupIcon
                              style={{
                                filter: "drop-shadow(0px 0px 6px #ebff0072)",
                              }}
                            />
                          </div>
                          <div className="opacity-80">
                            AVIATRIX CHAMPIONSHIP ATTEMPTS
                          </div>
                        </div>
                      }
                      value2={3}
                    />
                  </div>
                </div>
                <div className="text-center lg:w-[352px]">
                  NOW YOU CAN LOGIN TO THE GAME &gt; PLAY &gt; INFINITY MODE TO
                  START WINNING
                </div>
                <div className="absolute bottom-0 w-full">
                  <div className="flex">
                    <Button
                      variant="cancel"
                      className="h-[86px] w-full text-xl font-bold text-white"
                      onClick={() => {
                        dispatch(setShowNDModalBurnNFT(false));
                      }}
                    >
                      DONE
                    </Button>
                    <Button
                      className="h-[86px] w-full text-xl font-bold text-black shadow-topBtn"
                      loading={isLoading}
                      onClick={() => {
                        dispatch(setShowNDModalMint(false));
                        dispatch(setShowNDModalBurnNFT(false));
                        dispatch(setShowNDModalLoginCode(true));
                      }}
                    >
                      GET LOGIN CODE
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Fragment>
                <div className="my-[50px] flex justify-center">
                  <div className="flex items-center justify-center">
                    <div className="flex h-[220px] w-[270px] items-center">
                      <Image
                        src="/images/chip-aviatrix.png"
                        alt="RP"
                        width={270}
                        height={220}
                        className="h-[220px] w-[270px]"
                      />
                    </div>

                    <div className="flex items-center justify-center">
                      <svg
                        width="52"
                        height="52"
                        viewBox="0 0 52 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.2" clip-path="url(#clip0_1784_3104)">
                          <path
                            d="M29.25 9.75L26.9263 12.0136L39.2437 24.375H6.5V27.625H39.2437L26.9263 39.9311L29.25 42.25L45.5 26L29.25 9.75Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1784_3104">
                            <rect width="52" height="52" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="ml-[40px] flex h-[172px] w-[166px] flex-col justify-end rounded-md border border-white/[0.08] bg-white/[0.1] px-[18px] pb-[14px]">
                      AVIATRIX CHAMPIONSHIP TICKET
                    </div>
                  </div>
                </div>
                <div className="px-9 py-6">
                  <Alert title="IMPORTANT">
                    YOUR REDEMPTION CAN&apos;T BE UNDONE, YOU CAN CHECK YOUR
                    LEFT ATTEMPTS IN THE GAME AND ON WEBSITE
                  </Alert>
                </div>
                <div className="px-9 py-6">
                  <RowInfo
                    title1="REDEEM QUANTITY"
                    value1="1"
                    title2={
                      <div className="flex items-center justify-end gap-1">
                        <div className="text-[#ebff00]">
                          <CupIcon
                            style={{
                              filter: "drop-shadow(0px 0px 6px #ebff0072)",
                            }}
                          />
                        </div>
                        <div className="opacity-80">
                          AVIATRIX CHAMPIONSHIP ATTEMPTS
                        </div>
                      </div>
                    }
                    value2={3}
                  />
                </div>
                <div className="h-[1px] bg-[#ffffff26]">&nbsp;</div>
              </Fragment>
            )}
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default RedeemModal;

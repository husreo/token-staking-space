"use client";

import { targetChainMint } from "constants/bscNFTTicket/mint";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setMintAmount } from "store/features/bsc/bscSlice";
import { setShowNDModalMint } from "store/features/newDashboard/newDashboardSlice";
import { scrollToCenterSmooth } from "utils/common";
import { useAccount, useConnect } from "wagmi";
import Button from "../../shared/button";
import CupIcon from "../../shared/icons/cup-icon";
import ConnectWalletWrapper from "./ConnectWalletWrapper";
import RowInfo from "./RowInfo";

export default function MintFalconChampionshipPass() {
  const { connectAsync, connectors, isLoading } = useConnect();
  const { isConnected, address } = useAccount();
  const ref = useRef<HTMLDivElement>(null);
  const { session } = useSelector((state: RootState) => state.user);
  const accountWallet = session?.user.wallets?.find((w) => w.is_evm);
  const isConnectedRightAddress = accountWallet?.wallet_address === address;
  const {
    pricePerBNBValue,
    mintAmount,
    amountSupplyLeft,
    mintedAmount,
    bnbToUSD,
  } = useSelector((state: RootState) => state.bsc);
  const dispatch = useDispatch();

  useEffect(() => {
    //get referral params
    const urlParams = new URLSearchParams(window.location.search);
    const referral = urlParams.get("referral");
    if (referral && ref.current) {
      scrollToCenterSmooth(ref.current);
    }
  }, []);

  return (
    <div
      ref={ref}
      id="mint-bnb-section"
      className="relative w-full overflow-hidden border-x border-[#ffffff26] bg-[#ffffff14]"
    >
      <div className="px-9 py-6">
        <div className="mb-[33px] text-4xl font-semibold uppercase leading-[48px] max-[375px]:text-3xl lg:max-w-[377px]">
          Mint Falcon Championship Pass
        </div>
        <RowInfo
          title1="TOTAL MINTED AMOUNT"
          value1={mintedAmount.toString() || ""}
          title2="SUPPLY LEFT"
          value2={amountSupplyLeft || ""}
        />
      </div>

      <div className="h-[1px] bg-[#ffffff26]">&nbsp;</div>
      <div className="px-9 py-6">
        <RowInfo
          title1="MINTING QUANTITY"
          value1={
            <div className="mt-[4px] flex w-[135px] items-center justify-between gap-2">
              <div
                className="h-[32px] cursor-pointer select-none text-2xl font-medium"
                onClick={() => {
                  if (mintAmount <= 1) {
                    dispatch(setMintAmount(1));
                    return;
                  }
                  // setMintQuality(`${parseInt(mintQuality) - 1}`);
                  dispatch(setMintAmount(mintAmount - 1));
                }}
              >
                -
              </div>
              <div>
                {/* <input
                    className="border-0 outline-none text-2xl font-medium bg-transparent focus:outline-none focus:ring-0 w-[40px]
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={mintQuality}
                    type="number"
                    onChange={(e) => setMintQuality(e.target.value)}
                  /> */}
                <div className="text-center text-2xl font-medium">
                  {mintAmount}
                </div>
              </div>
              <div
                className="h-[32px] cursor-pointer select-none text-2xl font-medium"
                onClick={() => {
                  if (mintAmount >= 100) {
                    dispatch(setMintAmount(100));
                    return;
                  }
                  // setMintQuality(`${parseInt(mintQuality) + 1}`);
                  dispatch(setMintAmount(mintAmount + 1));
                }}
              >
                +
              </div>
            </div>
          }
          title2={
            <div className="flex items-center justify-end gap-1 max-[375px]:gap-3">
              <div className="text-[#ebff00]">
                <CupIcon
                  style={{
                    filter: "drop-shadow(0px 0px 6px #ebff0072)",
                  }}
                />
              </div>
              <div className="opacity-80">AVIATRIX ATTEMPTS</div>
            </div>
          }
          value2={mintAmount * 3}
        />
      </div>
      <div className="h-[1px] bg-[#ffffff26]">&nbsp;</div>
      <div className="px-9 py-6">
        <RowInfo
          title1="BNB TOTAL PRICE"
          value1={(mintAmount * pricePerBNBValue).toFixed(3)}
          title2="USD TOTAL PRICE"
          value2={(mintAmount * pricePerBNBValue * bnbToUSD).toFixed(3)}
        />
      </div>
      {!!session?.user?.public_id && (
        <div className="w-full">
          <ConnectWalletWrapper targetChainId={targetChainMint}>
            <Button
              disabled={mintAmount === 0 || !isConnectedRightAddress}
              className="h-[86px] w-full text-xl font-bold text-black shadow-topBtn transition-all duration-500 ease-linear disabled:opacity-50"
              onClick={() => dispatch(setShowNDModalMint(true))}
            >
              {isConnectedRightAddress
                ? "MINT"
                : "You are not logged in with your wallet"}
            </Button>
          </ConnectWalletWrapper>
          {/* {isConnected ? (
            <Button
              disabled={mintAmount === 0 || !isConnectedRightAddress}
              className="h-[86px] w-full text-xl font-bold text-black shadow-topBtn transition-all duration-500 ease-linear disabled:opacity-50"
              onClick={() => dispatch(setShowNDModalMint(true))}
            >
              {isConnectedRightAddress
                ? "MINT"
                : "Expected Wallet Address is " +
                  shortAddress(accountWallet?.wallet_address)}
            </Button>
          ) : (
            <Button
              loading={isLoading}
              className="h-[86px] w-full text-xl font-bold text-black shadow-topBtn transition-all duration-500 ease-linear disabled:opacity-50"
              onClick={handleConnectWallet}
            >
              CONNECT WALLET
            </Button>
          )} */}
        </div>
      )}
    </div>
  );
}

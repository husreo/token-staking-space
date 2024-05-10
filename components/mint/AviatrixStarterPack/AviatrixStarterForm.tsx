"use client";

import WalletConection from "@/components/dashboard/mynft/WalletConection";
import Button from "@/components/shared/button";
import MinusIcon from "@/components/shared/icons/minus";
import PlusIcon from "@/components/shared/icons/plus-icon";
import PowerIcon from "@/components/shared/icons/power";
import { getPriceFeed } from "@/lib/api/crypto";
import useContracts from "@/lib/hooks/useContracts";
import useMintNFT from "@/lib/hooks/useMintNFT";
import { toastError } from "@/lib/toastify";
import { useRequest } from "ahooks";
import { ETH_FEED_ID, ETH_FEED_ID_TESTNET } from "constants/payment";
import dayjs from "dayjs";
import IsBetween from "dayjs/plugin/isBetween";
import { useState } from "react";
import { classNames, formatStats, shortAddress } from "utils/string";
import { Hex } from "viem";
import { goerli } from "viem/chains";
import {
  mainnet,
  useAccount,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
dayjs.extend(IsBetween);

const SubTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        "font-aeonikPro text-[13px] uppercase opacity-[0.67]",
        className,
      )}
    >
      {children}
    </div>
  );
};

const TokenDetails = ({
  title = "",
  value = "",
  className = "",
}: {
  title?: string;
  value?: string | React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        "flex flex-col gap-2 rounded-[9px] bg-white/10 px-5 py-[15px]",
        className,
      )}
    >
      <SubTitle>{title}</SubTitle>
      <p className="font-dinPro text-[17px] font-bold leading-7 tracking-[-0.17px]">
        {value}
      </p>
    </div>
  );
};

export default function AviatrixStarterForm() {
  const [number, setNumber] = useState(5);
  const targetChainId =
    process.env.NEXT_PUBLIC_ENV === "testnet" ? goerli.id : mainnet.id;
  const increaseNum = () => setNumber((e) => e + 1);
  const decreaseNum = () =>
    setNumber((e) => {
      if (e === 1) {
        return 1;
      }

      return e - 1;
    });
  const ethFeedId =
    process.env.NEXT_PUBLIC_ENV === "testnet"
      ? ETH_FEED_ID_TESTNET
      : ETH_FEED_ID;

  const { isConnected, address: wallet_address } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();
  const { MINT_NFT_CONTRACT } = useContracts({
    chainId: targetChainId,
  });
  const {
    wlPricePerETH,
    isWhitelisted,
    percentNonWL,
    totalSupply,
    maxAmountWl,
    nftAmountNonWl,
    nftAmountWl,
    runMintETHWl,
    walletBalance,
    loadingMintNFT,
    startTime,
    endTime,
  } = useMintNFT({
    address: MINT_NFT_CONTRACT,
    wallet_address,
    chainId: targetChainId,
  });

  const { data: ethPriceFeed } = useRequest(
    () => getPriceFeed(ethFeedId, chain?.testnet),
    {
      pollingInterval: 10000,
      ready: !!chain,
    },
  );
  const ETHPriceUSD = ethPriceFeed?.getPriceAsNumberUnchecked() || 0;

  const priceNonWL = (wlPricePerETH * (100 + percentNonWL)) / 100;
  const priceWL = wlPricePerETH;
  const priceToPay = isWhitelisted ? priceWL : priceNonWL;
  const percentMinted = ((nftAmountNonWl + nftAmountWl) / totalSupply) * 100;

  const mintStatus = dayjs().isBetween(startTime * 1000, endTime * 1000)
    ? "minting"
    : dayjs().isBefore(startTime * 1000)
    ? "not_started"
    : "ended";

  return (
    <div suppressHydrationWarning className="h-full">
      <h1 className="text-[40px] ">Aviatrix Starter Pack</h1>
      <div className="relative mt-4 h-1 w-full rounded-[100px] bg-white/[0.12]">
        <div
          style={{
            background:
              "linear-gradient(90deg, #00FFC2 25.08%, #86FFE2 50.83%, #00FFC2 90.22%)",
            right: `${100 - percentMinted}%`,
          }}
          className="absolute bottom-0 left-0 top-0 rounded-lg"
        ></div>
      </div>
      <div className="font-helvetica mt-2 flex justify-between text-[13px] uppercase opacity-[0.67]">
        <p suppressHydrationWarning>{percentMinted.toFixed(2)}% minted</p>
        <p suppressHydrationWarning>
          {nftAmountNonWl + nftAmountWl}/{totalSupply} Minted
        </p>
      </div>
      <div className="mt-10">
        <div className="flex flex-wrap gap-3">
          <TokenDetails
            title="Whitelisted Supply"
            value={maxAmountWl}
            className="flex-1"
          />
          <TokenDetails title="Public Supply" value={totalSupply} />
          <TokenDetails
            title="Whitelisted Price"
            value={`${priceWL} ETH`}
            className="flex-1"
          />
          <TokenDetails
            title="Public Price"
            value={`${priceNonWL} ETH`}
            className="flex-1"
          />
        </div>
        <div
          // onChange={setMember}
          className="mt-3 grid grid-cols-12 gap-3"
        >
          <div className="col-span-6">
            <div
              className={classNames(
                "flex h-full cursor-pointer flex-col rounded-[9px] border bg-white/10 px-5 py-[15px] duration-150 ease-in",
                isWhitelisted
                  ? "border-fcon"
                  : "border-white/[0.05] opacity-60",
              )}
            >
              <h1 className="text-[13px] font-bold uppercase">
                WHITELISTED MEMBER
              </h1>
              <div
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.18) 8.37%, rgba(255, 255, 255, 0.00) 100%)",
                }}
                className="my-4 h-[1px] w-full"
              ></div>
              <div className="flex justify-between text-[15px]">
                <p className="opacity-[0.76]">Mint Price</p>
                <p className="font-dinPro uppercase">{priceWL} ETH</p>
              </div>
              {/* <p className="mt-2 text-[13px] leading-[18px] text-shadow-[0px_0px_52px_rgba(0,0,0,0.76)]">
              Mint the NFT with discount and get it immediately in your wallet.
            </p> */}
            </div>
          </div>
          <div className="col-span-6">
            <div className="border border-none">
              <div
                className={classNames(
                  "flex cursor-pointer flex-col rounded-[9px] border  bg-white/10 px-5 py-[15px] duration-150 ease-in",
                  !isWhitelisted
                    ? "border-fcon"
                    : "border-white/[0.05] opacity-60",
                )}
              >
                <h1 className="text-[13px] font-bold uppercase">
                  NON-WHITELISTED MEMBER
                </h1>
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.18) 8.37%, rgba(255, 255, 255, 0.00) 100%)",
                  }}
                  className="my-4 h-[1px] w-full"
                ></div>
                <div className="flex justify-between text-[15px]">
                  <p className="opacity-[0.76]">Mint Price</p>
                  <p className="font-dinPro uppercase">{priceNonWL} ETH</p>
                </div>
                {/* <p className="mt-2 text-[13px] leading-[18px] text-shadow-[0px_0px_52px_rgba(0,0,0,0.76)]">
                Mint the NFT for the full price and get it after the mint has
                ended.
              </p> */}
              </div>
            </div>
          </div>
        </div>
        {isConnected ? (
          <>
            <div className="mt-7 flex justify-between">
              <div className="flex flex-col gap-[10px]">
                <SubTitle>Your Mint Price IN ETH</SubTitle>
                <p className="font-dinPro text-2xl font-medium leading-7 tracking-[-0.24px]">
                  {isWhitelisted ? priceWL : priceNonWL} ETH (~
                  {formatStats({
                    n: isWhitelisted
                      ? priceWL * ETHPriceUSD
                      : priceNonWL * ETHPriceUSD,
                  })}{" "}
                  USD)
                </p>
              </div>
            </div>
            <div className="mt-[34px] h-[116px] w-full rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <SubTitle className="font-light opacity-[0.67]">
                ENTER YOUR MINTING QUANTITY
              </SubTitle>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={decreaseNum}
                    type="button"
                    className="flex h-10 w-10 items-center rounded-full bg-white/[0.12] p-2"
                  >
                    <MinusIcon className="h-6 w-6" />
                  </button>
                  <div className="w-24 text-center font-dinPro text-[40px] font-bold tracking-[-0.4px]">
                    {number}
                  </div>
                  <button
                    onClick={increaseNum}
                    type="button"
                    className="flex h-10 w-10 items-center rounded-full bg-white/[0.12] p-2"
                  >
                    <PlusIcon className="h-6 w-6" />
                  </button>
                </div>

                {chain?.id !== targetChainId ? (
                  <Button
                    disabled={loadingMintNFT}
                    type="button"
                    className="h-10 w-[139px] rounded-2xl text-base font-medium text-gray0"
                    onClick={() => {
                      switchNetwork?.(targetChainId);
                    }}
                  >
                    Switch network
                  </Button>
                ) : (
                  <>
                    {mintStatus === "minting" && (
                      <Button
                        disabled={loadingMintNFT}
                        type="button"
                        className="h-10 w-[139px] rounded-2xl text-base font-medium text-gray0"
                        onClick={() => {
                          const price = priceToPay * number;
                          const balance = Number(walletBalance?.formatted || 0);
                          if (balance < price) {
                            toastError("Low Balance");
                            return;
                          }
                          runMintETHWl({
                            amount: number,
                            contract_address: MINT_NFT_CONTRACT as Hex,
                            price: priceToPay * number,
                            isWhitelisted,
                          });
                        }}
                      >
                        <p className=" flex h-full items-center justify-center gap-2 transition-all duration-150 ease-linear">
                          {/* {loadingMintNFT && (
                            <SpinnerIcon className="h-6 w-6" />
                          )} */}
                          {loadingMintNFT ? "Minting" : "Mint"}
                        </p>
                      </Button>
                    )}
                    {mintStatus === "ended" && (
                      <Button
                        type="button"
                        className="h-10 w-[139px] rounded-2xl text-base font-medium text-gray0"
                      >
                        <p className=" flex h-full items-center justify-center gap-2 transition-all duration-150 ease-linear">
                          Mint has ended
                        </p>
                      </Button>
                    )}
                    {mintStatus === "not_started" && (
                      <p className="text-lg font-medium text-white/70">
                        Mint has not started
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-white/10 px-5 py-4">
              <div className="flex justify-between">
                <p className="mb-[10px] font-aeonikPro text-[13px] font-medium text-white/[0.67]">
                  YOU HAVE TO PAY IN TOTAL
                </p>
                <div className="flex gap-2">
                  <p className="text-sm">{shortAddress(wallet_address)}</p>
                  <button className="h-fit w-fit" onClick={() => disconnect()}>
                    <PowerIcon className="h-4 w-4 cursor-pointer text-white transition-all duration-100 ease-linear hover:text-gray-300" />
                  </button>
                </div>
              </div>
              <p className="font-dinPro text-2xl font-bold text-white">
                {(priceToPay * number).toFixed(2)} ETH ~
                {formatStats({
                  n:
                    number *
                    (isWhitelisted ? priceWL : priceNonWL) *
                    ETHPriceUSD,
                })}{" "}
                USD
              </p>
              <div
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.18) 8.37%, rgba(255, 255, 255, 0.00) 100%)",
                }}
                className="my-4 h-[1px] w-full"
              ></div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[15px] text-white/[0.76]">
                    Total Mint Price + Gas Fee (USD)
                  </p>
                  <p className="font-dinPro text-[15px] font-bold">
                    {formatStats({
                      n:
                        number *
                        (isWhitelisted ? priceWL : priceNonWL) *
                        ETHPriceUSD,
                    })}{" "}
                    USDT
                  </p>
                </div>
                {/* <div className="flex items-center justify-between">
                  <p className="text-[15px] text-white/[0.76]">Platform Fee</p>
                  <p className="font-dinPro text-[15px] font-bold">4 USDT</p>
                </div> */}
              </div>
            </div>
          </>
        ) : (
          <WalletConection />
        )}
      </div>
    </div>
  );
}

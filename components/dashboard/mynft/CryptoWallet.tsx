"use client";
import ETH from "@/components/shared/icons/crypto/eth";
import { useState } from "react";
// import Solana from "@/components/shared/icons/crypto/solana";
import { useNetwork, useSwitchNetwork } from "wagmi";
import BorderCrypto from "./BorderCrypto";

const mockWallet = [
  {
    name: "Ethereum",
    logo: <ETH className="h-7 w-7" />,
    chainId: 1,
  },
  // {
  //   name: "BNB",
  //   logo: <BNB className="h-5 w-5" />,
  //   chainId: 56,
  // },
  // {
  //   name: "SOLANA",
  //   logo: <Solana className="h-7 w-7" />,
  // },
  // {
  //   name: "Arbitrum",
  //   logo: <Arbitrum className="h-5 w-5" />,
  //   chainId: 42161,
  // },
  // {
  //   name: "Linea",
  //   logo: <Linea className="h-7 w-7" />,
  //   chainId: 59144,
  // },
  {
    name: "Goerli",
    chainId: 5,
  },
];

export default function CryptoWallet() {
  const { chain } = useNetwork();
  const [activeWallet, setActiveWallet] = useState(chain?.id);

  const { switchNetwork } = useSwitchNetwork({
    // onError(error, variables, context) {
    //   console.log(error);
    //   // setActiveWallet(chain?.id);
    // },
    // onMutate(variables) {
    //   console.log(variables);
    //   // setActiveWallet(variables.chainId);
    // },
  });

  return (
    <div className="flex flex-wrap justify-center gap-y-[10px] pt-6 md:justify-between">
      <div className="flex flex-wrap justify-center gap-[10px] md:justify-start">
        {mockWallet.map((item) => {
          return (
            <div
              onClick={() => {
                setActiveWallet(item.chainId);
                if (switchNetwork) {
                  switchNetwork(item.chainId);
                }
              }}
              key={item.name}
              className={`relative flex h-12 w-[128px] cursor-pointer items-center justify-between gap-x-[10px] rounded-lg border py-[10px] pl-[14px] pr-[10px] 
              ${
                item.chainId === chain?.id
                  ? "border-transparent"
                  : " border-[#2D3130]"
              }
              `}
            >
              {item.chainId === chain?.id && (
                <BorderCrypto className="absolute bottom-0 left-0 right-0 top-0 rounded-[10px] bg-background-wallet transition-all duration-150 ease-in" />
              )}
              <span className="-mb-[2px] text-[15px] font-medium">
                {item.name}
              </span>
              <span className="flex h-7 w-7 items-center justify-center">
                {item?.logo}
              </span>
            </div>
          );
        })}
      </div>
      <button className="flex h-12 w-full flex-col items-center justify-center rounded-[10px] border border-[#00FFC2] px-3 py-[7px] text-center text-[13px] font-bold sm:w-fit">
        Add all to My Profile
      </button>
    </div>
  );
}

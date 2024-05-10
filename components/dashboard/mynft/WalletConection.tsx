import Wallet from "@/components/shared/icons/brand/Wallet";
import CoinbaseIcon from "@/components/shared/icons/brand/coinbase";
import ChevronUpIcon from "@/components/shared/icons/chevron-up";
import Coinbase from "@/components/shared/icons/wallets/Coinbase";
import Phantom from "@/components/shared/icons/wallets/Phantom";
import Image from "next/image";
import MetaMask from "public/images/wallets/metamask.png";
import React from "react";
import { useConnect } from "wagmi";
import BorderWallet from "./BorderWallet";

const Wallets = ({ children }: { children: React.ReactNode }) => {
  return (
    <BorderWallet className="relative flex h-[106px] w-[158px] cursor-pointer">
      <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center gap-y-2 rounded-lg">
        {children}
      </div>
    </BorderWallet>
  );
};
export default function WalletConection() {
  const { connectors, connectAsync } = useConnect();
  const handleConnectWallet = async (method: string) => {
    if (!method) return;
    const connector = connectors.find((c) => c.id === method);
    if (connector) {
      await connectAsync({
        connector,
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center py-10 font-aeonikPro text-white">
      {/* <h1 className="w-fit text-center font-aeonikPro text-base font-bold">
        Connect your wallet to see relevant Space Falcon NFTs in your wallet
      </h1> */}
      <div className="mt-6 flex w-fit flex-wrap justify-center gap-[11px]">
        <div onClick={() => handleConnectWallet("coinbaseWallet")}>
          <Wallets>
            <Coinbase className="h-10 w-10" />
            <div className="flex items-end gap-x-1">
              <CoinbaseIcon className="h-[14px]" />
              <Wallet className="h-[10px]" />
            </div>
          </Wallets>
        </div>
        <div onClick={() => handleConnectWallet("metaMask")}>
          <Wallets>
            <Image
              className="h-10 w-10"
              src={MetaMask}
              alt="logo"
              sizes="(max-width: 600px) 100vw, 100vw"
            />
            <p className="-mb-2 text-[15px] font-medium">Metamask</p>
          </Wallets>
        </div>
        <div onClick={() => handleConnectWallet("phantom")}>
          <Wallets>
            <Phantom className="h-10 w-10" />
            <p className="-mb-2 text-[15px] font-medium">Phantom</p>
          </Wallets>
        </div>

        <div onClick={() => handleConnectWallet("walletConnect")}>
          <Wallets>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06F]">
              <ChevronUpIcon className="w-3" />
            </span>
            <p className="-mb-2 text-[15px] font-medium">More Wallets</p>
          </Wallets>
        </div>
      </div>
    </div>
  );
}

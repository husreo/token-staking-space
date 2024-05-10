"use client";
import React, { useState } from "react";
import CopyIcon from "@/components/shared/icons/copy";
import { useSelector } from "react-redux";
import { RootState } from "store";
import TickIcon from "@/components/shared/icons/tick";
import Solana from "@/components/shared/icons/crypto/solana";
import MetamaskPNG from "public/images/wallets/metamask.png";
import Image from "next/image";

interface IsCopiedType {
  [code: string]: boolean;
}

const AddressBox = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-[20px] bg-gray2 p-5 sm:p-12">{children}</div>;
};
const AddressDiv = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="duration-50 flex items-center justify-between gap-2 rounded-lg border border-white/10 p-[14px] text-white  shadow-sm transition-all ease-in">
      {children}
    </div>
  );
};
export default function AddressList() {
  const { session } = useSelector((state: RootState) => state.user);
  const [isCopy, setIsCopy] = useState<IsCopiedType>({});
  const handleCopyAddress = (text: string) => {
    try {
      navigator.clipboard.writeText(text || "");
      setIsCopy((prev) => ({ ...prev, [text]: true }));
      setTimeout(() => {
        setIsCopy((prev) => ({ ...prev, [text]: false }));
      }, 2000);
    } catch (err) {}
  };

  const phantomWallet = session?.user?.wallets?.find((w) => !w.is_evm);
  const EVMWallet = session?.user?.wallets?.find((w) => w.is_evm);
  return (
    <div>
      {session?.user.public_id && (
        <>
          <p className="mb-3 text-2xl font-bold">Address List</p>
          <div className="flex flex-col gap-2">
            {EVMWallet?.is_evm && (
              <AddressBox>
                <div className="mb-3 flex flex-wrap justify-between gap-2">
                  EVM Wallet
                  <div className="h-6 w-6">
                    <Image src={MetamaskPNG} alt="metamask" />
                  </div>
                </div>
                <AddressDiv>
                  <span className="truncate">
                    {EVMWallet.wallet_address || ""}
                  </span>
                  <button
                    onClick={() =>
                      handleCopyAddress(EVMWallet.wallet_address || "")
                    }
                  >
                    {isCopy[EVMWallet.wallet_address || ""] ? (
                      <TickIcon className="h-5 w-5" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </button>
                </AddressDiv>
              </AddressBox>
            )}

            {phantomWallet?.is_evm == false && (
              <AddressBox>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  Solana Wallet <Solana className="h-6 w-6" />
                </div>
                <AddressDiv>
                  <span className="truncate">
                    {phantomWallet?.wallet_address || ""}
                  </span>
                  <button
                    onClick={() =>
                      handleCopyAddress(phantomWallet?.wallet_address || "")
                    }
                  >
                    {isCopy[phantomWallet?.wallet_address || ""] ? (
                      <TickIcon className="h-5 w-5" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </button>
                </AddressDiv>
              </AddressBox>
            )}
          </div>
        </>
      )}
    </div>
  );
}

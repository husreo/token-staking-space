"use client";

import SessionWrapper from "@/components/shared/container/SessionWrapper";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WalletProvider from "../WalletProvider";

import { SOLANA_RPC_DEVNET, SOLANA_RPC_MAINET } from "constants/global";
import "react-toastify/dist/ReactToastify.css";
import SolanaWalletProvider from "../SolanaWalletProvider";
type Props = {
  children?: React.ReactNode;
};

// const endpoint =
//   "https://rpc.helius.xyz/?api-key=634713f0-b4f2-41dc-af7f-ed7d60bd70e2";
const endpoint = SOLANA_RPC_DEVNET;
  // process.env.NEXT_PUBLIC_ENV === "testnet"
  //   ? SOLANA_RPC_DEVNET
  //   : SOLANA_RPC_MAINET;

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ConnectionProvider endpoint={endpoint}>
        <SolanaWalletProvider>
          <WalletProvider>
            <SessionWrapper>{children}</SessionWrapper>
          </WalletProvider>
        </SolanaWalletProvider>
        <ToastContainer limit={4} pauseOnHover={false} />
      </ConnectionProvider>
    </SessionProvider>
  );
};

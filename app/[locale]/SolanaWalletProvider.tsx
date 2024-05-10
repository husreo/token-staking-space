import { useMemo } from "react";

import type { WalletProviderProps } from "@solana/wallet-adapter-react";
import { WalletProvider } from "@solana/wallet-adapter-react";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

import("@solana/wallet-adapter-react-ui/styles.css" as any);

export function SolanaWalletProvider(
  props: Omit<WalletProviderProps, "wallets">,
): JSX.Element {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <WalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props} />
    </WalletProvider>
  );
}

export default SolanaWalletProvider;

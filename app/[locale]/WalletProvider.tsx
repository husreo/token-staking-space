import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { defineChain } from "viem";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  arbitrum,
  bsc,
  goerli,
  // holesky,
  linea,
  mainnet,
  mantle,
  mantleTestnet,
  optimism,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

export const holesky = defineChain({
  id: 17000,
  network: "holesky",
  name: "Holesky",
  nativeCurrency: { name: "Holesky Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ethereum-holesky.blockpi.network/v1/rpc/public"],
    },
    public: {
      http: ["https://ethereum-holesky.blockpi.network/v1/rpc/public"],
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 77,
    },
  },
  testnet: true,
});

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
      arbitrum,
      bsc,
      mainnet,
      mantle,
      mantleTestnet,
      optimism,
      goerli,
      linea,
      holesky,
    ],
    [
      publicProvider(),
      alchemyProvider({ apiKey: "J_RhU3dxzhNGmJ3ELo_dHNVyxn6SQLg8" }),
    ],
  );

  const projectId = "c6f896d48a5093ef77030a588c403b28";
  const demoAppInfo = {
    appName: "SpaceFalcon",
  };
  const { wallets } = getDefaultWallets({
    appName: "SpaceFalcon",
    projectId,
    chains,
  });

  const connectors = connectorsForWallets([
    ...wallets,
    // {
    //   groupName: "Other",
    //   wallets: [
    //     metaMaskWallet({ projectId, chains }),
    //     coinbaseWallet({ chains, appName: "SpaceFalcon" }),
    //     walletConnectWallet({ chains, projectId }),
    //     rabbyWallet({ chains }),
    //   ],
    // },
  ]);

  const config = createConfig({
    autoConnect: false,
    publicClient,
    webSocketPublicClient,
    // connectors: [
    //   new MetaMaskConnector({
    //     chains,
    //     // options: {
    //     //   shimDisconnect: true,
    //     // },
    //   }),
    //   new CoinbaseWalletConnector({
    //     chains: chains,
    //     options: {
    //       appName: "SpaceFalcon",
    //       overrideIsCoinbaseWallet: true,
    //       overrideIsCoinbaseBrowser: true,
    //       reloadOnDisconnect: false,
    //       overrideIsMetaMask: true,
    //     },
    //   }),
    //   new WalletConnectConnector({
    //     chains,
    //     options: {
    //       projectId: "c6f896d48a5093ef77030a588c403b28",
    //     },
    //   }),
    //   // new PhantomConnector({ chains }),
    // ],
    connectors,
  });

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WalletProvider;

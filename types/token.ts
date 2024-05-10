import { Hex } from "viem";
import { Chain } from "wagmi";

export type CHAIN_TOKEN = {
  address: Hex | string;
  priceFeedId: string;
  symbol: string;
  decimal: number;
  isNative?: boolean;
  logo?: string;
};

export type ChainIdRecord = {
  [K in ALLOW_CHAIN_ID]?: CHAIN_TOKEN[];
};

export type SolanaChainIdRecord = {
  [K in SOLANA_ALLOW_CHAIN_ID]?: CHAIN_TOKEN[];
};

export type ALLOW_NETWORKS = "mainnet" | "testnet";

export type ALLOW_SOLANA_NETWORKS = "mainnet" | "testnet" | "devnet";

export type ALLOW_CHAIN_ID = 42161 | 56 | 1 | 5000 | 5001 | 10 | 5;
export type SOLANA_ALLOW_CHAIN_ID = 101 | 102 | 103;
export type ALLOW_SYMBOL = "usdt" | "usdc" | "nativeToken";
export type LIST_TOKENS = Record<number, Record<string, CHAIN_TOKEN>>;
export type CHAINS = Chain & {
  logo: string;
  tokens: CHAIN_TOKEN[];
};

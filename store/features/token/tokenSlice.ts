import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  CHAIN_FEED_IDS,
  MAINNET_NETWORK,
  SOLANA_CHAIN_FEED_IDS,
  SOLANA_DEVNET_NETWORK,
  SOLANA_MAINNET_NETWORK,
  TESTNET_NETWORK,
} from "constants/payment";
import { ALLOW_NETWORKS, ALLOW_SOLANA_NETWORKS, CHAINS } from "types/token";
import { Hex } from "viem";

export interface TokenState {
  value: number;
  evm: {
    feed_ids: Hex[];
    networks: CHAINS[];
  };
  solana: {
    feed_ids: Hex[] | string[];
    networks: CHAINS[];
  };
  env: string;
  fconPrice: number;
}

const initialState: TokenState = {
  value: 0,
  evm: {
    feed_ids: CHAIN_FEED_IDS[process.env.NEXT_PUBLIC_ENV as ALLOW_NETWORKS],
    networks:
      process.env.NEXT_PUBLIC_ENV === "testnet"
        ? TESTNET_NETWORK
        : MAINNET_NETWORK,
  },
  solana: {
    feed_ids:
      SOLANA_CHAIN_FEED_IDS[
        process.env.NEXT_PUBLIC_ENV as ALLOW_SOLANA_NETWORKS
      ],

    networks:
      process.env.NEXT_PUBLIC_ENV === "testnet"
        ? [...SOLANA_DEVNET_NETWORK, ...SOLANA_MAINNET_NETWORK]
        : SOLANA_MAINNET_NETWORK,
  },
  env: process.env.NEXT_PUBLIC_ENV as string,
  fconPrice: 0,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setFconPrice: (state, action: PayloadAction<number>) => {
      state.fconPrice = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFconPrice } = tokenSlice.actions;

export default tokenSlice.reducer;

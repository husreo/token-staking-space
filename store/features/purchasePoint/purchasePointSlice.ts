import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ALLOW_CHAIN_ID, CHAIN_TOKEN } from "types/token";
import { Hex } from "viem";

type PurchaseDetail = {
  status: "loading" | "success" | "error" | "idle";
  message: string;
  type?: "deposit" | "announce";
  txHash?: Hex | string;
  txValue?: number | string;
};
export interface PurchasePointState {
  packValue: number;
  detail: PurchaseDetail;
  selectedChain?: ALLOW_CHAIN_ID;
  selectedToken?: CHAIN_TOKEN;
  purchaseMethod: string;
}

const initialState: PurchasePointState = {
  packValue: 10,
  detail: {
    status: "idle",
    message: "",
  },
  purchaseMethod: "",
};

export const purchasePointSlice = createSlice({
  name: "purchasePoint",
  initialState,
  reducers: {
    setPackValue: (state, action: PayloadAction<number>) => {
      state.packValue = action.payload;
    },

    setPurchaseDetail: (state, action: PayloadAction<PurchaseDetail>) => {
      state.detail = {
        ...state.detail,
        ...action.payload,
      };
    },
    resetPurchaseDetail: (state) => {
      if (state.detail.status === "loading") {
        return;
      }
      state.detail = {
        status: "idle",
        message: "",
      };
      state.selectedToken = undefined;
    },
    setSelectedChain: (state, action: PayloadAction<ALLOW_CHAIN_ID>) => {
      state.selectedChain = action.payload;
      state.selectedToken = undefined;
    },
    setSelectedToken: (state, action: PayloadAction<CHAIN_TOKEN>) => {
      state.selectedToken = action.payload;
    },
    setPurchaseMethod: (state, action: PayloadAction<string>) => {
      state.purchaseMethod = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPackValue,
  setPurchaseDetail,
  resetPurchaseDetail,
  setSelectedChain,
  setSelectedToken,
  setPurchaseMethod,
} = purchasePointSlice.actions;

export default purchasePointSlice.reducer;

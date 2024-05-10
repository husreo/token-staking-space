import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface WalletState {
  value: number;
  walletType?: WalletType;
}

type WalletType =
  | "solana"
  | "evm"
  | "evm-metaMask"
  | "evm-coinbaseWallet"
  | "evm-walletConnect";

const initialState: WalletState = {
  value: 0,
  walletType: undefined,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletType: (state, action: PayloadAction<WalletType | undefined>) => {
      state.walletType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWalletType } = walletSlice.actions;

export default walletSlice.reducer;

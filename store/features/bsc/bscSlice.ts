import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface BSCState {
  showBSCModalMint: boolean;
  showBSCModalAddNFT: boolean;
  nftBalance: number;
  tokenIDOwner: number;
  totalMint: number;
  totalAddToInventory: number;
  pricePerBNBValue: number;
  lastUpdate: number;
  mintAmount: number;
  amountSupplyLeft: number;
  mintedAmount: number;
  burnedAmount: number;
  bnbToUSD: number;
  refCode?: string |null
}

const initialState: BSCState = {
  showBSCModalMint: false,
  showBSCModalAddNFT: false,
  nftBalance: 0,
  tokenIDOwner: 0,
  totalMint: 0,
  totalAddToInventory: 0,
  // pricePerBNBValue: 0.0034,
  pricePerBNBValue: 0,
  lastUpdate: 0,
  mintAmount: 1,
  amountSupplyLeft: 0,
  mintedAmount: 0,
  burnedAmount: 0,
  bnbToUSD: 0,
  refCode: null,
};

export const bscSlice = createSlice({
  name: "bsc",
  initialState,
  reducers: {
    setShowBSCModalMint: (state, action: PayloadAction<boolean>) => {
      state.showBSCModalMint = action.payload;
    },
    setShowBSCModalAddNFT: (state, action: PayloadAction<boolean>) => {
      state.showBSCModalAddNFT = action.payload;
    },
    setNftBalance: (state, action: PayloadAction<number>) => {
      state.nftBalance = action.payload;
    },
    setTokenIDOwner: (state, action: PayloadAction<number>) => {
      state.tokenIDOwner = action.payload;
    },
    setTotalMint: (state, action: PayloadAction<number>) => {
      state.totalMint = action.payload;
    },
    setTotalAddToInventory: (state, action: PayloadAction<number>) => {
      state.totalAddToInventory = action.payload;
    },
    setLastUpdateBSC: (state) => {
      state.lastUpdate = Date.now();
    },
    resetLastUpdate: (state) => {
      state.lastUpdate = 0;
    },
    setPricePerBNB(state, action: PayloadAction<number>) {
      state.pricePerBNBValue = action.payload;
    },
    setMintAmount(state, action: PayloadAction<number>) {
      state.mintAmount = action.payload;
    },
    setAmountSupplyLeft(state, action: PayloadAction<number>) {
      state.amountSupplyLeft = action.payload;
    },
    setMintedAmount(state, action: PayloadAction<number>) {
      state.mintedAmount = action.payload;
    },
    setBurnedAmount(state, action: PayloadAction<number>) {
      state.burnedAmount = action.payload;
    },
    setBnbToUSD(state, action: PayloadAction<number>) {
      state.bnbToUSD = action.payload;
    },
    setRefCode(state, action: PayloadAction<string | null>) {
      state.refCode = action.payload;
    },
    resetBSC: (state) => {
      state.showBSCModalMint = false;
      state.showBSCModalAddNFT = false;
      state.nftBalance = 0;
      state.tokenIDOwner = 0;
      state.totalMint = 0;
      state.totalAddToInventory = 0;
      state.pricePerBNBValue = 0;
      state.lastUpdate = 0;
      state.mintAmount = 1;
      state.mintedAmount = 0;
      state.burnedAmount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowBSCModalMint,
  setShowBSCModalAddNFT,
  setNftBalance,
  setTokenIDOwner,
  setTotalMint,
  setTotalAddToInventory,
  setPricePerBNB,
  setLastUpdateBSC,
  resetLastUpdate,
  setMintAmount,
  setAmountSupplyLeft,
  setMintedAmount,
  setBurnedAmount,
  resetBSC,
  setBnbToUSD,
  setRefCode,
} = bscSlice.actions;

export default bscSlice.reducer;

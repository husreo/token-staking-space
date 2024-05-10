import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface NewDashboardState {
  showNDModalMint: boolean;
  showNDModalBurnNFT: boolean;
  showLoginCode: boolean;
  showFAQ: boolean;
  indexFAQ: number;
  clickStep: string;
}

const initialState: NewDashboardState = {
  showNDModalMint: false,
  showNDModalBurnNFT: false,
  showLoginCode: false,
  showFAQ: false,
  indexFAQ: 0,
  clickStep: ""
};

export const newDashboardSlice = createSlice({
  name: "newDashboard",
  initialState,
  reducers: {
    setShowNDModalMint: (state, action: PayloadAction<boolean>) => {
      state.showNDModalMint = action.payload;
    },
    setShowNDModalBurnNFT: (state, action: PayloadAction<boolean>) => {
      state.showNDModalBurnNFT = action.payload;
    },
    setShowNDModalLoginCode: (state, action: PayloadAction<boolean>) => {
      state.showLoginCode = action.payload;
    },
    setShowNDModalFAQ: (state, action: PayloadAction<boolean>) => {
      state.showFAQ = action.payload;
    },
    setIndexFAQ: (state, action: PayloadAction<number>) => {
      state.indexFAQ = action.payload;
    },
    setClickStep: (state, action: PayloadAction<string>) => {
      state.clickStep = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowNDModalMint,
  setShowNDModalBurnNFT,
  setShowNDModalLoginCode,
  setShowNDModalFAQ,
  setIndexFAQ,
  setClickStep,
} = newDashboardSlice.actions;

export default newDashboardSlice.reducer;

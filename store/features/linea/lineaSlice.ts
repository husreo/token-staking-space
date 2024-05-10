import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LineaState {
  showModalMint: boolean;
  showModalAddNFT: boolean;
}

const initialState: LineaState = {
  showModalMint: false,
  showModalAddNFT: false,
};

export const lineaSlice = createSlice({
  name: "linea",
  initialState,
  reducers: {
    setShowModalMint: (state, action: PayloadAction<boolean>) => {
      state.showModalMint = action.payload;
    },
    setShowModalAddNFT: (state, action: PayloadAction<boolean>) => {
      state.showModalAddNFT = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowModalMint, setShowModalAddNFT } = lineaSlice.actions;

export default lineaSlice.reducer;

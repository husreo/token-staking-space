import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import purchasePointSlice from "./features/purchasePoint/purchasePointSlice";
import tokenSlice from "./features/token/tokenSlice";
import userSlice from "./features/user/userSlice";
import walletSlice from "./features/wallet/walletSlice";
import lineaSlice from "./features/linea/lineaSlice";
import bscSlice from "./features/bsc/bscSlice";
import newDashboardSlice from "./features/newDashboard/newDashboardSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    purchasePoint: purchasePointSlice,
    token: tokenSlice,
    user: userSlice,
    wallet: walletSlice,
    linea: lineaSlice,
    bsc: bscSlice,
    newDashboard: newDashboardSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

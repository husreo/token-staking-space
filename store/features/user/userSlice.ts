import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CHAIN_SYMBOL } from "constants/payment";
import dayjs from "dayjs";
import IsAfter from "dayjs/plugin/isSameOrAfter";
import { RootState } from "store";
import { HeliusNFTMetadata, NFTMetada } from "types/nft";
import { Hex } from "viem";

dayjs.extend(IsAfter);

type WhitelistType = {
  is_qualified: boolean;
  is_invited_friend: boolean;
  connected_wallet: Hex;
  is_follow_social: boolean;
};

type DetailLoginCode = {
  code: string;
  expired_at: string;
  nft_id: string;
  status: string;
};
type WalletSession = {
  access_token: string;
  expires: string;
  user: {
    usdc_balance?: number;
    rp_accumulated?: number;
    public_id: string;
    username: string;
    wallets: { wallet_address: string; is_evm: boolean }[];
    socials: {
      twitter: {
        uid?: string;
        username?: string;
      };
      telegram: {
        uid?: string;
        username?: string;
      };
      discord: {
        uid?: string;
        username?: string;
      };
    };
    fcon_balance?: number;
    rp_balance?: number;
    fp_balance?: number;
    login_code?: string;
    is_display_social?: boolean;
    balances: {
      rp_balance: number;
      fp_balance: number;
      fcon_balance: number;
    };
    login_codes?: {
      detail_code: DetailLoginCode[];
      total_expired: number;
      total_in_use: number;
      total_issued: number;
    };
    referrals?: {
      code?: string
      invited_by?: string | null
      total_invited?: number
    };
  };
};

export interface UserState {
  session?: WalletSession;
  updatedAt?: number;
  loadingSession: boolean;
  loadingWhitelist: boolean;
  walletNFTs: NFTMetada[];
  loadingWalletNFTs: boolean;
  profileNFTs: HeliusNFTMetadata[];
  loadingProfileNFTs: boolean;
  whiteList?: WhitelistType;
  onboardingModal: boolean;
  showTranferConfirmModal: boolean;
  showTranferSuccessModal: boolean;
  userNFTs: any[];
  selectedNFTs: any[];
  fetchedProfileAt: string;
  filteredNfts: any[];
  tabDashboardMenuActive: number;
}

const initialState: UserState = {
  loadingSession: false,
  walletNFTs: [],
  loadingWalletNFTs: false,
  profileNFTs: [],
  loadingProfileNFTs: false,
  loadingWhitelist: false,
  onboardingModal: false,
  showTranferConfirmModal: false,
  showTranferSuccessModal: false,
  userNFTs: [],
  selectedNFTs: [],
  fetchedProfileAt: "",
  filteredNfts: [],
  tabDashboardMenuActive: 0,
};

export const fetchWalletNFTs = createAsyncThunk(
  "fetchWalletNFTs",
  async (params: {
    wallet_address?: Hex;
    chainId: number;
    collection: string;
  }) => {
    const { wallet_address, chainId, collection } = params;
    if (!wallet_address || !chainId) return;
    const chainSymbol = CHAIN_SYMBOL[params.chainId];
    if (chainSymbol) {
      const req = await fetch(
        `/api/nft/list-nft?wallet_address=${wallet_address}&chain=${chainSymbol}&collection=${collection}`,
      );
      const data = await req.json();
      return data?.allNFTsMetadata || [];
    }
    return [];
  },
);
export const getWhitelistState = createAsyncThunk(
  "getWhitelistState",
  async () => {
    const req = await fetch(`/api/user/whitelist`);
    const data = await req.json();
    return data;
  },
);

export const fetchProfileNFTs = createAsyncThunk(
  "fetchProfileNFTs",
  async (_s, { getState }) => {
    const state = getState() as RootState;
    const shouldFetchData = !!state.user.fetchedProfileAt
      ? dayjs()
          .subtract(5, "second")
          .isAfter(dayjs(state.user.fetchedProfileAt))
      : true;
    if (shouldFetchData) {
      const req = await fetch(`/api/nft/me`);
      const data = await req.json();
      const listProfileNFTs = data?.data?.nfts || [];
      const list = data?.data?.nfts?.map((nft: any) => nft.nft_id) || [];
      const reqMetadata = await fetch("/api/nft/get-metadata", {
        method: "POST",
        body: JSON.stringify({
          mints: list,
        }),
      });

      const dataMetadata = await reqMetadata.json();
      const listNFTMetadata = dataMetadata.data as HeliusNFTMetadata[];
      const mapping = listNFTMetadata.map((nft) => ({
        ...nft,
        is_staked: listProfileNFTs.find((n: any) => n.nft_id === nft.account)
          ?.is_staked,
        locked_at: listProfileNFTs.find((n: any) => n.nft_id === nft.account)
          ?.locked_at,
        locked_period: listProfileNFTs.find(
          (n: any) => n.nft_id === nft.account,
        )?.locked_period,
        fp_daily_earning:
          listProfileNFTs.find((n: any) => n.nft_id === nft.account)
            ?.fp_daily_earning || 1,
      }));
      return mapping;
    } else return state.user.profileNFTs;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSession: (
      state,
      action: PayloadAction<WalletSession | undefined>,
    ) => {
      state.session = action?.payload;
      state.loadingSession = false;
    },
    resetUserSession: (state) => {
      state.session = undefined;
      state.whiteList = undefined;
    },
    setUpdatedAt: (state, action: PayloadAction<number | undefined>) => {
      state.updatedAt = action.payload;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loadingSession = action.payload;
    },
    setOnboardingModal: (state, action: PayloadAction<boolean>) => {
      state.onboardingModal = action.payload;
    },
    setShowTransferConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.showTranferConfirmModal = action.payload;
    },
    setShowTransferSuccessModal: (state, action: PayloadAction<boolean>) => {
      state.showTranferSuccessModal = action.payload;
    },
    setUserNFTs: (state, action: PayloadAction<any[]>) => {
      state.userNFTs = action.payload;
    },
    setSelectedNFTs: (state, action: PayloadAction<any[]>) => {
      state.selectedNFTs = action.payload;
    },
    setFilteredNfts: (state, action: PayloadAction<any[]>) => {
      state.filteredNfts = action.payload;
    },
    setTabDashboardMenuActive: (state, action: PayloadAction<number>) => {
      state.tabDashboardMenuActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletNFTs.pending, (state) => {
        state.loadingWalletNFTs = true;
      })
      .addCase(fetchWalletNFTs.fulfilled, (state, action) => {
        state.loadingWalletNFTs = false;
        state.walletNFTs = action.payload;
      })
      .addCase(fetchWalletNFTs.rejected, (state) => {
        state.loadingWalletNFTs = false;
      })
      .addCase(fetchProfileNFTs.pending, (state) => {
        state.loadingProfileNFTs = true;
      })
      .addCase(fetchProfileNFTs.fulfilled, (state, action) => {
        state.loadingProfileNFTs = false;
        state.profileNFTs = action.payload;
        state.fetchedProfileAt = dayjs().toString();
      })
      .addCase(fetchProfileNFTs.rejected, (state) => {
        state.loadingProfileNFTs = false;
        state.profileNFTs = [];
      })
      .addCase(getWhitelistState.pending, (state, action) => {
        state.loadingWhitelist = true;
      })
      .addCase(getWhitelistState.fulfilled, (state, action) => {
        state.whiteList = action.payload;
      })
      .addCase(getWhitelistState.rejected, (state) => {
        state.loadingWhitelist = false;
        state.whiteList = undefined;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserSession,
  resetUserSession,
  setUpdatedAt,
  setLoadingState,
  setOnboardingModal,
  setShowTransferConfirmModal,
  setShowTransferSuccessModal,
  setUserNFTs,
  setSelectedNFTs,
  setFilteredNfts,
  setTabDashboardMenuActive,
} = userSlice.actions;

export default userSlice.reducer;

"use client";

import { getMintedNFTs, pricePerBNB, supplyLeft } from "@/lib/api/bsc";
import { getTokenPrice } from "@/lib/api/crypto";
import { useRequest } from "ahooks";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  resetBSC,
  resetLastUpdate,
  setAmountSupplyLeft,
  setBnbToUSD,
  setBurnedAmount,
  setLastUpdateBSC,
  setMintedAmount,
  setNftBalance,
  setPricePerBNB,
} from "store/features/bsc/bscSlice";
import { Hex } from "viem";
import { useAccount } from "wagmi";

const MintNFTWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { lastUpdate } = useSelector((state: RootState) => state.bsc);
  const { isConnected, address } = useAccount();

  useRequest(() => getMintedNFTs(address as Hex), {
    onSuccess: (data) => {
      dispatch(setMintedAmount(data.minted));
      dispatch(setNftBalance(data.balance));
      dispatch(setBurnedAmount(data.burned));
    },
    ready: isConnected,
    refreshDeps: [lastUpdate, address],
  });

  useRequest(pricePerBNB, {
    onSuccess: (data) => {
      dispatch(setPricePerBNB(data));
    },
    ready: !!lastUpdate,
    refreshDeps: [lastUpdate],
  });

  useRequest(supplyLeft, {
    onSuccess: (data) => {
      dispatch(setAmountSupplyLeft(data));
    },
    ready: !!lastUpdate,
    refreshDeps: [lastUpdate],
  });

  useRequest(() => getTokenPrice("BNB"), {
    onSuccess: (data) => {
      dispatch(setBnbToUSD(data));
    },
    pollingInterval: 20000,
    onError: (e) => console.log(e),
  });

  useEffect(() => {
    if (!isConnected) dispatch(resetBSC());
  }, [isConnected]);

  useEffect(() => {
    dispatch(setLastUpdateBSC());

    return () => {
      dispatch(resetLastUpdate());
      dispatch(resetBSC());
    };
  }, []);

  return <>{children}</>;
};

export default MintNFTWrapper;

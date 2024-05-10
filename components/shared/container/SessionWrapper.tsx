"use client";

import ModalConnectWallet from "@/components/connectwallet";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import {
  resetUserSession,
  setLoadingState,
  setUpdatedAt,
  setUserSession,
} from "store/features/user/userSlice";

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  const { updatedAt } = useSelector((state: RootState) => state.user);
  const { data, status, update } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      dispatch(setLoadingState(true));
    } else if (status === "authenticated") {
      dispatch(setUserSession(data as any));
      dispatch(setUpdatedAt());
      dispatch(setLoadingState(false));
    } else if (status === "unauthenticated") {
      localStorage.removeItem("resend");
      dispatch(setLoadingState(false));
      dispatch(setUserSession(undefined));
    } else {
      dispatch(setLoadingState(false));
    }
  }, [data, status, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetUserSession());
    };
  }, []);

  useEffect(() => {
    if (updatedAt) {
      update?.({
        type: "account",
      });
    }
  }, [updatedAt]);

  useEffect(() => {
    // check if the error has occurred
    if (data?.user.error === "unauthorized") {
      // Sign out here

      signOut();
    }
  }, [data?.user.error, router]);

  // useRequest(getCoingeckoPrice, {
  //   pollingInterval: 30000,
  //   onSuccess: (data) => {
  //     dispatch(setFconPrice(data || 0));
  //   },
  //   onError: (error) => {
  //     console.error("Error fetching FCON price", error);
  //   },
  // });

  // // Polling the session every 1 hour
  // useEffect(() => {
  //   // TIP: You can also use `navigator.onLine` and some extra event handlers
  //   // to check if the user is online and only update the session if they are.
  //   // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
  //   const interval = setInterval(() => update(), 1000 * 60 * 60);
  //   return () => clearInterval(interval);
  // }, [update]);

  // // Listen for when the page is visible, if the user switches tabs
  // // and makes our tab visible again, re-fetch the session
  // useEffect(() => {
  //   const visibilityHandler = () =>
  //     document.visibilityState === "visible" && update();
  //   window.addEventListener("visibilitychange", visibilityHandler, false);
  //   return () =>
  //     window.removeEventListener("visibilitychange", visibilityHandler, false);
  // }, [update]);

  return (
    <>
      <ModalConnectWallet />
      {children}
    </>
  );
};

export default SessionWrapper;

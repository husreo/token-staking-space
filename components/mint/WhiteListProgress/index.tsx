"use client";

import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { getWhitelistState } from "store/features/user/userSlice";
import ConnectWalletMission from "./ConnectWalletMission";
import CreateAccountMission from "./CreateAccountMission";
import FollowSocialsMission from "./FollowSocialsMission";

import SpinnerIcon from "@/components/shared/icons/spinner";
import { toastError } from "@/lib/toastify";
import { SOCIAL_LINK } from "constants/global";
import { classNames } from "utils/string";

const WhiteListProgress = () => {
  const { session, whiteList } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleFollowSocial = async () => {
    // if (window) {
    //   window.open(SOCIAL_LINK.TWITTER);
    // }
    await fetch("/api/user/whitelist/follow-social", {
      method: "POST",
    });
    return true;
  };

  const { runAsync: runFollowSocials, loading: loadingSocial } = useRequest(
    handleFollowSocial,
    {
      manual: true,
      onSuccess: () => {
        dispatch(getWhitelistState());
      },
    },
  );
  const handleWhitelistWallet = async (address: string) => {
    const req = await fetch("/api/user/whitelist/connect-wallet", {
      method: "POST",
      body: JSON.stringify({
        wallet_address: address,
      }),
    });
    const d = await req.json();
    if (req.ok && req.status === 200) {
      return d;
    } else throw new Error("Wallet is existed!");
  };

  const { run: runWhitelistWallet, loading: loadingAddWallet } = useRequest(
    handleWhitelistWallet,
    {
      manual: true,
      onSuccess: () => {
        dispatch(getWhitelistState());
      },
      onError: (d) => {
        toastError(d.message);
      },
    },
  );

  useEffect(() => {
    dispatch(getWhitelistState());
  }, [dispatch]);

  return (
    <div className="relative flex flex-row gap-5 lg:flex-col">
      <div
        className={classNames(
          "absolute left-0 top-0 flex text-lg text-white",
          !!whiteList ? "opacity-0" : "opacity-100",
        )}
      >
        <SpinnerIcon className="h-6 w-6" />
      </div>
      <div
        className={classNames(
          "relative grid flex-1 grid-cols-12 gap-2 pb-1 transition-all ease-linear md:gap-3 lg:gap-5",
          !!whiteList ? "opacity-100" : "opacity-0",
        )}
      >
        <CreateAccountMission isActive={!!session?.user?.username} />
        <FollowSocialsMission
          loading={loadingSocial}
          runFollowSocials={runFollowSocials}
          isActive={whiteList?.is_follow_social}
        />
        {/* <InviteFriendsMission isActive={whiteList?.is_invited_friend} /> */}
        <ConnectWalletMission
          runAddWhitelist={runWhitelistWallet}
          loading={loadingAddWallet}
          connected_wallet={whiteList?.connected_wallet}
        />
      </div>
    </div>
  );
};

export default WhiteListProgress;

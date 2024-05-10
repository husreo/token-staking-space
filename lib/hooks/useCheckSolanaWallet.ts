import { useWallet } from "@solana/wallet-adapter-react";
import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { checkWalletExisted, getPrimaryWallet } from "../api/profile";
import { toastError } from "../toastify";

const useCheckSolanaWallet = ({
  currentWallet,
}: {
  currentWallet?: string;
}) => {
  const { session } = useSelector((state: RootState) => state.user);

  const [isAbleToDeposit, setIsAbleToDeposit] = useState(false);
  const { disconnect } = useWallet();
  const {
    data: primaryWallet,
    run,
    loading,
  } = useRequest(getPrimaryWallet, {
    manual: true,
    onBefore: () => {
      setIsAbleToDeposit(false);
    },
    onSuccess: async (d) => {
      if (currentWallet) {
        const primaryWalletSolana = d?.find(
          (w: Record<string, string>) => !w.is_evm,
        )?.wallet_address;
        const isWalletExisted = await checkWalletExisted(
          currentWallet as string,
        );
        let temp = true;
        if (isWalletExisted) {
          if (!primaryWalletSolana) {
            temp = false;
          } else if (
            !!primaryWalletSolana &&
            primaryWalletSolana !== currentWallet
          ) {
            temp = false;
          } else if (primaryWalletSolana === currentWallet) {
            temp = true;
          }
        }

        if (temp) {
          setIsAbleToDeposit(true);
        } else {
          toastError("Wallet is in use by another account!");
          disconnect();
        }
      }
    },
    // ready: session?.user?.username && !!currentWallet,
  });

  useEffect(() => {
    if (session?.user.username) {
      run();
    }
  }, [session?.user.username, currentWallet, run]);

  const primaryWalletSolana = primaryWallet?.find(
    (w: Record<string, string>) => !w.is_evm,
  )?.wallet_address;

  return {
    isAbleToDeposit,
    primaryWallet: primaryWalletSolana,
    loadingCheckWallet: loading,
  };
};

export default useCheckSolanaWallet;

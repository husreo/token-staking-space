import Button from "@/components/shared/button";
import { sendCrypto } from "@/lib/api/crypto";
import { toastError, toastSuccess } from "@/lib/toastify";
import { waitForTransaction } from "@wagmi/core";
import { useRequest } from "ahooks";
import { CHAIN_SYMBOL } from "constants/payment";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUpdatedAt } from "store/features/user/userSlice";
import { sleep } from "utils/promise";
import { classNames } from "utils/string";
import { Hex } from "viem";
import { goerli, mainnet } from "viem/chains";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import WalletConection from "../mynft/WalletConection";

const LimitReferralProgram = ({
  isPaid,
  isMax,
}: {
  isPaid?: boolean;
  isMax?: boolean;
}) => {
  const [didPurchase, setDidPurchase] = useState(false);
  const dispatch = useDispatch();
  const { isConnected, address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const targetChain =
    process.env.NEXT_PUBLIC_ENV === "testnet" ? goerli : mainnet;
  const t = useTranslations();

  const handleCheckTransaction = async (opts: {
    tx_hash: Hex;
    wallet_address: Hex;
    amount: number;
    chain_id: number;
  }) => {
    const chainName = CHAIN_SYMBOL[opts.chain_id as any];
    await waitForTransaction({
      hash: opts.tx_hash,
    });

    const req = await fetch("/api/user/purchase-referral", {
      method: "POST",
      body: JSON.stringify({
        chain: chainName,
        tx_hash: opts.tx_hash,
        amount: opts.amount,
        wallet_address: opts.wallet_address,
      }),
    });

    return req;
  };

  const { run: runHandleCheckTransactions, loading: loadingCheckTransaction } =
    useRequest(handleCheckTransaction, {
      manual: true,
      onSuccess: async () => {
        await sleep(1000);
        setDidPurchase(true);
        toastSuccess(t("dashboard.overview.purchase-success"));
      },
      onFinally: () => {
        dispatch(setUpdatedAt(Date.now()));
      },
      onError: (e) => {
        toastError(t("dashboard.overview.purchase-failed"));
      },
    });
  const { run, loading } = useRequest(
    () =>
      sendCrypto({
        wallet_address: address,
        receive_address: "0x2ff723265e50562f57a925bb20afa56b7b03047d",
        token_address:
          process.env.NEXT_PUBLIC_ENV === "testnet"
            ? "0x78f9350e01916d537bda1f02f3bff65bb3d27525"
            : "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        value: 10,
        isUSDT: true,
        isMainet: chain?.id === mainnet.id,
      }),
    {
      manual: true,
      ready: !!targetChain,
      onSuccess: (d) => {
        if (d) {
          runHandleCheckTransactions({ ...d, chain_id: targetChain.id });
        }
      },
      onError(e) {
        if (e.message) {
          toastError(e.message);
        }
      },
    },
  );

  return (
    <div className="font-aeonikPro">
      <div className="mb-5 flex flex-wrap items-center justify-between border-b border-white/10 py-6">
        <p>{t("dashboard.overview.unlimited-referral-program")}</p>
        <p className="text-[17px] text-fcon">
          {isPaid
            ? t("dashboard.overview.unlimited")
            : t("dashboard.overview.go-unlimited")}
        </p>
      </div>
      {isMax && !isPaid ? (
        <p className="mb-6 text-[15px] text-red-500">
          {t("dashboard.overview.max-out-referral")}
        </p>
      ) : null}
      {!isPaid && !didPurchase ? (
        <div>
          {isConnected ? null : <WalletConection />}
          {chain?.id === targetChain.id ? (
            <Button
              disabled={!isConnected || loading}
              onClick={run}
              className={classNames(
                "h-14 w-full justify-between rounded-[10px] px-6 font-medium text-black",
                isConnected ? "" : "!hidden",
              )}
            >
              <span className="flex justify-between">
                <span>
                  {isConnected
                    ? "Go Unlimited Now"
                    : "Connect your wallet to proceed"}
                </span>
                <span>10 USDT</span>
              </span>
            </Button>
          ) : (
            <Button
              disabled={!isConnected}
              onClick={() => switchNetwork?.(targetChain.id)}
              className={classNames(
                "h-14 w-full justify-between rounded-[10px] px-6 font-medium text-black",
                isConnected ? "" : "!hidden",
              )}
            >
              {t("button.switch-to")} {targetChain.name}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default LimitReferralProgram;

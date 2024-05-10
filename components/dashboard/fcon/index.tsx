import { submitSolanaTransaction, transferSolanaToken } from "@/lib/api/crypto";
import {
  checkWalletExisted,
  getPrimaryWallet,
  setPrimaryWallet,
} from "@/lib/api/profile";
import usePhantomWallet from "@/lib/hooks/usePhantomWallet";
import { toastSuccess } from "@/lib/toastify";
import { RadioGroup } from "@headlessui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useRequest } from "ahooks";
import { ADDRESS_DEPOSIT_FCON } from "constants/payment";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { get } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setUpdatedAt } from "store/features/user/userSlice";
import { callRpcApi } from "utils/solanaRPC";
import { classNames, formatStats, shortAddress } from "utils/string";
import ModalWithdrawFCON from "./ModalWithdrawFCON";

const FCON = () => {
  let [plan, setPlan] = useState("withdraw");
  let [amount, setAmount] = useState(0);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const { session } = useSelector((state: RootState) => state.user);
  const userFconBalance = session?.user?.balances?.fcon_balance;

  const dispatch = useDispatch();
  const t = useTranslations();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { walletPublicKey } = usePhantomWallet();
  const [fconBalance, setFconBalance] = useState(0);

  const toggleOpenWithdraw = () => setOpenWithdraw((p) => !p);

  const getBalance = async (publicKey: PublicKey) => {
    const params = [
      publicKey?.toBase58(),
      {
        mint: "HovGjrBGTfna4dvg6exkMxXuexB3tUfEZKcut8AWowXj",
      },
    ];
    const response: any = await callRpcApi("getTokenAccountsByOwner", params);
    const balance = get(
      response[0],
      "account.data.parsed.info.tokenAmount.uiAmountString",
      "0",
    ) as number;
    return balance;
  };

  const { run: runGetBalance, loading: loadingBalance } = useRequest(
    () => getBalance(walletPublicKey as PublicKey),
    {
      onSuccess(data, _params) {
        setFconBalance(data);
      },
      pollingInterval: 30000,
      manual: true,
    },
  );

  useEffect(() => {
    if (walletPublicKey?.toBase58() && plan === "deposit") {
      runGetBalance();
    } else {
      setFconBalance(0);
    }
  }, [walletPublicKey, runGetBalance, plan]);

  const onDeposit = useCallback(() => {
    if (plan === "deposit") {
      if (!publicKey) throw new Error("Wallet is not connected");
      runDeposit({
        sendTransaction,
        connection,
        address: publicKey,
        amount,
        isNative: false,
        selectedToken: {
          address: "HovGjrBGTfna4dvg6exkMxXuexB3tUfEZKcut8AWowXj",
          priceFeedId: "spacefalcon",
          symbol: "fcon",
          decimal: 4,
          logo: "/images/tokens/fcon.svg",
        },
      });
    }
  }, [plan, publicKey, amount, connection, sendTransaction]);

  const { runAsync: runDeposit, loading: loadingPayment } = useRequest(
    transferSolanaToken,
    {
      manual: true,
      onSuccess: async (d) => {
        if (!d || !d.txHash || !d.value) return;
        // setPurchaseDetail({
        //   message: t("notices.confirm-transaction"),
        //   type: "deposit",
        //   status: "loading",
        //   txHash: d.txHash,
        //   txValue: d.value,
        // });
        await runSubmitTransaction({
          tx_hash: d.txHash,
          amount: d.value.toString(),
          chain: "solana-mainnet-beta",
          from_address: walletPublicKey as PublicKey,
          fp_amount: 0,
          is_native: false,
          to_address: ADDRESS_DEPOSIT_FCON,
          token: "HovGjrBGTfna4dvg6exkMxXuexB3tUfEZKcut8AWowXj",
          is_deposit_fcon: true,
        });
        toastSuccess(`Successfully deposit ${d.value / 10000} FCON`);
      },
      onError: (e) => {
        const errorKeys =
          // @ts-ignore
          e?.cause?.name ||
          // @ts-ignore
          e?.cause?.details
            ?.toLowerCase()
            .replace(":", "")
            .split(" ")
            .join("_");
      },
    },
  );

  const { runAsync: runSubmitTransaction, loading: loadingTransaction } =
    useRequest(submitSolanaTransaction, {
      manual: true,
      onSuccess: () => {
        runGetBalance();
        dispatch(setUpdatedAt(Date.now()));
      },
      onError: () => {},
      onBefore: (d) => {},
    });

  const {
    data: primaryWallet,
    loading: loadingGetPrimaryWallet,
    run: runGetPrimaryWallet,
  } = useRequest(getPrimaryWallet, {
    ready: !!session?.user?.public_id,
    retryCount: 3,
  });

  const {
    data: dataWalletExisted,
    loading: loadingCheckWalletExisted,
    mutate,
  } = useRequest(
    () => checkWalletExisted(walletPublicKey?.toBase58() as string),
    {
      ready: !!session?.user?.public_id && !!walletPublicKey,
      onBefore: () => {
        mutate(() => undefined);
      },
      refreshDeps: [walletPublicKey],
    },
  );

  const { run: runSetPrimaryWallet, loading: loadingSetWallet } = useRequest(
    setPrimaryWallet,
    {
      manual: true,
      onSuccess: async () => {
        runGetPrimaryWallet();
      },
    },
  );

  const solanaPrimaryWallet =
    primaryWallet?.find((i: any) => !i.evm)?.wallet_address || undefined;
  const walletMatch =
    solanaPrimaryWallet?.toLowerCase() ===
    walletPublicKey?.toBase58().toLowerCase()
      ? "matched"
      : !solanaPrimaryWallet
      ? "primary_wallet_not_set"
      : "not_matched";

  return (
    <div className="h-full w-full rounded-[20px] border border-white/[0.12] bg-gray1 p-8 font-aeonikPro text-white sm:p-12">
      <ModalWithdrawFCON
        open={openWithdraw}
        closeModal={toggleOpenWithdraw}
        fcon_amount={amount}
        successSubmit={() => {
          dispatch(setUpdatedAt(Date.now()));
        }}
        wallet_address={solanaPrimaryWallet}
      />

      {/* <p>{primaryWalletSolana}</p>
      <p>{walletPublicKey?.toBase58()}</p> */}
      <div className="mb-9 flex items-center justify-between max-sm:flex-col">
        <div>
          <p className="text-[32px] font-medium">FCON</p>
          {!!primaryWallet && (
            <p className="text-sm">
              Primary Wallet: {shortAddress(solanaPrimaryWallet)}
            </p>
          )}
        </div>

        <RadioGroup
          value={plan}
          onChange={setPlan}
          className="flex cursor-pointer items-center rounded-md bg-gray2 p-1 max-[300px]:flex-col"
        >
          <RadioGroup.Option value="withdraw" className="h-10">
            {({ checked }) => (
              <div
                className={classNames(
                  "flex h-full items-center justify-center rounded border px-7",
                  checked
                    ? "border-white/[0.12] bg-gray3"
                    : "border-transparent",
                )}
              >
                {t("button.withdraw")}
              </div>
            )}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
      {/* <div className="mb-3">
        <p>{shortAddress(walletPublicKey?.toBase58())}</p>
      </div> */}
      {/* <p>{walletPublicKey?.toBase58()}</p> */}
      <div>
        {plan === "deposit" && (
          <div className="mb-2 flex items-center justify-between">
            <p
              className={classNames(
                "text-[15px] leading-5 text-gray7 transition-all duration-100 ease-linear",
                loadingBalance ? "animate-pulse" : "",
              )}
            >
              {t("dashboard.balance")}
            </p>
            <p
              onClick={() => setAmount(Math.floor(fconBalance || 0))}
              className="cursor-pointer text-[15px] leading-5"
            >
              {formatStats({
                n: Number(fconBalance),
                notation: "standard",
              })}{" "}
              FCON
            </p>
          </div>
        )}
        {plan === "withdraw" && (
          <div className="mb-2 flex items-center justify-between gap-2 ">
            <p className="truncate text-[15px] leading-5 text-gray7">
              {t("dashboard.balance")}
            </p>
            <p
              onClick={() => setAmount(Math.floor(userFconBalance || 0))}
              className="cursor-pointer text-[15px] leading-5"
            >
              {formatStats({
                n: Number(userFconBalance || 0),
                notation: "standard",
              })}{" "}
              FCON
            </p>
          </div>
        )}
        <div className="relative mb-9 w-full gap-2 rounded-xl border border-gray3 p-3 sm:p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.26] bg-[#0f0f0f]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="22"
                fill="none"
                viewBox="0 0 10 22"
              >
                <g clipPath="url(#clip0_7500_39387)">
                  <path
                    fill="#00FFC2"
                    d="M9.708 11.004a.718.718 0 00-.211-.507L8.352 9.363v5.826l-1.824-1.855-.587-.585 1.732-1.703v-7.71L4.934.736l-2.73 2.6v7.657l1.786 1.78-2.464 2.42V9.363L.38 10.496a.71.71 0 00-.211.506v7.418l2.033-2v2.097c0 .191.077.374.213.508l.923.91v-4.63l.921-.905v6.208l.678.672.678-.672V14.39l.926.914v4.764l.923-.91a.713.713 0 00.213-.508v-2.227l2.03 2.003v-7.423zm-6.149-.63V3.909l1.375-1.311 1.383 1.31v6.579l-1.332 1.309-1.426-1.422z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_7500_39387">
                    <path
                      fill="#fff"
                      d="M0 0H9.538V20.544H0z"
                      transform="translate(.17 .736)"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <input
              onChange={(e) => setAmount(Number(e.target.value))}
              type="number"
              className="w-3/4 flex-1 border-none bg-transparent pr-20 font-dinPro text-2xl font-bold focus:outline-none focus:ring-0 max-[300px]:text-lg sm:text-[32px]"
              placeholder="0"
              value={amount}
            />
          </div>
          <p className="absolute right-5 top-1/2 -translate-y-1/2 transform font-dinPro text-2xl font-bold text-white/20 max-[300px]:text-lg sm:text-[32px]">
            FCON
          </p>
        </div>
        {/* <div
          className={classNames(
            session?.user?.public_id ||
              !loadingGetPrimaryWallet ||
              !loadingCheckWalletExisted
              ? ""
              : "!hidden",
          )}
        >
          {!connected || !walletPublicKey?.toBase58() ? (
            <Button
              onClick={() => {
                dispatch(setWalletType("solana"));
              }}
              className={classNames(
                "w-full rounded-[10px] py-2 text-black transition-all duration-300",
              )}
            >
              <div className="flex w-full items-center gap-2">
                <Phantom className="w-7" />
                <span className="font-medium">Connect</span>
              </div>
            </Button>
          ) : null}
          <div className={classNames(connected ? "" : "hidden")}>
            {walletMatch === "primary_wallet_not_set" &&
            dataWalletExisted === "not_existed" ? (
              <Button
                loading={loadingSetWallet || loadingGetPrimaryWallet}
                disabled={loadingSetWallet || loadingGetPrimaryWallet}
                onClick={() =>
                  runSetPrimaryWallet(walletPublicKey?.toBase58() as string)
                }
                className={classNames(
                  "w-full rounded-[1000px] py-3 font-medium capitalize text-black disabled:opacity-60",
                )}
              >
                Set Primary Wallet {shortAddress(walletPublicKey?.toBase58())}
              </Button>
            ) : null}
            {walletMatch === "primary_wallet_not_set" &&
            dataWalletExisted === "existed" ? (
              <p>Wallet is connected to other account</p>
            ) : null}
            {walletMatch === "not_matched" ? (
              <p>
                Please connect to your primary wallet:{" "}
                {shortAddress(solanaPrimaryWallet)}!
              </p>
            ) : null}
            {walletMatch === "matched" ? (
              <Button
                disabled={
                  !amount ||
                  (plan === "withdraw"
                    ? amount > 0 && amount > (userFconBalance || 0)
                    : false)
                }
                loading={loadingPayment}
                className={classNames(
                  "w-full rounded-[1000px] py-3 font-medium capitalize text-black disabled:opacity-60",
                  plan === "withdraw" && session?.user?.public_id
                    ? ""
                    : "!hidden",
                )}
                onClick={toggleOpenWithdraw}
              >
                {amount > (userFconBalance || 0)
                  ? t(`button.exceed-balance`)
                  : t(`button.${plan}`)}
              </Button>
            ) : null}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FCON;

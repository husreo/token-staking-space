"use client";

import { transferSolanaToken } from "@/lib/api/crypto";
import usePhantomWallet from "@/lib/hooks/usePhantomWallet";
import { toastError } from "@/lib/toastify";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useRequest } from "ahooks";
import confetti from "canvas-confetti";
import Image from "next/image";
import Link from "next/link";
import SolCircle from "public/images/tokens/sol_circle.png";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setWalletType } from "store/features/wallet/walletSlice";
import { sleep } from "utils/promise";
import { classNames } from "utils/string";
import Translation from "utils/translation";
import ModalWrapper from "../shared/ModalWrapper";
import Button, { AnimationSpin } from "../shared/button";
import CheckIcon from "../shared/icons/check-icon";
import MinusIcon from "../shared/icons/minus";
import PlusIcon from "../shared/icons/plus-icon";

const preSalePrice = 1.2;

const frame = () => {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: ["#00FFC2"],
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: ["#00FFC2"],
  });
};

const PresaleDeposit = () => {
  const { session } = useSelector((state: RootState) => state.user);
  const [modalEnroll, setModalEnroll] = useState(false);
  const { sendTransaction } = useWallet();
  const { walletPublicKey } = usePhantomWallet();
  const { connection } = useConnection();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      amount: 0,
    },
    reValidateMode: "onChange",
  });
  const amountWatch = watch("amount");

  const submitForm = (e: any) => {
    if (!walletPublicKey) return;
    runTransferSolanaToken({
      receiveAddress: new PublicKey(
        "EgaJnRbXh3ZSdBTXaF6EMqmjdgQZv33VGSmhGg9Htxrh",
      ),
      address: walletPublicKey,
      amount: preSalePrice * e.amount,
      sendTransaction,
      connection,
      isNative: true,
    });
  };

  const submitTransaction = async (params: {
    from_address: string;
    token_address: string;
    tx_hash: string;
    amount: string;
  }) => {
    const req = await fetch("/api/nft/presale", {
      method: "POST",
      body: JSON.stringify({
        ...params,
      }),
    });

    const status = req.status;
    if (status === 200) {
      return true;
    }
    return false;
  };

  const { run: runSubmitTransaction } = useRequest(submitTransaction, {
    manual: true,
    onSuccess: (d) => {
      setModalEnroll(true);
    },
  });

  const increaseAmount = useCallback(() => {
    setValue("amount", Number(amountWatch) + 1, {
      shouldValidate: true,
    });
  }, [amountWatch, setValue]);
  const decreaseAmount = useCallback(() => {
    setValue("amount", Number(amountWatch <= 1 ? 1 : amountWatch) - 1, {
      shouldValidate: true,
    });
  }, [amountWatch, setValue]);

  const { run: runTransferSolanaToken, loading } = useRequest(
    transferSolanaToken,
    {
      manual: true,
      onError: (e) => {
        console.log(e);
        if (e.message) {
          toastError(e.message);
        } else {
          toastError("Something went wrong, please try again later!");
        }
      },
      onSuccess: async (d) => {
        runSubmitTransaction({
          amount: d.value?.toString() as string,
          from_address: walletPublicKey?.toBase58() as string,
          token_address: "So11111111111111111111111111111111111111112",
          tx_hash: d.txHash,
        });
        await sleep(2000);
        runGetPresalePackage();
      },
    },
  );

  const getBoughtPresalePackage = async () => {
    const req = await fetch("/api/nft/presale/get-packages", {
      method: "GET",
    });

    const data = await req.json();

    return data?.total_amount || 0;
  };

  const { run: runGetPresalePackage, data } = useRequest(
    getBoughtPresalePackage,
    {
      ready: !!session?.user?.username,
    },
  );

  useEffect(() => {
    if (modalEnroll) {
      let startTime: number;

      const animate = (timestamp: any) => {
        if (!startTime) {
          startTime = timestamp;
        }

        const elapsed = timestamp - startTime;

        // Trigger confetti function in each frame
        frame();

        // Continue animation until 5 seconds (5000 milliseconds) have passed
        if (elapsed < 3000) {
          requestAnimationFrame(animate);
        }
      };

      // Start the animation
      requestAnimationFrame(animate);
    }
  }, [modalEnroll]);

  return (
    <div className="container mx-auto w-full px-3 md:max-w-lg lg:max-w-[571px]">
      <Link
        target="_blank"
        href="https://docs.google.com/spreadsheets/d/1IRGzL_kgqk-XphP3D_9rmxpYC9z5EfPI2ubEbyyb-5w/edit#gid=1163832275"
        className="mb-6 flex w-full items-center gap-4 rounded-[30px] border border-white/10 bg-white/[0.06] px-5 py-4 text-white backdrop-blur-xl md:px-11 md:py-8"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-[#ff6b00] text-[22.5px] leading-[30px]">
          2X
        </div>
        <div className="flex-1">
          <p className="text-xl font-medium md:text-[22px]">
            <Translation text="presale.check-nft-allocation" />
          </p>
          <p className="text-sm md:text-base">
            <Translation text="presale.check-nft-allocation-description" />
          </p>
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="33"
            fill="none"
            viewBox="0 0 32 33"
          >
            <g clipPath="url(#clip0_8530_27731)" opacity="0.5">
              <path
                fill="#fff"
                d="M10 6.5v2h12.59L6 25.09l1.41 1.41L24 9.91V22.5h2v-16H10z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_8530_27731">
                <path
                  fill="#fff"
                  d="M0 0H32V32H0z"
                  transform="translate(0 .5)"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </button>
      </Link>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full rounded-[30px] border border-white/10 bg-black/10 p-5 text-white backdrop-blur-[27px] lg:p-11"
      >
        <ModalWrapper open={modalEnroll} onClose={() => setModalEnroll(false)}>
          <div className="w-screen max-w-md rounded-md bg-gray2 p-5 py-10 text-white md:max-w-lg">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-500">
              <CheckIcon className="w-10 text-green-500" />
            </div>
            <p className="text-center text-xl font-medium">
              <Translation text="presale.order-successful" />
            </p>
            <p className="mb-3 text-center">
              <Translation text="presale.bonus" />
            </p>
            <div className="flex justify-center">
              <Link href={"/dashboard?tab=overview"}>
                <Button className="h-12 rounded-[100px] px-16 text-black">
                  <Translation text="presale.enter-tournament" />
                </Button>
              </Link>
            </div>
          </div>
        </ModalWrapper>
        <div
          style={{
            background: "rgba(0, 255, 194, 0.10)",
          }}
          className="mb-[34px] flex items-center justify-between rounded-[14px] border border-fcon p-8 backdrop-blur-xl"
        >
          <p className="text-xl">
            <Translation text="presale.presale-bought" />
          </p>
          <p className="text-xl">{data}</p>
        </div>
        <div className="mb-5 flex items-start justify-between">
          <p className="text-[20px]">
            <Translation text="presale.exclusive-price" />
          </p>
          <p className="flex items-center gap-2">
            <Image src={SolCircle} alt="" width={26} height={26} />
            <span className="text-[20px]"> {preSalePrice} SOL</span>
          </p>
        </div>
        <div className="mb-[34px]">
          <div className="mb-1 flex rounded-lg bg-white/[0.05] px-6 py-5">
            <input
              placeholder="Enter amount"
              className="flex-1 border-none bg-transparent px-0 py-0 placeholder:text-white/20 focus:outline-none focus:ring-0"
              type="number"
              id=""
              autoFocus
              {...register("amount", {
                validate: {
                  mustBiggerThanZero: (e) => e > 0,
                },
                required: true,
              })}
            />
            <div className="flex items-start gap-3">
              <button
                disabled={loading}
                type="button"
                onClick={decreaseAmount}
                className="transform transition-all active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-80"
              >
                <MinusIcon className="w-5 text-white" />
              </button>
              <div className="h-6 w-[1px] bg-white/20"></div>
              <button
                disabled={loading}
                type="button"
                onClick={increaseAmount}
                className="transform transition-all active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-80"
              >
                <PlusIcon className="w-5 text-white" />
              </button>
            </div>
          </div>
          {errors?.amount?.type && (
            <p className={classNames("text-sm font-light text-red-500")}>
              <Translation text={`error-messages.${errors?.amount?.type}`} />
            </p>
          )}
          {/* {errors?.amount?.type && (

        )} */}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[17px]">
            <Translation text="presale.total-payment-amount" />
          </p>{" "}
          <p className="flex items-center gap-1">
            <Image src={SolCircle} alt="" width={16} height={16} />
            <span className="text-[20px]">
              {amountWatch === 0
                ? "-"
                : (amountWatch * preSalePrice).toFixed(1)}{" "}
              SOL
            </span>
          </p>
        </div>
        {session?.user?.username ? (
          walletPublicKey?.toBase58() ? (
            <button
              type="submit"
              disabled
              className="group flex h-14 w-full items-center rounded-[52px] bg-white/10 p-1 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span
                // style={{
                //   background:
                //     "linear-gradient(91deg, #4B86F9 0%, #00FFC2 99.95%)",
                // }}
                className="not inline-flex h-full flex-1 transform items-center justify-center gap-2 rounded-[31px] bg-fcon text-[17px] font-medium text-black group-active:translate-x-[2px] group-active:translate-y-[2px]"
              >
                {loading ? (
                  <AnimationSpin />
                ) : // <svg
                //   xmlns="http://www.w3.org/2000/svg"
                //   fill="none"
                //   viewBox="0 0 24 24"
                //   strokeWidth={1.5}
                //   stroke="currentColor"
                //   className="h-6 w-6"
                // >
                //   <path
                //     strokeLinecap="round"
                //     strokeLinejoin="round"
                //     d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                //   />
                // </svg>
                null}
                <span>
                  <Translation text="presale.secure-now" />
                </span>
              </span>
            </button>
          ) : (
            <div className="flex w-full items-center justify-center">
              <Button
                type="button"
                className="mx-auto h-12 min-w-[300px] rounded-[100px] px-3 py-1 text-black"
                variant="gradient"
                onClick={() => dispatch(setWalletType("solana" as any))}
              >
                <Translation text="button.connect-wallet" />
              </Button>
            </div>
          )
        ) : null}
      </form>
    </div>
  );
};

export default PresaleDeposit;

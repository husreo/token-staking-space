"use client";

import ModalWrapper from "@/components/shared/ModalWrapper";
import Button from "@/components/shared/button";
import { useRequest } from "ahooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Translation from "utils/translation";
import styles from "./style.module.css";

import Image from "next/image";
import RPImage from "public/images/FalconBadge/reward-point1.png";
import OTPBox from "./OTPBox";

const Claimbox = ({ maxRP }: { maxRP: number }) => {
  const [txId, setTxId] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
    setValue,
  } = useForm({
    values: {
      amount: 0,
      fcon_receive: 0,
      slider_amount: 0,
      tmp_amount: 0,
    },
  });

  const amount = watch("tmp_amount");

  const submitForm = async ({ amount }: { amount: number }) => {
    if (maxRP === 0 || amount > maxRP) {
      reset();
      setError("amount", {
        type: "notEnoughBalance",
      });
      return;
    }

    const req = await fetch("/api/fp/withdraw", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    });
    if (req.status === 200) {
      const data = await req.json();

      return data;
    }
    return null;
  };

  const { runAsync: runSubmitForm, loading } = useRequest(submitForm, {
    manual: true,
    onSuccess: (e) => {
      if (e?.tx_id) {
        setTxId(e.tx_id);
      }
    },
  });

  return (
    <>
      <ModalWrapper
        onClose={() => {
          setTxId(undefined);
        }}
        open={!!txId}
      >
        <OTPBox txId={txId} />
      </ModalWrapper>
      <form onSubmit={handleSubmit(runSubmitForm)}>
        <div className="mb-12 flex flex-col gap-4">
          <div className="mb-2">
            <input
              type="range"
              defaultValue={0}
              min="1"
              max={maxRP}
              className={styles["slider"]}
              style={{
                background: `linear-gradient(to right, #04c899 0%, #3fd8b3 ${
                  (amount / maxRP) * 100
                }%, #009974 ${(amount / maxRP) * 100}%, #2D3130 0%)`,
              }}
              {...register("slider_amount")}
              onChange={(e) => {
                setValue("amount", Number(e.target.value));
                setValue("tmp_amount", Number(e.target.value));
                setValue("fcon_receive", Number(e.target.value));
              }}
            />
            <p className="text-right text-[14px]">
              <span className="font-light text-[#ABB2B0]">
                Maximum allowed is
              </span>{" "}
              <span className="text-white">10,000 RP</span>
            </p>
          </div>
          <div>
            <div className="relative flex items-center gap-5 rounded-md bg-white/[0.05] p-4">
              <input
                type="number"
                autoComplete="off"
                className="flex-1 border-none bg-transparent p-0 text-sm font-medium text-white focus:border-none focus:outline-none focus:ring-0"
                {...register("amount", {
                  required: true,
                  validate: {
                    // onlyDigit: (e) => /^[0-9.-]+$/.test(e.toString()),
                    mustBiggerThanZero: (e) => Number(e) > 0,
                    mustBeInteger: (e) => Number(e) % 1 === 0,
                    // noLeadingZero: (e) => /^[1-9]\d*|^0$/.test(e.toString()),
                    // onlySixCharacter: (e) => e.toString().length <= 6,
                    exceedMaxRPAllow: (e) => e <= 10000,
                  },
                })}
                onChange={(e) => {
                  setValue("slider_amount", Number(e.target.value));
                  setValue("fcon_receive", Number(e.target.value));
                  setValue("tmp_amount", Number(e.target.value));
                }}
              />
              <Image src={RPImage} alt="RP_image" className="h-5 w-5" />
            </div>
            {errors?.amount?.type && (
              <p className="mt-1 text-[13px] font-medium text-error">
                <Translation text={`error-messages.${errors?.amount?.type}`} />
              </p>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            fill="none"
            viewBox="0 0 38 38"
            className="mx-auto"
          >
            <path
              fill="#00FFC2"
              d="M25.4 20.3L24 18.9l-4.3 4.3V11h-2v12.2l-4.3-4.3-1.4 1.4 6.7 6.7 6.7-6.7z"
            ></path>
            <circle cx="19" cy="19" r="18.5" stroke="#00FFC2"></circle>
          </svg>
          <div>
            <div className="relative flex gap-5 rounded-md bg-white/[0.05] p-4">
              <input
                type="string"
                disabled
                autoComplete="off"
                className="flex-1 border-none bg-transparent text-sm font-medium text-white focus:outline-none"
                {...register("fcon_receive", {
                  required: true,
                  // validate: {
                  //   onlyDigit: (e) => /^[0-9.-]+$/.test(e.toString()),
                  //   mustBiggerThanZero: (e) => Number(e) > 0,
                  //   mustBeInteger: (e) => Number(e) % 1 === 0,
                  //   noLeadingZero: (e) => /^[1-9]\d*|^0$/.test(e.toString()),
                  //   onlySixCharacter: (e) => e.toString().length <= 6,
                  // },
                })}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 22 22"
              >
                <g clipPath="url(#clip0_3815_17412)">
                  <path
                    fill="#0F0F0F"
                    d="M22 11C22 5.201 17.075.5 11 .5S0 5.201 0 11s4.925 10.5 11 10.5S22 16.799 22 11z"
                  ></path>
                  <path
                    stroke="#fff"
                    strokeOpacity="0.14"
                    d="M11 1c5.821 0 10.5 4.499 10.5 10S16.821 21 11 21 .5 16.501.5 11 5.179 1 11 1z"
                  ></path>
                  <path
                    fill="#00FFC2"
                    d="M14.209 10.997a.447.447 0 00-.142-.323l-.77-.725v3.722l-1.228-1.185-.394-.374 1.164-1.087V6.099l-1.842-1.662L9.16 6.1v4.891l1.202 1.137-1.658 1.547V9.948l-.77.725a.442.442 0 00-.142.323v4.74l1.368-1.278v1.34c0 .121.052.238.143.324l.621.581v-2.958l.62-.578v3.966l.456.43.456-.43V13.16l.623.584v3.044l.62-.582a.445.445 0 00.144-.324V14.46l1.366 1.28v-4.743zm-4.137-.402v-4.13l.925-.838.93.837v4.203l-.896.836-.959-.908z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_3815_17412">
                    <path
                      fill="#fff"
                      d="M0 0H22V21H0z"
                      transform="translate(0 .5)"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
            </div>
            {/* {errors?.amount?.type && (
              <p className="mt-1 text-[13px] font-medium text-error">
                <Translation text={`error-messages.${errors?.amount?.type}`} />
              </p>
            )} */}
          </div>
        </div>
        <p className="font-leight text-gray7">
          {amount.toLocaleString("en-US")} RP will be deducted from your balance
          after this transaction
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Button
            variant="default"
            className="flex-1 rounded-[100px] bg-gray0 py-3 text-black"
            loading={loading}
          >
            <Translation text="button.redeem-fcon" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => reset()}
            loading={loading}
            type="button"
            className="flex-1 rounded-[100px] border border-gray6 bg-transparent py-3 font-medium text-gray6 transition-all duration-150 hover:bg-gray6 hover:text-black"
          >
            <Translation text="button.cancel" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default Claimbox;

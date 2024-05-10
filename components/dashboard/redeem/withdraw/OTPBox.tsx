import Button from "@/components/shared/button";
import { useCountDown, useRequest } from "ahooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUpdatedAt } from "store/features/user/userSlice";
import { shortAddress } from "utils/string";
import ExpiredTransaction from "./ExpiredTransaction";
import FailedTransaction from "./FailedTransaction";
import SubmittedTransaction from "./SubmittedTransaction";

type TransactionStatus =
  | "idle"
  | "submitted"
  | "failed"
  | "invalid"
  | "expired";

const OTPBox = ({ txId }: { txId?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    values: {
      otp: "",
    },
  });
  const dispatch = useDispatch();
  const [status, setStatus] = useState<TransactionStatus>("idle");
  const [retry, setRetry] = useState(false);
  const [_countdown, formattedRes] = useCountDown({
    leftTime: 120000,
    onEnd: () => {
      setStatus("expired");
    },
  });
  const { minutes, seconds } = formattedRes;
  const [transactionHash, setTransactionHash] = useState("");

  const submitForm = async ({ otp }: { otp: string }) => {
    const req = await fetch("/api/fp/withdraw/verify", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp_code: otp,
        tx_id: txId,
      }),
    });
    const data = await req.json();
    return data;
  };

  const { runAsync: runSubmitForm, loading } = useRequest(submitForm, {
    manual: true,
    onSuccess: (e) => {
      if (e.tx_id) {
        setStatus("submitted");
        setTransactionHash(e.hash);
        dispatch(setUpdatedAt(Date.now()));
      } else if (e.message === "otp_failed") {
        setError("otp", {
          type: "invalid_otp",
        });
      } else if (e.message === "transaction_failed") {
        setStatus("failed");
      }
    },
  });

  return (
    <div className="min-w-[420px] rounded-xl bg-black p-6">
      {status === "expired" && <ExpiredTransaction />}
      {status === "submitted" && <SubmittedTransaction />}
      {status === "failed" && <FailedTransaction />}
      {status === "idle" && (
        <form onSubmit={handleSubmit(runSubmitForm)}>
          <p className="text-white">OTP</p>
          <p className="text-white">{shortAddress(txId)}</p>

          <div className="relative mt-10 flex overflow-hidden rounded">
            <input
              type="text"
              maxLength={6}
              className="w-full flex-1 border-none bg-gray2 text-center text-white focus:border-none focus:outline-none"
              {...register("otp", {
                required: true,
                validate: {
                  shouldHaveSixCharacter: (e) => e.length === 6,
                },
              })}
            />

            <div className="flex w-32 items-center justify-center bg-white text-black dark:text-black">
              {!retry ? (
                <>
                  {minutes} : {seconds}
                </>
              ) : (
                <button className="underline">retry</button>
              )}
            </div>
          </div>
          {errors?.otp?.type === "required" && (
            <p className="mt-1 text-[13px] font-medium text-error">
              This field is required
            </p>
          )}
          {errors?.otp?.type === "shouldHaveSixCharacter" && (
            <p className="mt-1 text-[13px] font-medium text-error">
              OTP should have 6 characters
            </p>
          )}
          {errors?.otp?.type === "invalid_otp" && (
            <p className="mt-1 text-[13px] font-medium text-error">
              OTP is invalid.
            </p>
          )}
          <Button loading={loading} className="mt-5 rounded px-5 py-2">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default OTPBox;

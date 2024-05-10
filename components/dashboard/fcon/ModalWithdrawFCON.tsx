import LoaderSpinner from "@/components/layout/LoadingSpinner";
import ModalWrapper from "@/components/shared/ModalWrapper";
import Button from "@/components/shared/button";
import XIcon from "@/components/shared/icons/x-icon";
import { useCountDown, useRequest } from "ahooks";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addLeadingZero, classNames } from "utils/string";
import Translation from "utils/translation";

const ModalWithdrawFCON = ({
  open,
  closeModal,
  wallet_address,
  successSubmit,
  fcon_amount,
}: {
  open: boolean;
  fcon_amount: number;
  wallet_address?: string;
  closeModal: () => void;
  successSubmit: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    values: {
      otp_code: undefined,
    },
  });

  const [startDate, setStartDate] = useState<Dayjs | undefined>();
  const [isTimeout, setIsTimeout] = useState(false);
  const [_t, formatRes] = useCountDown({
    targetDate: startDate,
    onEnd() {
      setIsTimeout(true);
    },
  });
  const { minutes, seconds } = formatRes;

  const { data, loading, mutate } = useRequest(
    async () => {
      const req = await fetch("/api/fp/withdraw-fcon", {
        method: "POST",
        body: JSON.stringify({
          fcon_amount: fcon_amount,
          to_address: wallet_address,
        }),
      });
      const data = await req.json();
      return data;
    },
    {
      ready: open,
      cacheTime: 10,
      onSuccess: (d) => {
        if (d.tx_id) {
          setStartDate(dayjs().add(2, "minutes"));
        }
      },
    },
  );

  const {
    run: runSubmitOTP,
    loading: loadingSubmitOTP,
    data: dataSubmitOTP,
    mutate: mutateDataOTP,
    error,
    refresh,
  } = useRequest(
    async (p: { tx_id: string; otp_code?: number }) => {
      const req = await fetch("/api/fp/withdraw/verify", {
        method: "POST",
        body: JSON.stringify({
          tx_id: p.tx_id,
          is_nft: false,
          otp_code: p.otp_code,
          chain: "solana-mainnet-beta",
        }),
      });
      const data = await req.json();
      if (req.status === 200) {
        return data;
      } else {
        setError("otp_code", {
          message: data.message,
        });
      }
    },
    {
      manual: true,
      onSuccess: (d) => {
        if (d.tx_id) {
          setTimeout(() => {
            successSubmit();
          }, 500);
        }
      },
    },
  );

  useEffect(() => {
    return () => {
      setTimeout(() => {
        mutate();
        mutateDataOTP();
        setStartDate(undefined);
        setIsTimeout(false);
        reset();
      }, 300);
    };
  }, [wallet_address, fcon_amount, mutate, reset, open]);

  return (
    <ModalWrapper open={open} onClose={() => {}}>
      <div className="relative min-h-[200px] w-[560px] rounded-[20px] bg-gray2 p-6 text-white">
        {loading ? (
          <div className="absolute bottom-0 left-0 right-0 top-0 z-30 bg-black/60">
            <LoaderSpinner width={20} />
          </div>
        ) : null}
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="rounded-[32px] bg-white/[0.07] px-3 py-[6px]"
          >
            <XIcon className="w-3" />
          </button>
        </div>
        <div>
          <div className="mt-5 flex items-start justify-between">
            <p className="mb-2">Withdraw FCON</p>
            <div className="text-sm">
              {/* <p>
                <span>To:</span>
                <span className="font-medium">
                  {" "}
                  {shortAddress(wallet_address)}
                </span>
              </p> */}
              <p>
                Amount: {fcon_amount} <span className="text-xs">FCON</span>
              </p>
            </div>
          </div>
          {!isTimeout ? (
            dataSubmitOTP?.tx_id ? (
              <p className="mt-3">
                Transaction is complete, please check your wallet!
              </p>
            ) : (
              <form
                onSubmit={handleSubmit((d) =>
                  runSubmitOTP({
                    tx_id: data?.tx_id,
                    otp_code: d.otp_code,
                  }),
                )}
              >
                {data?.tx_id && (
                  <p className="py-5 text-sm text-fcon">
                    An OTP has been sent to your email.
                  </p>
                )}
                <div className="flex items-center overflow-hidden rounded border border-white/10">
                  <input
                    type="number"
                    className="h-12 flex-1 border-none bg-transparent"
                    placeholder="OTP"
                    {...register("otp_code", {
                      required: true,
                    })}
                  />
                  <div className="flex h-12 w-24 items-center justify-center bg-white text-black">
                    {addLeadingZero(minutes)}:{addLeadingZero(seconds)}
                  </div>
                </div>
                {errors.otp_code?.message && (
                  <div className="mt-1 text-sm text-red-500">
                    <Translation
                      text={`errors.otp.${errors?.otp_code?.message}`}
                    />
                  </div>
                )}
                <div className="mt-5 flex gap-3">
                  <Button
                    type="submit"
                    loading={loadingSubmitOTP}
                    className="flex-1 rounded-[1000px] px-5 py-2 text-black"
                  >
                    {loadingSubmitOTP ? "Submitting" : "Submit"}
                  </Button>
                  <Button
                    onClick={closeModal}
                    type="button"
                    variant="outlined"
                    className={classNames(
                      "rounded-[100px] border border-gray6 bg-transparent py-3 font-medium text-gray6 transition-all duration-150 hover:bg-gray6 hover:text-black",
                      loadingSubmitOTP ? "flex-[0]" : "flex-1",
                    )}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )
          ) : (
            <p>Request timeout</p>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ModalWithdrawFCON;

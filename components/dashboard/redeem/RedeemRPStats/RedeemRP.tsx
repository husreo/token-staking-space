"use client";

import Button from "@/components/shared/button";
import SpaceFalconIcon from "@/components/shared/icons/spacefalcon";
import { getCoingeckoPrice } from "@/lib/api/crypto";
import { toastError, toastSuccess } from "@/lib/toastify";
import { useRequest } from "ahooks";
import { useTranslations } from "next-intl";
import Image from "next/image";
import RPIcon from "public/images/FalconBadge/reward-point1.png";
import { ReactNode, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setUpdatedAt } from "store/features/user/userSlice";
import { sleep } from "utils/promise";
import Translation from "utils/translation";

interface IRedeemInputProps {
  name: string;
  placeholder: string;
  prefixText?: string;
  typeInput?: string;
  value?: any;
  setValue?: (val: any) => void;
  icon: ReactNode;
  register: any;
  readOnly?: boolean;
}
interface ITotalUSDC {
  total_withdraw_24h: number;
  total_transaction_count: number;
}

const RedeemInput = (props: IRedeemInputProps) => {
  const {
    name,
    placeholder,
    prefixText = "",
    value,
    typeInput = "number",
    icon,
    register,
    readOnly = false,
  } = props;
  return (
    <div className="relative mb-4 w-full rounded-xl bg-gray2">
      <div className="flex h-[70px] items-center gap-2 px-[23px]">
        {readOnly ? (
          <input
            name={name}
            type={typeInput}
            className="w-3/4 flex-1 border-none bg-transparent py-0 pl-0 pr-20 text-[16px] placeholder:text-white/50 focus:outline-none focus:ring-0"
            placeholder={placeholder}
            value={value}
            readOnly
          />
        ) : (
          <input
            name={name}
            // onChange={setValue}
            // value={value}
            type={typeInput}
            className="w-3/4 flex-1 border-none bg-transparent py-0 pl-0 pr-20 text-[16px] placeholder:text-white/50 focus:outline-none focus:ring-0"
            placeholder={placeholder}
            {...register(name, {
              // required: true,
            })}
          />
        )}

        <div className="flex items-center gap-2">
          <div className="text-[20px] font-bold">{prefixText}</div>
          {icon}
        </div>
      </div>
    </div>
  );
};

const RedeemRP = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { session } = useSelector((state: RootState) => state.user);
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm({
    values: {
      rpAmount: "",
    },
  });

  const { data: rate = 0, loading: loadingRate } = useRequest(
    async () => {
      await sleep(1000);
      return getCoingeckoPrice();
    },
    {
      pollingInterval: 20000,
    },
  );

  const [isLoading, setIsLoading] = useState(false);

  const rpAmount = useMemo(() => {
    return watch("rpAmount")
      ? parseInt(`${watch("rpAmount")}`)
      : watch("rpAmount");
  }, [watch("rpAmount")]);

  const convertToFCON =
    typeof rate === "number" && rate > 0
      ? typeof rpAmount === "number"
        ? rpAmount / (rate || 1)
        : typeof rpAmount === "string"
        ? parseInt(rpAmount) / (rate || 1)
        : 0
      : undefined;
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    if (!data?.rpAmount || isNaN(+data?.rpAmount)) {
      throw { message: t("dashboard.redeem.redeem-amount-invalid") };
    }
    if (+data?.rpAmount <= 0) {
      throw { message: t("dashboard.redeem.redeem-equal-zero") };
    }

    const response = await fetch(`/api/user/convert-rp-to-usdc`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
    });
    if (!response.ok) {
      const d = await response.json();
      throw d;
    }
    return;
  };

  const { run: submitForm, loading } = useRequest(onSubmit, {
    manual: true,
    onSuccess: async () => {
      await sleep(500);
      setIsLoading(false);
      toastSuccess(t("dashboard.redeem.redeem-success"));
      reset();
      try {
        // const req = await fetch("/api/user/get-info", {
        //   method: "GET",
        // });
        // const data: any = await req.json();
        // if (data?.data) {
        //   const newSession: any = {
        //     ...session,
        //     user: data?.data,
        //   };
        //   dispatch(setUserSession(newSession));
        // }
        await sleep(2000);
        dispatch(setUpdatedAt(Date.now()));
      } catch (err: any) {}
    },
    onError(e: any) {
      setIsLoading(false);
      // toastError(
      //   e?.detail?.[0]?.msg || e?.message == "insufficient_rp_balance"
      //     ? t("dashboard.redeem.insufficient_rp_balance")
      //     : e?.message === "maxium_amount_is_1000_per_week"
      //       ? t("dashboard.redeem.redeem-maximum")
      //       : e?.message ?? t("dashboard.redeem.redeem-failed"),
      // );
      toastError(
        e?.detail?.[0]?.msg || e?.message == "insufficient_rp_balance"
          ? t("dashboard.redeem.insufficient_rp_balance")
          : e?.message ?? t("dashboard.redeem.redeem-failed"),
      );
      const inputString = e.message as string;
      const keywords = ["rpAmount"];
      const keywordRegex = new RegExp(keywords.join("|"), "i");

      const matches = inputString.match(keywordRegex);
      const foundKeyword = matches ? matches[0] : null;

      setError(`root`, {
        message: `errors.exists.${foundKeyword}`,
      });
    },
  });

  return (
    <div className="col-span-12 font-aeonikPro">
      <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-[10px] bg-gray1 md:grid-cols-2">
        <div className="h-full min-h-[635px] w-full bg-[url('/images/Dashboard/redeem_bg.jpg')] bg-cover">
          &nbsp;
        </div>
        <form
          className="flex flex-col justify-between px-8 py-9"
          autoComplete="redeem-now"
          onSubmit={handleSubmit(submitForm)}
        >
          <div>
            <div className="mb-10 flex items-center justify-between gap-2">
              <div className="text-[28px] font-medium leading-[normal]">
                <Translation text="dashboard.redeem.redeem-your-rp" />
              </div>
              <div className="flex gap-3">
                <div className="flex h-[36px] items-center gap-2 rounded-[10px] bg-gray2 p-[7px]">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.12]">
                    <SpaceFalconIcon className="h-[14px] w-[7px]" />
                  </div>
                  <div className="font-bold">
                    {session?.user?.usdc_balance ?? 0}
                  </div>
                </div>
                <div className="flex h-[36px] items-center gap-2 rounded-[10px] bg-gray2 p-[7px]">
                  <div>
                    <Image src={RPIcon} alt="RP" className="h-5 w-5" />
                  </div>
                  <div className="font-bold">
                    {session?.user?.balances.rp_balance ?? 0}
                  </div>
                </div>
              </div>
            </div>

            <RedeemInput
              name="rpAmount"
              placeholder={t("dashboard.redeem.enter-your-redeem")}
              prefixText="RP"
              icon={<Image src={RPIcon} alt="RP" className="h-6 w-6" />}
              register={register}
            />

            <RedeemInput
              name="fconAmount"
              value={convertToFCON?.toFixed(2)}
              placeholder={t("dashboard.redeem.received-fcon")}
              prefixText="FCON"
              icon={
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.12]">
                  <SpaceFalconIcon className="h-[14px] w-[7px]" />
                </div>
              }
              register={register}
              readOnly
            />
          </div>

          <div className="text-black">
            <Button
              type="submit"
              className="mt-3 w-full rounded-full px-6 py-3 disabled:opacity-50"
              loading={isLoading || loadingRate}
              disabled={isLoading || loadingRate}
            >
              <Translation text="dashboard.redeem.redeem-now" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RedeemRP;

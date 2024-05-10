import SpinnerIcon from "@/components/shared/icons/spinner";
import { toastError, toastSuccess } from "@/lib/toastify";
import { useRequest } from "ahooks";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { setUpdatedAt } from "store/features/user/userSlice";
import { classNames } from "utils/string";
import StepCard from "./StepCard";
import Translation from "utils/translation";

export default function MissionGameInvitation({
  access_code,
  is_verified,
}: {
  is_verified: boolean;
  access_code?: string;
}) {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    values: {
      invite_code: access_code as string,
    },
  });
  const redeemCode = async (code: string) => {
    const req = await fetch("/api/user/redeem-access-code", {
      method: "POST",
      body: JSON.stringify({
        code,
      }),
    });
    const data = await req.json();
    if (req.status === 200) {
      return data;
    } else {
      throw new Error(t(`errors.${data.message}`));
    }
    // if (data.message === "access_code_already_used") {
    //   throw new Error(t("errors.access_code_already_used"));
    // }
  };

  const { runAsync: runRedeemCode, loading } = useRequest(redeemCode, {
    manual: true,
    onBefore(params) {
      clearErrors("invite_code");
    },
    onSuccess(data, params) {
      if (data?.message === "invalid_access_code") {
        toastError("Invalid Access Code");
        setError("invite_code", {
          type: "invalid_access_code",
        });
      } else {
        toastSuccess("Redeem Successfully!");
      }
    },
    onFinally: () => {
      dispatch(setUpdatedAt(Date.now()));
    },
    onError(e, params) {
      // console.log("err", e.message);
      toastError(e.message);
    },
  });

  const submit = async ({ invite_code }: { invite_code: string }) => {
    const req = await runRedeemCode(invite_code);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full">
      <StepCard
        stepNumber="2"
        content={<Translation text="home.aviatrix.step2" />}
        active={!!access_code}
      >
        <div
          className={classNames(
            "flex h-12 w-full items-center justify-between gap-x-2 rounded-[10px] border border-white/[0.11] px-0 py-[7px] focus-within:border-white/50 lg:px-5 ",
          )}
        >
          {access_code || is_verified ? (
            <>
              <input
                disabled={!!access_code || !is_verified}
                type="text"
                className="w-full border-none bg-transparent p-0 placeholder:text-[15px] placeholder:font-medium placeholder:text-white placeholder:opacity-20 focus:ring-0 max-lg:placeholder:pl-2 lg:w-fit "
                placeholder={t("home.aviatrix.invite-code")}
                {...register("invite_code")}
              />

              {!access_code ? (
                <button
                  disabled={!!access_code || !is_verified}
                  type="submit"
                  className="text-[15px] font-medium text-fcon max-lg:mr-2"
                >
                  {loading && <SpinnerIcon className="h-5 w-5" />}
                  <span className="uppercase">
                    <Translation text="button.submit" />
                  </span>
                </button>
              ) : null}
            </>
          ) : (
            <button type="button" className="w-full text-center">
              <Translation text="home.aviatrix.submit-invite" />
            </button>
          )}
        </div>
      </StepCard>
    </form>
  );
}

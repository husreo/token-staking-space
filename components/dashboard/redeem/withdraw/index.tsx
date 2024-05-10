"use client";

import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "store";

const WithdrawReward = () => {
  const { session } = useSelector((state: RootState) => state.user);

  const t = useTranslations();
  const translate = (text: string) => t(`dashboard.redeem.${text}`);
  return (
    <div className="col-span-12 flex flex-col gap-6 rounded-2xl bg-[#181C1B] px-5 py-6 lg:col-span-6">
      <div>
        <p className="text-[28px] font-bold text-white">
          {translate("convert")}
        </p>
        <p className="text-gray6">{translate("daily-limit")} 10,000 RP</p>
      </div>

      {!!session ? (
        <div className="mt-5 rounded-[10px] ">
          {/* {isVerifiedEmail && isPrimaryWalletSet ? (
            <Claimbox
              maxRP={
                session?.user?.rp_balance > 0 ? session.user.rp_balance : 1
              }
            />
          ) : (
            <div>
              <p className="mb-5 text-white">{translate("finish-step")}</p>
              <p
                className={classNames(
                  "text-sm",
                  isVerifiedEmail ? "text-green-500" : "text-red-500",
                )}
              >
                {translate("verified-email")}
              </p>
              <p
                className={classNames(
                  "text-sm",
                  isPrimaryWalletSet ? "text-green-500" : "text-red-500",
                )}
              >
                {translate("purchase-package")}
              </p>
            </div>
          )} */}
        </div>
      ) : (
        <div className="mt-5 text-white"></div>
      )}
    </div>
  );
};

export default WithdrawReward;

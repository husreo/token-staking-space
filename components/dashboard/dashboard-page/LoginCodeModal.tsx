"use client";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setShowNDModalLoginCode } from "store/features/newDashboard/newDashboardSlice";
import Drawer from "../../shared/drawer";
import CopyIcon from "@/components/shared/icons/copy";
import CheckIcon from "@/components/shared/icons/check-icon";
import dayjs from "dayjs";
import { setUpdatedAt } from "store/features/user/userSlice";
import LoaderSpinner from "@/components/layout/LoadingSpinner";

interface IsCopiedType {
  [code: string]: boolean;
}
interface CodeProp {
  code: string;
  expired_at: string;
  nft_id: string;
  status: string;
}
const importantData = [
  "YOU HAVE 2 HOURS EACH CODE TO SCORE IN THE CHAMPIONSHIP GAME MODE SINCE YOU STARTED IN THE GAME",
  "EACH CODE EQUAL TO A TICKET",
  "USED CODES CAN’T BE REFUND",
  "GET MORE CODE BY REDEEM NFT TO TICKET",
  "TIME STARTS COUNTING ONCE YOU LOGIN TO THE GAME FOR EACH CODE",
];

const LoginCodeModal = () => {
  const dispatch = useDispatch();
  const { session } = useSelector((state: RootState) => state.user);
  const [isCopied, setIsCopied] = useState<IsCopiedType>({});
  const [isLoading, setIsLoading] = useState(false);
  const { showLoginCode } = useSelector(
    (state: RootState) => state.newDashboard,
  );
  const closeModal = () => dispatch(setShowNDModalLoginCode(false));
  const handleClickCopy = (code: string) => {
    try {
      navigator.clipboard.writeText(code || "");
      setIsCopied((prev) => ({ ...prev, [code]: true }));
      setTimeout(() => {
        setIsCopied((prev) => ({ ...prev, [code]: false }));
      }, 2000);
    } catch (err) {}
  };

  // const [targetDate, setTargetDate] = useState(0);
  // useEffect(() => {
  //   const inUseObject = session?.user.login_codes?.detail_code.find(
  //     (item) => item.status === "IN_USE",
  //   );
  //   if (inUseObject && inUseObject.expired_at) {
  //     const expiredAtInMilliseconds = dayjs(inUseObject.expired_at).valueOf();
  //     setTargetDate(expiredAtInMilliseconds);
  //   }
  // }, [session]);

  // const [_countdown, formattedRes] = useCountDown({
  //   targetDate,
  // });
  // const { hours, minutes, seconds } = formattedRes;

  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    session?.user?.login_codes?.detail_code.forEach((item: CodeProp) => {
      if (item.status === "IN_USE" && item.expired_at) {
        const targetDate = dayjs(item.expired_at).valueOf();
        const now = dayjs().valueOf();
        const countdownTime = targetDate > now ? targetDate - now : 0;

        setCountdowns((prevCountdowns) => ({
          ...prevCountdowns,
          [item.code]: countdownTime,
        }));
      }
    });
  }, [session]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((currentCountdowns) => {
        const newCountdowns = { ...currentCountdowns };
        let shouldDispatch = false;
        Object.keys(newCountdowns).forEach((code) => {
          if (newCountdowns[code] > 1000) {
            newCountdowns[code] -= 1000;
          } else if (newCountdowns[code] !== 0) {
            newCountdowns[code] = 0;
            shouldDispatch = true;
          }
        });

        if (shouldDispatch) {
          setIsLoading(true);
          dispatch(setUpdatedAt(Date.now()));
          setIsLoading(false);
        }
        return newCountdowns;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const [sortedCodeData, setSortedCodeData] = useState<CodeProp[]>([]);

  useEffect(() => {
    const detailCode = (session?.user?.login_codes?.detail_code || []).slice();

    const sorted = detailCode.sort((a, b) => {
      if (a.status === "IN_USE" && b.status !== "IN_USE") {
        return -1;
      } else if (a.status !== "IN_USE" && b.status === "IN_USE") {
        return 1;
      }
      return 0;
    });

    setSortedCodeData(sorted);
  }, [session]);
  return (
    <Fragment>
      <Drawer
        title="AVIATRIX LOGIN CODE"
        isOpen={showLoginCode}
        closeModal={closeModal}
        width={662}
      >
        <div className="relative flex h-full flex-col">

          <div className="px-9 pt-9">
            {isLoading && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
                <LoaderSpinner width={20} />
              </div>
            )}
            <div className="flex flex-col border border-[#FF3124] bg-[rgba(255,49,36,0.20)] p-6">
              <p className="text-sm font-bold leading-5">IMPORTANT</p>
              <ul className="list-none pl-2">
                {importantData.map((item, index) => {
                  return (
                    <li key={`noti-${index}`} className="flex">
                      <div className="text-base leading-6">•</div>
                      <span className="ml-3 flex-1 text-base leading-6">
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className=" flex flex-col gap-2 pt-9">
              <div className="flex h-[72px] w-full items-center justify-between text-2xl font-medium leading-8 opacity-50">
                <div className="w-[400px] pl-6">CODE</div>
                <div className="w-full truncate">TIME LEFT</div>
                <div className="w-[150px] pr-6">ACTION</div>
              </div>
              <div className="flex w-full flex-col gap-2 overflow-scroll">
                {sortedCodeData.map((item, index) => {
                  return (
                    <div
                      key={`${item.code}-${index}`}
                      className="flex h-[72px] w-full items-center justify-between border border-white/[0.15] bg-white/[0.08] text-2xl font-medium leading-8"
                    >
                      <div className="w-[400px] truncate pl-6">
                        <span>{item.code}</span>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-x-2"></div>
                        <div className="flex items-center">
                          <span>
                            {item.status === "IN_USE"
                              ? formatCountdown(countdowns[item.code] || 0)
                              : "00:00:00"}
                          </span>
                        </div>
                      </div>
                      <div className="flex w-[150px] justify-end pr-6">
                        <button onClick={() => handleClickCopy(item.code)}>
                          {isCopied[item.code] ? (
                            <CheckIcon className="h-8 w-8 text-green-600" />
                          ) : (
                            <CopyIcon className="h-8 w-8 hover:opacity-50" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default LoginCodeModal;

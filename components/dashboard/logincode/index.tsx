"use client";

import Button from "@/components/shared/button";
import APKIcon from "@/components/shared/icons/apk";
import AppleIcon from "@/components/shared/icons/apple";
import EpicIcon from "@/components/shared/icons/epic-icon";
import WindowPC from "@/components/shared/icons/window-pc";
import { toastError } from "@/lib/toastify";
import { useCountDown, useRequest } from "ahooks";
import {
  AVIATRIX_DOWNLOAD_EPIC,
  AVIATRIX_DOWNLOAD_MAC,
  AVIATRIX_DOWNLOAD_PC,
  GALAXY_DOWNLOAD_APK,
} from "constants/global";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setUpdatedAt } from "store/features/user/userSlice";
import { addLeadingZero } from "utils/string";

const LoginCode = () => {
  const [targetDate, setTargetDate] = useState<Dayjs | undefined>();
  const [_t, formatRes] = useCountDown({
    targetDate: targetDate,
    onEnd() {
      console.log("onend");
      run();
    },
  });
  const { days, hours, minutes, seconds } = formatRes;
  const dispatch = useDispatch();
  const { session } = useSelector((state: RootState) => state.user);
  const access_code = session?.user?.login_code;

  const handleClickCopy = () => {
    try {
      navigator.clipboard.writeText(access_code || "");
    } catch (err) {}
  };

  const handleIssueCode = async () => {
    const req = await fetch("/api/user/get-issued-code", {
      method: "POST",
    });
    if (req.ok && req.status === 200) {
      return true;
    }
    return false;
  };

  const { run, loading } = useRequest(handleIssueCode, {
    onSuccess: () => {
      dispatch(setUpdatedAt(Date.now()));
    },
    onError: (e) => {
      toastError("Something went wrong, please try again!");
    },
    manual: true,
  });

  // useEffect(() => {
  //   if (access_code?.valid_to) {
  //     setTargetDate(dayjs(access_code?.valid_to));
  //   } else {
  //     setTargetDate(undefined);
  //   }
  // }, [access_code]);

  return (
    <div className="mx-auto w-full max-w-[800px] rounded-[20px] bg-gray1 py-14 font-aeonikPro text-white">
      <div className="mx-auto w-full max-w-[438px]">
        <div className="relative mx-auto mb-11 h-[130px] w-[130px] overflow-hidden rounded-[20px] bg-gray2">
          <Image src="/images/game_icon.jpeg" alt="" fill />
        </div>
        <p className="mb-4 px-12 text-center text-2xl font-medium">
          Copy your Login Code to access the game.
        </p>
        <p className="mb-9 px-8 text-center text-[15px] leading-[21px] text-white/[0.78]">
          The new code will be automatically generated every 30 days. Your game
          progress won&apos;t be affected.
        </p>
        <div className="mb-9">
          <div className="mb-3 rounded-lg border border-white/20 px-[14px] py-2">
            <p className="text-[11px] leading-normal text-gray6">Account</p>
            <p className="leading-[22px]">{session?.user?.username}</p>
          </div>
          <div className="rounded-lg border border-white/20 px-[14px] py-2">
            <p className="text-[11px] leading-normal text-gray6">Login Code</p>
            <div className="flex items-center justify-between">
              <p className="leading-[22px]">{access_code}</p>
              <button
                onClick={handleClickCopy}
                className="duration-50 group text-white/40 transition-all ease-linear hover:text-white active:text-white/40"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                  className="group-hover:-translate-x-[1px]"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4.139 3.939V2.317c0-.548.438-.99.986-.99h8.556c.544 0 .986.439.986.986v8.556a.988.988 0 01-.99.986h-1.643"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.87 4.139H2.316a.986.986 0 00-.99.986v8.556c0 .544.439.986.987.986h8.555a.988.988 0 00.987-.99V5.122a.989.989 0 00-.99-.99l.007.007z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {session?.user?.username && (
          <div className="mb-16 flex justify-center">
            <Button
              onClick={run}
              loading={loading}
              className="h-14 w-[224px] rounded-[100px] text-black"
            >
              Generate Code
            </Button>
          </div>
        )}
        <div className="flex flex-col items-center justify-between rounded bg-white/[0.08] p-3 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="relative h-[74px] w-[74px] overflow-hidden rounded bg-white/10">
              <Image src="/images/game_icon.jpeg" alt="" fill />
            </div>
            <div className="flex flex-col gap-[10px]">
              <p>Download Now</p>
              <div className="flex items-center gap-4">
                <Link target="_blank" href={AVIATRIX_DOWNLOAD_EPIC}>
                  <EpicIcon className="w-5" />
                </Link>
                <Link target="_blank" href={GALAXY_DOWNLOAD_APK}>
                  <APKIcon className="w-5" />
                </Link>
                <Link target="_blank" href={AVIATRIX_DOWNLOAD_MAC}>
                  <AppleIcon className="w-5" />
                </Link>
                <Link target="_blank" href={AVIATRIX_DOWNLOAD_PC}>
                  <WindowPC className="w-5" />
                </Link>
              </div>
            </div>
          </div>
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              fill="none"
              viewBox="0 0 20 21"
            >
              <path
                fillRule="evenodd"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.995 12.5l-6-6H7.99V1h4v5.495h4l-6 6 .005.005z"
                clipRule="evenodd"
              ></path>
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M19 16.5H1M15 20H5"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCode;

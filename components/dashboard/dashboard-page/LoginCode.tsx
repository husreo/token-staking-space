"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { classNames, shortAddress } from "utils/string";
import { signOut } from "next-auth/react";
import { setShowNDModalLoginCode } from "store/features/newDashboard/newDashboardSlice";
import { useRouter } from "next/navigation";
export default function LoginCode() {
  const { session } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { push } = useRouter();
  return (
    <div className="flex h-full w-full flex-col gap-12 border-b border-l border-r border-white/[0.15] px-9 pb-[22px] pt-9 font-normal text-white lg:border-t">
      <div>
        <p className="opacity-60">Welcome</p>
        {session?.user.public_id ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-2xl font-bold leading-8">
              {shortAddress(session?.user?.username) || ""}
            </span>
            <button
              onClick={() =>
                signOut({
                  redirect: false,
                })
              }
              className="flex items-center justify-center border border-[#FF3124] bg-[rgba(255,49,36,0.40)] px-3 py-[7px] hover:opacity-80 max-[375px]:w-full lg:w-full xl:w-fit"
            >
              DISCONNECT
            </button>
          </div>
        ) : (
          <p className="text-2xl font-bold leading-8">Guest</p>
        )}
      </div>
      <div className="border border-white/[0.15] text-sm">
        <div className="p-6 text-sm font-medium leading-6">
          <p>AVIATRIX IS FREE TO PLAY IN OFFLINE MODE</p>
          <p>PLAY TO EARN MODEL REQUIRES NFT PURCHASE</p>
        </div>
        <div className="flex items-center max-[375px]:flex-col lg:flex-col 2xl:flex-row">
          {!!session?.user.public_id && (
            <div
              onClick={() => dispatch(setShowNDModalLoginCode(true))}
              className="w-full cursor-pointer bg-white/[0.03] p-6 text-center"
            >
              GET GAME LOGIN CODE
            </div>
          )}

          <button
            onClick={() => push("/#download-to-play")}
            className={classNames(
              "flex items-center justify-center truncate border-r-2 border-white bg-white/[0.14] p-6 transition-all duration-200 ease-linear hover:bg-white/20",
              !!session?.user.public_id
                ? "w-[250px] max-[375px]:w-full lg:w-full 2xl:w-[250px]"
                : "w-full",
            )}
          >
            DOWNLOAD GAME
          </button>
        </div>
      </div>
    </div>
  );
}

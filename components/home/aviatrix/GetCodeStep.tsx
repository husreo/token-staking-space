"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import AviatrixArrowIcon from "@/components/shared/icons/aviatrix-arrow";
import MissionLogin from "./MissionLogin";
import MissionGameInvitation from "./MissionGameInvitation";
import MissionDownload from "./MissionDownload";
import Translation from "utils/translation";
export default function GetCodeStep() {
  const { session } = useSelector((state: RootState) => state.user);
  return (
    <div className="pt-[50px]">
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-[15px] uppercase">
          <Translation text="home.aviatrix.get-invite-code" />
        </p>
        <AviatrixArrowIcon className="mt-3 h-4 w-[60px]" />
      </div>
      <div className="flex gap-x-6 gap-y-2 pt-6 max-[950px]:flex-wrap">
        <MissionLogin
          active={!!session?.user?.username}
        />
        {/* <MissionGameInvitation
          access_code={session?.user.access_code}
          is_verified={session?.user.is_verified}
        /> */}
        <MissionDownload active={!!session?.user.login_code} />
      </div>
    </div>
  );
}

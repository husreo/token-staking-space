import CheckIcon from "@/components/shared/icons/check-icon";
import ClockIcon from "@/components/shared/icons/clock";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { WhiteListMissionWrapper } from "./common";

const InviteFriendsMission = ({ isActive = false }: { isActive?: boolean }) => {
  const [isCopy, setIsCopy] = useState(false);
  const t = useTranslations();
  const translate = (text: string) => t(`aviatrix.${text}`);
  const { session } = useSelector((state: RootState) => state.user);
  const refCode = "";
  const isLoggedIn = !!session?.access_token;
  const handleClickCopy = () => {
    const url =
      process.env.NEXT_PUBLIC_ENV === "testnet"
        ? "https://staging.spacefalcon.com"
        : "https://spacefalcon.com";
    try {
      navigator.clipboard
        .writeText(`${url}/?referral=${refCode}`)
        .then(function () {
          setIsCopy(true);
        });
    } catch (err) {
      setIsCopy(false);
    }
  };
  return (
    <WhiteListMissionWrapper
      isLoggedIn={isLoggedIn}
      isSetup={isActive}
      className="flex h-full min-h-[200px] flex-col justify-between"
    >
      <div className="relative flex flex-col gap-3">
        <div className="mx-auto flex h-fit items-center gap-1 rounded-[22px] bg-white/[0.13] px-[6px] py-1">
          {isActive ? (
            <CheckIcon className="w-4 text-fcon" />
          ) : (
            <ClockIcon className="w-4" strokeColor="#ffd774" />
          )}

          <p className="font-aeonikMono text-[13px] capitalize">
            {isActive ? translate("done") : `0/1 ` + translate("invited")}
          </p>
        </div>
        <p className="text-center leading-7">
          {translate("mission-invite-friends")}
        </p>
      </div>
      <button
        onClick={handleClickCopy}
        className="z-10 flex h-12 w-full items-center justify-center rounded-[10px] border border-white/[0.11] text-[15px] font-medium"
      >
        {isCopy
          ? translate("clicked-btn-share-invite")
          : translate("btn-share-invite")}
      </button>
    </WhiteListMissionWrapper>
  );
};

export default InviteFriendsMission;

import CheckIcon from "@/components/shared/icons/check-icon";
import ClockIcon from "@/components/shared/icons/clock";
import SpinnerIcon from "@/components/shared/icons/spinner";
import { useTranslations } from "next-intl";
import { WhiteListMissionWrapper } from "./common";
import { useSelector } from "react-redux";
import { RootState } from "store";

const FollowSocialsMission = ({
  isActive = false,
  runFollowSocials,
  loading,
}: {
  runFollowSocials: () => void;
  loading: boolean;
  isActive?: boolean;
}) => {
  const { session } = useSelector((state: RootState) => state.user);
  const isLoggedIn = !!session?.access_token;
  const t = useTranslations();
  const translate = (text: string) => t(`aviatrix.${text}`);
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
            {isActive ? translate("done") : translate("pending")}
          </p>
        </div>
        <p className="text-center leading-7">
          {translate("mission-follow-social")}
        </p>
      </div>
      <button
        disabled={isActive}
        onClick={runFollowSocials}
        className="z-10 flex h-12 w-full items-center justify-center gap-1 rounded-[10px] border border-white/[0.11] text-[15px] font-medium"
      >
        {loading ? <SpinnerIcon className="w-4" /> : null}
        {isActive
          ? translate("btn-done-follow-social")
          : translate("btn-follow-social")}
      </button>
    </WhiteListMissionWrapper>
  );
};

export default FollowSocialsMission;

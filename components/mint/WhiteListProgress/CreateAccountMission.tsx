import CheckIcon from "@/components/shared/icons/check-icon";
import ClockIcon from "@/components/shared/icons/clock";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { WhiteListMissionWrapper } from "./common";

const CreateAccountMission = ({ isActive = false }: { isActive?: boolean }) => {
  const { session } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const isLoggedIn = !!session?.access_token;
  const isSetup = !!session?.user?.username;

  const t = useTranslations();
  const translate = (text: string) => t(`aviatrix.${text}`);

  return (
    <WhiteListMissionWrapper
      isLoggedIn={isLoggedIn}
      isSetup={isSetup}
      className="flex h-full min-h-[200px] flex-col justify-between"
    >
      <div className="relative flex flex-col gap-3">
        {!isLoggedIn ? (
          <div className="mx-auto flex h-fit items-center gap-1 rounded-[22px] bg-white/[0.13] px-[6px] py-1">
            <ClockIcon className="w-4" strokeColor="#ffd774" />
            <p className="font-aeonikMono text-[13px] uppercase">
              {translate("unlogged-in")}
            </p>
          </div>
        ) : (
          <div className="mx-auto flex h-fit items-center gap-1 rounded-[22px] bg-white/[0.13] px-[6px] py-1">
            {isSetup ? (
              <CheckIcon className="w-4 text-fcon" />
            ) : (
              <ClockIcon className="w-4" strokeColor="#ffd774" />
            )}

            <p className="font-aeonikMono text-[13px] capitalize">
              {isSetup ? translate("done") : translate("pending")}
            </p>
          </div>
        )}
        <p className="text-center leading-7">
          {translate("mission-create-account")}
        </p>
      </div>
      {session?.user ? (
        <div className="z-10 flex h-12 w-full items-center justify-between rounded-[10px] border border-[#00ffc22e] bg-[#00ffc217] px-5 font-aeonikPro">
          <p className="flex-1 font-medium">{translate("logged-in-as")}</p>
          <div className="flex items-center gap-1">
            <Image
              src={"/images/mock_nft.png"}
              alt="avatar"
              width={20}
              height={20}
              className="rounded-full"
            />
            <p className="max-w-[80px] truncate font-medium">
              {session?.user?.username}
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="z-10 flex h-12 w-full items-center justify-center rounded-[10px] border border-white/[0.11] text-[15px] font-medium"
        >
          {translate("login")}
        </button>
      )}
    </WhiteListMissionWrapper>
  );
};

export default CreateAccountMission;

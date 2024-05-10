import BackgroundModalEcosystem from "./BackgroundModalEcosystem";
// import TextInput from "@/components/shared/input/TextInput";
import Button from "@/components/shared/button";
import { DownloadIconGreen } from "@/components/shared/icons";
import AppleIcon from "@/components/shared/icons/apple";
import EpicIcon from "@/components/shared/icons/epic-icon";
import SpinnerIcon from "@/components/shared/icons/spinner";
import WindowPC from "@/components/shared/icons/window-pc";
import useResentEmail from "@/lib/hooks/use-resent-email";
import { useCountDown } from "ahooks";
import {
  AVIATRIX_DOWNLOAD_EPIC,
  AVIATRIX_DOWNLOAD_MAC,
  AVIATRIX_DOWNLOAD_PC,
} from "constants/global";
import { Dayjs } from "dayjs";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AviatrixBG from "public/images/game-icon.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOnboardingModal } from "store/features/user/userSlice";
import { sleep } from "utils/promise";
import { classNames } from "utils/string";
import Translation from "utils/translation";

export default function ModalEcosystem({ session }: { session?: Session }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [targetDate, setTargetDate] = useState<Dayjs | undefined>();
  const { resentAt, isResent, loading, resentEmail, resetResentStatus } =
    useResentEmail();

  const [_countdown, formatCountdown] = useCountDown({
    targetDate,
    onEnd() {
      resetResentStatus();
    },
  });

  const { minutes, days, hours } = formatCountdown;

  const handleGotoDashboard = async () => {
    dispatch(setOnboardingModal(false));
    await sleep(120);
    router.push("/dashboard");
  };

  useEffect(() => {
    setTargetDate(resentAt);
  }, [resentAt]);

  return (
    <div
      suppressHydrationWarning
      className="flex w-screen items-center justify-center px-5 sm:w-fit"
    >
      <div className="relative h-full w-full rounded-[20px] border border-white/[0.12] bg-gray1 font-aeonikPro font-normal text-white max-lg:max-h-screen max-lg:overflow-y-scroll sm:h-[662px] sm:w-[598px]">
        <BackgroundModalEcosystem className="absolute bottom-0 left-0 right-0 top-0 h-[381px] w-full rounded-[20px]" />
        <div className="relative z-20 p-10 max-[320px]:p-3 sm:px-20 sm:py-[76px]">
          <div className="flex flex-col items-center gap-4">
            <Button className="w-full rounded-bl-xl rounded-br-[4px] rounded-tl-[4px] rounded-tr-xl px-3 py-[6px] sm:w-fit">
              <h1 className="text-center text-[13px] font-normal uppercase leading-[18px] text-gray0">
                <Translation text="dashboard.modal-ecosystem.title" />
              </h1>
            </Button>
            <p className="w-full text-center text-2xl font-medium sm:w-[362px]">
              <Translation text="dashboard.modal-ecosystem.sub-title" />
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:mt-16">
            <div
              className={classNames(
                "min-h-[56px] w-full rounded-lg border border-white/20 px-[14px] py-2",
              )}
            >
              <p className="truncate text-[11px] text-gray6">Space Falcon ID</p>
              {session?.user?.username ? (
                <div className="flex items-center justify-between">
                  <p className="truncate text-base leading-[22px]">
                    {session?.user?.username ?? ""}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(session?.user?.username);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 transition-all duration-100 ease-linear hover:opacity-80 active:opacity-90"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z"
                        clipRule="evenodd"
                      />
                      <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z" />
                      <path d="M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
            <div
              className={classNames(
                "w-full rounded-lg border-[2px] px-[14px] py-2",
                session?.user?.is_verified
                  ? "border-fcon text-fcon"
                  : "border-red-500 text-red-500",
              )}
            >
              <p className="truncate text-[11px] text-gray6">Email</p>
              <div className="flex items-center justify-between">
                <p className="truncate text-base leading-[22px]">
                  {session?.user.email ?? ""}
                </p>
                {!session?.user?.is_verified ? (
                  isResent === "sent" ? (
                    <button className="font-dinPro text-sm font-medium text-red-500">
                      {days}d {hours}h {minutes}m
                    </button>
                  ) : session?.user?.username ? (
                    <button
                      onClick={resentEmail}
                      className="text-sm font-medium text-red-500"
                    >
                      {loading ? (
                        <SpinnerIcon className="h-6 w-6 text-white" />
                      ) : (
                        "Verify"
                      )}
                    </button>
                  ) : null
                ) : (
                  <p className="text-fcon">Verified</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-7 flex flex-col items-center justify-between gap-2 sm:mt-10 sm:flex-row">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Image src={AviatrixBG} alt="" width={74} height={74} />
              <div className="flex flex-col items-center justify-center gap-[10px] sm:items-start">
                <p className="text-center text-sm leading-4 tracking-[-0.14px] text-shadow-[0px_0px_21.231px_rgba(0,0,0,0.25)] sm:w-[267px] sm:text-left">
                  <Translation text="dashboard.modal-ecosystem.description" />
                </p>
                <div className="flex w-fit justify-between gap-2">
                  <a
                    href={AVIATRIX_DOWNLOAD_EPIC}
                    target="_blank"
                    className="flex h-5 w-5 cursor-pointer items-center justify-center"
                  >
                    <EpicIcon className="h-[14px] w-3" />
                  </a>
                  <a
                    href={AVIATRIX_DOWNLOAD_MAC}
                    target="_blank"
                    className="flex h-5 w-5 cursor-pointer items-center justify-center"
                  >
                    <AppleIcon className="h-[17px] w-[14px]" />
                  </a>
                  <a
                    href={AVIATRIX_DOWNLOAD_PC}
                    target="_blank"
                    className="flex h-5 w-5 cursor-pointer items-center justify-center"
                  >
                    <WindowPC className="h-[15px] w-[15px]" />
                  </a>
                </div>
              </div>
            </div>
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10">
              <DownloadIconGreen className="h-[19px] w-[18px]" />
            </button>
          </div>
          {session?.user?.is_verified && (
            <button
              onClick={() => {
                handleGotoDashboard();
              }}
              className="mt-8 h-14 w-full rounded-[100px] bg-white/10 text-[15px] font-medium backdrop-blur-[3px] transition-all delay-100 duration-150 ease-in hover:bg-white/30 sm:mt-12"
            >
              <Translation text="button.go-dashboard" />
            </button>
          )}
          {session?.user.username ? null : (
            <button
              onClick={() => {
                router.push("/new-user");
              }}
              className="mt-8 h-14 w-full rounded-[100px] bg-white/10 text-[15px] font-medium backdrop-blur-[3px] transition-all delay-100 duration-150 ease-in hover:bg-white/30 sm:mt-12"
            >
              <Translation text="new-user.no-profile" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

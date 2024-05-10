"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";

import Button from "@/components/shared/button";
import { Google } from "@/components/shared/icons";
import CloseIcon from "@/components/shared/icons/CloseIcon";
import { toastSuccess, toastError } from "@/lib/toastify";
import { setUpdatedAt } from "store/features/user/userSlice";
import { classNames } from "utils/string";

import DiscordImage from "public/images/discord.svg";
import TelegramImage from "public/images/telegram.svg";
import Translation from "utils/translation";

const ConnectAcountComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-12 w-full items-center justify-between rounded-[65px] border border-white/10 py-4 pl-4 pr-2">
      {children}
    </div>
  );
};
const TitleConnect = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        "flex items-center text-base font-normal leading-[22px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID || ("" as string);
export const botName =
  process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || ("" as string);
export const originUrl =
  process.env.NEXT_PUBLIC_TELEGRAM_ORIGIN_URL || ("" as string);
export const returnUrl =
  process.env.NEXT_PUBLIC_TELEGRAM_RETURN_URL || ("" as string);

const telegramQueryString: Record<string, string> = {
  bot_id: botId,
  embed: "1",
  request_access: "write",
  origin: originUrl, // ngrok http 3000
  return_to: returnUrl,
};

const CONNECT_TELEGRAM_API = "/api/social-connect/telegram";
const CONNECT_DISCORD_API = "/api/social-connect/discord";
const DISCONNECT_DISCORD_API = "/api/social-connect/discord/disconnect";
const DISPLAY_SOCIAL_API = "/api/social-connect/display-setting";

export default function ConnectAccount() {
  const [loading, setLoading] = useState(false);
  const [isDisplaySocial, setIsDisplaySocial] = useState(false);
  const [codeQueryState, setCodeQueryState] = useState<string | null>(null);
  const { session } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const params = useSearchParams();
  const discordID = session?.user?.socials?.discord?.uid;
  const telegramID = session?.user?.socials?.telegram?.uid;
  const discordUsername = session?.user?.socials?.discord?.username;
  const telegramUsername = session?.user?.socials?.telegram?.username;

  useEffect(() => {
    dispatch(setUpdatedAt(Date.now()));
  }, []);

  useEffect(() => {
    setIsDisplaySocial(!!session?.user?.is_display_social);
  }, [session?.user?.is_display_social]);

  const codeQuery = useMemo(() => {
    return params.get("code");
  }, [params]);

  useEffect(() => {
    setCodeQueryState(codeQuery);
  }, [codeQuery]);

  useEffect(() => {
    setTimeout(async () => {
      if (codeQueryState) {
        const response = await fetch(
          `${CONNECT_DISCORD_API}?code=${codeQuery}`,
          {
            method: "GET",
          },
        );
        const responseData = await response.json();
        if (!responseData?.error) {
          dispatch(setUpdatedAt(Date.now()));
          toastSuccess("Connect discord success");
        } else {
          toastError(`Connect discord error: ${responseData?.data?.message}`);
        }
        navigate.replace("/account-setting", undefined);
      }
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeQueryState]);

  const handleConnectTelegram = async () => {
    const searchParams = new URLSearchParams(telegramQueryString);
    // navigate.push(`https://oauth.telegram.org/auth?${searchParams.toString()}`);
    window.open(
      `https://oauth.telegram.org/auth?${searchParams.toString()}`,
      "TelegramAuth",
      "toolbar=no,status=no,width=530,height=430",
    );
  };

  const handleDisconnectTelegram = async () => {
    if (session && telegramID) {
      try {
        setTimeout(async () => {
          const response = await fetch(CONNECT_TELEGRAM_API, {
            method: "POST",
            body: JSON.stringify({
              id: `${telegramID}`,
              username: `${telegramUsername}`,
            }),
          });
          if (response.ok) {
            dispatch(setUpdatedAt(Date.now()));
            toastSuccess("Disconnect telegram success");
          } else {
            toastSuccess("Disconnect telegram error");
          }
        }, 200);
      } catch (error) {}
    }
  };

  const handleDisconnectDiscord = async () => {
    if (session && discordID) {
      try {
        setTimeout(async () => {
          const response = await fetch(DISCONNECT_DISCORD_API, {
            method: "POST",
            body: JSON.stringify({
              id: `${discordID}`,
              username: `${discordUsername}`,
            }),
          });
          if (response.ok) {
            dispatch(setUpdatedAt(Date.now()));
            toastSuccess("Disconnect discord success");
          } else {
            toastSuccess("Disconnect discord error");
          }
        }, 200);
      } catch (error) {}
    }
  };

  const handleConnectDiscord = async () => {
    setLoading(true);
    navigate.push(process.env.NEXT_PUBLIC_DISCORD_AUTHORIZE_URL || "");
  };

  const handleChangeDisplaySocial = (e: any) => {
    setIsDisplaySocial(e?.target?.checked);
    try {
      setTimeout(async () => {
        const response = await fetch(DISPLAY_SOCIAL_API, {
          method: "POST",
          body: JSON.stringify({
            id: `${discordID}`,
            username: `${discordUsername}`,
          }),
        });
        if (response.ok) {
          dispatch(setUpdatedAt(Date.now()));
          toastSuccess("Successfully!");
        } else {
          toastSuccess("Error occur!");
        }
      }, 200);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col rounded-[20px] bg-gray2 p-5 font-aeonikPro text-white sm:p-12">
      <h1 className="text-2xl font-bold leading-7">
        <Translation text="account-setting.link-to-account.title" />
      </h1>
      <p className="mt-3 text-base font-normal leading-[22px] text-gray7">
        <Translation text="account-setting.link-to-account.description" />
      </p>
      <div className="mt-9 flex h-12 w-full items-center justify-between rounded-[65px] border border-white/10 p-4">
        <div className="flex gap-3">
          <Google className="h-5 w-5" />
          <TitleConnect>Google</TitleConnect>
        </div>
        <div className="bg- flex h-5 w-5 items-center justify-center rounded-full bg-[#2D3130] p-[2px] opacity-50">
          <CloseIcon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-6 sm:flex-row">
        <ConnectAcountComponent>
          <div className="flex gap-3">
            <Image src={TelegramImage} alt="telegram" width={20} height={20} />
            <TitleConnect>
              {!telegramID && <>Telegram</>}
              {session && telegramID && (
                <Link
                  title="Telegram profile"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-fcon"
                  href={
                    telegramUsername
                      ? `https://t.me/${telegramUsername}`
                      : `tg://user?id=${telegramID}`
                  }
                >
                  {telegramUsername ?? telegramID}
                </Link>
              )}
            </TitleConnect>
          </div>
          <div className="relative">
            {session && !telegramID && (
              <Button
                isAnimation={false}
                className="flex h-[32px] items-center justify-center rounded-[42px] px-4 text-[13px] leading-[18px] text-gray0"
                // onClick={handleConnectTelegram}
              >
                <Translation text="account-setting.link-to-account.connect" />
              </Button>
            )}
            {session && telegramID && (
              <Button
                isAnimation={false}
                className="flex h-[32px] items-center justify-center rounded-[42px] px-4 text-[13px] leading-[18px] text-gray0"
                onClick={handleDisconnectTelegram}
              >
                <Translation text="account-setting.link-to-account.disconnect" />
              </Button>
            )}
            <div
              className={classNames(
                "absolute right-0 top-0 z-10 h-[32px] w-[82px] cursor-pointer !overflow-hidden rounded-full",
                session && telegramID
                  ? "pointer-events-none hidden"
                  : "pointer-events-auto !opacity-0",
              )}
            >
              <TelegramLoginButton
                cornerRadius={0}
                dataOnauth={(user: TelegramUser) => {
                  // console.log({ user, session });
                  // console.log("CONNECT_TELEGRAM_API: ", CONNECT_TELEGRAM_API);
                  if (session && !telegramID) {
                    setTimeout(() => {
                      try {
                        setTimeout(async () => {
                          const response = await fetch(CONNECT_TELEGRAM_API, {
                            method: "POST",
                            body: JSON.stringify({
                              id: `${user?.id}`,
                              username: `${
                                user?.username ??
                                user?.first_name ??
                                user?.id ??
                                ""
                              }`,
                            }),
                          });
                          const responseData = await response.json();
                          if (!responseData?.error) {
                            dispatch(setUpdatedAt(Date.now()));
                            console.log("Connect telegram success");
                          } else {
                            console.log(
                              "Connect telegram error: ",
                              responseData?.data?.message,
                            );
                          }
                        }, 200);
                      } catch (error) {}
                    }, 200);
                  }
                }}
                botName={botName}
              />
            </div>
          </div>
        </ConnectAcountComponent>
        <ConnectAcountComponent>
          <div className="flex items-center gap-3">
            <Image src={DiscordImage} alt="discord" width={20} height={20} />

            <TitleConnect>
              {!discordID && <>Discord</>}
              {session && discordID && (
                <Link
                  title="Discord profile"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://discordapp.com/users/${discordID}`}
                  className="hover:text-fcon"
                >
                  {discordUsername ? `${discordUsername}` : `<@${discordID}>`}
                </Link>
              )}
            </TitleConnect>
          </div>
          {session && !discordID && (
            <Button
              isAnimation={false}
              loading={loading}
              onClick={handleConnectDiscord}
              className="flex h-[32px] items-center justify-center rounded-[42px] px-4 text-[13px] leading-[18px] text-gray0"
            >
              <Translation text="account-setting.link-to-account.connect" />
            </Button>
          )}
          {session && discordID && (
            <Button
              isAnimation={false}
              className="flex h-[32px] items-center justify-center rounded-[42px] px-4 text-[13px] leading-[18px] text-gray0"
              onClick={handleDisconnectDiscord}
            >
              <Translation text="account-setting.link-to-account.disconnect" />
            </Button>
          )}
        </ConnectAcountComponent>
      </div>
      <div className="mt-4">
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="check"
          >
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-lightGreen
              bg-transparent text-lightGreen transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4
              before:rounded-full before:bg-lightGreen before:opacity-0 before:transition-opacity
             checked:border-lightGreen checked:bg-lightGreen checked:before:bg-lightGreen hover:before:opacity-10"
              id="check"
              checked={isDisplaySocial}
              onChange={handleChangeDisplaySocial}
            />
            <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
          <label
            className="mt-px cursor-pointer select-none text-white"
            htmlFor="check"
            onChange={handleChangeDisplaySocial}
          >
            <Translation text="account-setting.link-to-account.display-social-info" />
          </label>
        </div>
      </div>
    </div>
  );
}

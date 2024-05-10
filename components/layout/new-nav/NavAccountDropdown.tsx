"use client";
import ArrowRight from "@/components/shared/icons/arrow-right";
import ChevronDownIcon from "@/components/shared/icons/chevron-down";
import PowerIcon from "@/components/shared/icons/power";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setTabDashboardMenuActive } from "store/features/user/userSlice";
import Translation from "utils/translation";
import SwitchLocale from "../SwitchLocale";
interface IProps {
  username?: string;
}

export default function NavAccountDropdown({ username }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const statusLocale = useMemo(() => {
    return pathname.includes("/vn") ? "Vietnamese" : "English";
  }, [pathname]);

  return (
    <Menu as="div">
      {({ open, close }) => (
        <div
          onMouseLeave={() => close()}
          className="rounded-md py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 max-[320px]:flex max-[320px]:w-screen max-[320px]:justify-center"
        >
          <div>
            <Menu.Button
              onMouseEnter={(event: React.MouseEvent<HTMLButtonElement>) =>
                open ? "" : event.currentTarget.click()
              }
            >{username || ""}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              onMouseLeave={() => close()}
              className="shadow-[0px_4px_64px_0px rgba(0,0,0,0.25)] top-14 absolute right-0 z-[9999] mt-2 flex min-h-[240px] w-[324px] flex-col gap-y-2 bg-gray2 p-4 focus:outline-none max-[320px]:w-full"
            >
              <Menu.Item>
                <div className="flex h-[46px] w-full items-center justify-between rounded bg-[#2D3130] hover:bg-[#3b3f3e] px-4 py-[14px] text-[#D7DEE8]">
                  <div className="font-aeonikPro text-[15px] font-normal text-[#D7DEE8]">
                    <Translation text="nav.language" />
                  </div>
                  <div className="flex h-full items-center">
                    <span className="font-aeonikPro text-[15px] font-normal text-[#D7DEE8]">
                      {statusLocale}
                    </span>
                    <SwitchLocale
                      iconProp={
                        <ChevronDownIcon
                          className={`ml-2 h-4 w-4 stroke-white text-white`}
                        />
                      }
                    />
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => router.push("/account-setting")}
                  className="flex h-[46px] w-full items-center justify-between rounded bg-[#2D3130] hover:bg-[#3b3f3e] px-4 py-[14px] text-[#D7DEE8]"
                >
                  <div className="font-aeonikPro text-[15px] font-normal text-[#D7DEE8]">
                    <Translation text="nav.account-setting" />
                  </div>
                  <ArrowRight className="h-[9px] w-[9px]" />
                </button>
              </Menu.Item>
              <Menu.Item>
                <Link
                  target="_blank"
                  href="https://whitepaper.spacefalcon.com/resources/faq"
                  className="flex h-[46px] w-full items-center justify-between rounded bg-[#2D3130] hover:bg-[#3b3f3e] px-4 py-[14px] text-[#D7DEE8]"
                >
                  <div className="flex items-center font-aeonikPro text-[15px] font-normal text-[#D7DEE8]">
                    <Translation text="nav.FAQ" />
                  </div>
                  <ArrowRight className="h-[9px] w-[9px]" />
                </Link>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() => {signOut({ redirect: false })}}
                  className="flex h-[46px] w-full items-center justify-between rounded bg-[#2D3130] hover:bg-[#3b3f3e] px-4 py-[14px] text-[#D7DEE8] cursor-pointer"
                >
                  <div className="flex items-center font-aeonikPro text-[15px] font-normal text-[#D7DEE8]">
                    <Translation text="nav.signOut" />
                  </div>
                  <PowerIcon className="h-[14px] w-[14px]" />
                </div>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
}

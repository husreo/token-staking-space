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
  avatar: string;
  FPValue: string | number;
  RPValue: string | number;
  navigationBuyFP?: string;
}

export default function AccountDropdown({ username, avatar }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  // const handleSwitchTheme = () => {
  //   if (theme === "dark") {
  //     setTheme("light");
  //   } else {
  //     setTheme("dark");
  //   }
  // };
  const statusLocale = useMemo(() => {
    return pathname.includes("/vn") ? "Vietnamese" : "English";
  }, [pathname]);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );
  const handleChangeTabMenuActive = (idx: number) => {
    dispatch(setTabDashboardMenuActive(idx));
    router.replace(`dashboard?${createQueryString("tab", "buy-fp")}`, {
      scroll: false,
    });
  };

  return (
    <Menu as="div">
      {({ open, close }) => (
        <div
          onMouseLeave={() => close()}
          className="rounded-md py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 max-[320px]:flex max-[320px]:w-screen max-[320px]:justify-center"
        >
          <div>
            <Menu.Button
              onMouseEnter={(event: React.MouseEvent<HTMLButtonElement>) =>
                open ? "" : event.currentTarget.click()
              }
              className="flex h-9 items-center gap-[6px] rounded-[10px] bg-white/10 py-[7px] pl-[7px] pr-3"
            >
              <span className="relative h-5 w-5 overflow-hidden rounded-full">
                <Image
                  src={avatar}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  alt="avatar"
                />
              </span>
              <span className="w-20 truncate text-[13px] font-normal">
                {username || ""}
              </span>
              {!username && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12.9999 3.89992L9.03994 1.61325C8.39328 1.23992 7.59328 1.23992 6.93994 1.61325L2.98661 3.89992C2.33994 4.27325 1.93994 4.96659 1.93994 5.71992V10.2799C1.93994 11.0266 2.33994 11.7199 2.98661 12.0999L6.93994 14.3866C7.58661 14.7599 8.38661 14.7599 9.03994 14.3866L12.9999 12.0999C13.6466 11.7266 14.0466 11.0333 14.0466 10.2799V5.71992C14.0399 4.96659 13.6399 4.27992 12.9933 3.89992H12.9999ZM7.49327 5.16659C7.49327 4.89325 7.71994 4.66659 7.99327 4.66659C8.26661 4.66659 8.49327 4.89325 8.49327 5.16659V8.66659C8.49327 8.93992 8.26661 9.16659 7.99327 9.16659C7.71994 9.16659 7.49327 8.93992 7.49327 8.66659V5.16659ZM8.60661 11.0866C8.57328 11.1666 8.52661 11.2399 8.46661 11.3066C8.33994 11.4333 8.17327 11.4999 7.99327 11.4999C7.90661 11.4999 7.81994 11.4799 7.73994 11.4466C7.65328 11.4133 7.58661 11.3666 7.51994 11.3066C7.45994 11.2399 7.41328 11.1666 7.37328 11.0866C7.33994 11.0066 7.32661 10.9199 7.32661 10.8333C7.32661 10.6599 7.39327 10.4866 7.51994 10.3599C7.58661 10.2999 7.65328 10.2533 7.73994 10.2199C7.98661 10.1133 8.27994 10.1733 8.46661 10.3599C8.52661 10.4266 8.57328 10.4933 8.60661 10.5799C8.63994 10.6599 8.65994 10.7466 8.65994 10.8333C8.65994 10.9199 8.63994 11.0066 8.60661 11.0866Z"
                    fill="#FF8A00"
                  />
                  <path
                    d="M7.99333 4.66675C7.71999 4.66675 7.49333 4.89341 7.49333 5.16675V8.66675C7.49333 8.94008 7.71999 9.16675 7.99333 9.16675C8.26666 9.16675 8.49333 8.94008 8.49333 8.66675V5.16675C8.49333 4.89341 8.26666 4.66675 7.99333 4.66675Z"
                    fill="white"
                  />
                  <path
                    d="M8.46666 11.3067C8.52666 11.2401 8.57333 11.1667 8.60666 11.0867C8.63999 11.0067 8.65999 10.9201 8.65999 10.8334C8.65999 10.7467 8.63999 10.6601 8.60666 10.5801C8.57333 10.4934 8.52666 10.4267 8.46666 10.3601C8.27999 10.1734 7.98666 10.1134 7.73999 10.2201C7.65333 10.2534 7.58666 10.3001 7.51999 10.3601C7.39333 10.4867 7.32666 10.6601 7.32666 10.8334C7.32666 10.9201 7.33999 11.0067 7.37333 11.0867C7.41333 11.1667 7.45999 11.2401 7.51999 11.3067C7.58666 11.3667 7.65333 11.4134 7.73999 11.4467C7.81999 11.4801 7.90666 11.5001 7.99333 11.5001C8.17333 11.5001 8.33999 11.4334 8.46666 11.3067Z"
                    fill="white"
                  />
                </svg>
              )}
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
              className="shadow-[0px_4px_64px_0px rgba(0,0,0,0.25)] absolute right-0 z-[9999] mt-2 flex min-h-[397px] w-[324px] flex-col gap-y-2 rounded-[10px] bg-gray2 p-4 focus:outline-none max-[320px]:w-full"
            >
              <div className="divide-y divide-white/[0.12] rounded bg-[#2D3130] p-4">
                <Menu.Item>
                  <>
                    <div className="mb-5 flex w-full items-center justify-between">
                      <div className="flex flex-1 items-center gap-x-2">
                        <div className="relative h-10 w-10 rounded-[71px]">
                          <Image
                            src={avatar}
                            className="rounded-[71px]"
                            fill
                            alt="logo"
                            quality={100}
                            sizes="(max-width: 600px) 100vw, 100vw"
                            loading="eager"
                          />
                        </div>
                        <p className="max-w-[200px] truncate break-all font-aeonikPro text-xl font-normal text-[#F0F2F3]">
                          {username || ""}
                        </p>
                      </div>
                      <button
                        onClick={() => signOut({
                          redirect: false,
                        })}
                        className="flex h-7 w-7 items-center justify-center rounded-[49px] p-[6px] hover:bg-gray1"
                      >
                        <PowerIcon className="h-4 w-4 " />
                      </button>
                    </div>
                    {/* {username ? (
                      <>
                        <div className="mb-3 flex justify-between pt-5">
                          <div className="flex w-fit flex-col gap-y-1">
                            <h3 className="text-[13px] font-normal text-gray10">
                              <Translation text="nav.fp-point" />
                            </h3>
                            <div className="flex gap-x-1">
                              <div className="relative h-5 w-5 text-[13px]">
                                <Image
                                  src={FPBadge}
                                  className="rounded-[71px]"
                                  fill
                                  alt="logo"
                                  quality={100}
                                  sizes="(max-width: 600px) 100vw, 100vw"
                                  loading="eager"
                                />
                              </div>
                              <div className="flex gap-x-1 font-dinPro font-bold">
                                <span>{FPValue}</span>
                                <span>FP</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex w-fit flex-col gap-y-1">
                            <h3 className="text-[13px] font-normal text-gray10">
                              <Translation text="nav.rp-point" />
                            </h3>
                            <div className="flex justify-end gap-x-1">
                              <div className="relative h-5 w-5 text-[13px]">
                                <Image
                                  src={RPBadge}
                                  className="rounded-[71px]"
                                  fill
                                  alt="logo"
                                  quality={100}
                                  sizes="(max-width: 600px) 100vw, 100vw"
                                  loading="eager"
                                />
                              </div>
                              <div className="flex gap-x-1 font-dinPro font-bold">
                                <span>{RPValue}</span>
                                <span>FP</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleChangeTabMenuActive(1)}
                          className=" w-full rounded-[10px] border-none px-3 py-[7px] text-center text-[13px] font-bold text-gray0"
                        >
                          <span>
                            <Translation text="button.buy-fp" />
                          </span>
                        </Button>
                      </>
                    ) : (
                      <div className="pt-5 text-center">
                        <p className="mb-3 text-[15px] text-[#d7dee8]">
                          <Translation text="new-user.set-up-profile" />
                        </p>
                        <Button
                          onClick={() => router.push("/new-user")}
                          className=" w-full rounded-[10px] border-none px-3 py-[7px] text-center text-[13px] font-bold text-gray0"
                        >
                          <span>
                            <Translation text="new-user.set-up-now" />
                          </span>
                        </Button>
                      </div>
                    )} */}
                  </>
                </Menu.Item>
              </div>
              <Menu.Item>
                <div className="flex h-[46px] w-full items-center justify-between rounded bg-[#2D3130] px-4 py-[14px] text-[#D7DEE8]">
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
                  className="flex h-[46px] w-full items-center justify-between rounded bg-[#2D3130] px-4 py-[14px] text-[#D7DEE8]"
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
                  className="flex h-[46px] w-full items-center justify-between rounded bg-[#2D3130] px-4 py-[14px] text-[#D7DEE8]"
                >
                  <div className="flex items-center font-aeonikPro text-[15px] font-normal text-[#D7DEE8]">
                    <Translation text="nav.FAQ" />
                  </div>
                  <ArrowRight className="h-[9px] w-[9px]" />
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
}

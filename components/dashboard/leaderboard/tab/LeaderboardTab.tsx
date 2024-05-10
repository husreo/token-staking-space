"use client";
import ComponentContainer from "@/components/shared/container/ComponentContainer";
import { Tab } from "@headlessui/react";
import { useRequest } from "ahooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import {
  fetchProfileNFTs,
  setTabDashboardMenuActive,
} from "store/features/user/userSlice";
import { classNames } from "utils/string";
import FalconChampionShip from "./FalconChampionShipTable";
import NFTMintingReferral from "./NFTMintingReferral";
import CupIcon from "@/components/shared/icons/cup";
import { useScroll } from "ahooks";
const dataTab = {
  nameTab: [
    {
      name: "FALCON CHAMPIONSHIP",
      key: "falcon-championship",
      tab: "falcon-championship",
    },
    {
      name: "Referral Leaderboard",
      key: "referral-leaderboard",
      tab: "referral-leaderboard",
    },
  ],
};

export default function LeaderboardTab() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const scroll: any = useScroll();
  const tabQuery = useMemo(() => {
    return searchParams.get("tab");
  }, [searchParams]);
  const { session, tabDashboardMenuActive } = useSelector(
    (state: RootState) => state.user,
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    if (!tabQuery) {
      const params = new URLSearchParams(searchParams);
      params.set("tab", dataTab.nameTab[0].tab);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      dispatch(setTabDashboardMenuActive(0));
    } else {
      const idx = dataTab.nameTab.findIndex((i: any) => i.tab === tabQuery);
      if (idx !== -1) {
        dispatch(setTabDashboardMenuActive(idx));
      } else {
        const params = new URLSearchParams(searchParams);
        params.set("tab", dataTab.nameTab[0].tab);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabQuery]);

  const handleChangeTabMenuActive = (idx: number) => {
    dispatch(setTabDashboardMenuActive(idx));
    router.replace(
      `${pathname}?${createQueryString("tab", dataTab?.nameTab?.[idx].tab)}`,
      { scroll: false },
    );
  };

  const { run: runfetchProfileNFTs } = useRequest(
    () => dispatch(fetchProfileNFTs()),
    {
      manual: true,
    },
  );

  useEffect(() => {
    // if (window.location.hash) {
    //   const id = dataTab.nameTab.findIndex(
    //     (i) => i.key === window.location.hash.replace("#", ""),
    //   );
    //   if (id) {
    //     setSelectedIndex(id);
    //     handleChangeTabMenuActive(id);
    //   }
    // }
    runfetchProfileNFTs();
    // console.log("runfetchProfileNFTs");
  }, []);

  return (
    <>
      <div
        className="min-h-screen bg-lightgray bg-planet
        bg-cover bg-fixed bg-[center_center] bg-no-repeat font-chakraPetch font-normal text-white"
      >
        <div className="min-h-screen bg-planet-color pb-32">
          <div className="mx-auto flex max-w-[1656px]">
            <Tab.Group
              selectedIndex={tabDashboardMenuActive}
              onChange={handleChangeTabMenuActive}
            >
              <div
                className={classNames(
                  "fixed left-0 right-0 z-[99] mx-auto mb-9 flex max-w-[1656px] border border-b border-white/[0.08] max-[414px]:justify-center min-[414px]:h-14",
                  scroll?.top > 50 ? "bg-gray0" : "bg-none",
                )}
              >
                <Tab.List className="flex h-full items-center max-[414px]:flex-col">
                  {dataTab.nameTab.map((tabName, index) => {
                    return (
                      <div key={tabName.key} className="relative flex h-full">
                        <Tab as={Fragment}>
                          {({ selected }) => (
                            <div className="flex h-full focus:outline-none">
                              <button
                                className={classNames(
                                  "flex h-full flex-col items-center justify-center px-[30px] uppercase transition-all duration-75 ease-in max-[414px]:h-12",
                                  selected
                                    ? " border-t-2 border-fcon bg-white/[0.08]"
                                    : "border-none bg-transparent",
                                )}
                              >
                                <div className="flex items-center gap-[9px]">
                                  {tabName.tab === "falcon-championship" && (
                                    <CupIcon className="h-5 w-5" />
                                  )}
                                  {tabName.name}
                                </div>
                              </button>
                            </div>
                          )}
                        </Tab>
                      </div>
                    );
                  })}
                </Tab.List>
              </div>
              <ComponentContainer className="!max-w-[1656px] pt-14">
                <Tab.Panels className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  <Tab.Panel>
                    <FalconChampionShip />
                  </Tab.Panel>
                  <Tab.Panel unmount>
                    <NFTMintingReferral />
                  </Tab.Panel>
                </Tab.Panels>
              </ComponentContainer>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
}

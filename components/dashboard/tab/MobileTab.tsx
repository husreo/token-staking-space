"use client";
import { Menu, Tab, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { classNames } from "utils/string";

interface NameTab {
  name: string | React.ReactNode;
}
export default function MobileTab({
  dataTab,
  selectedIndex,
  setSelectedIndex,
}: {
  dataTab: any;
  selectedIndex: number;
  setSelectedIndex: (d: number) => void;
}) {
  return (
    <Menu as="div">
      <div className="relative h-10 justify-center rounded text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <div>
          <Menu.Button className="flex h-10 items-center rounded bg-gray2 hover:bg-[#2D3130]">
            <span className="w-fit p-4 font-aeonikPro text-white">
              {dataTab.nameTab[selectedIndex].name}
            </span>
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
          <Menu.Items className="absolute -left-1/2 right-0 top-10 z-50 mt-2 min-h-[98px] w-fit origin-top-right divide-y divide-white/5 bg-gray2 focus:outline-none">
            <div className="flex flex-col gap-y-1 px-5 py-3">
              <Menu.Item>
                <Tab.Group
                  vertical
                  selectedIndex={selectedIndex}
                  onChange={setSelectedIndex}
                >
                  <div className="flex h-fit w-full justify-center ">
                    <Tab.List className="flex w-fit flex-wrap justify-center gap-y-1 rounded-md bg-gray2 p-1">
                      {dataTab.nameTab.map(
                        (tabName: NameTab, index: number) => {
                          return (
                            <div key={`tab${index}`} className="relative flex">
                              <Tab as={Fragment}>
                                {({ selected }) => (
                                  <div className="rounded hover:bg-[#2D3130] focus:outline-none">
                                    <button
                                      className={classNames(
                                        "flex h-10 w-36 flex-col items-center justify-center rounded border border-transparent transition-all duration-75 ease-in",
                                        selected
                                          ? "border-white/[0.12] bg-[#2D3130] font-medium"
                                          : "bg-transparent font-normal opacity-60",
                                      )}
                                    >
                                      <div className="h-full w-fit px-[26px] py-[9px] text-center font-aeonikPro text-base text-white max-[320px]:truncate">
                                        {tabName.name}
                                      </div>
                                    </button>
                                  </div>
                                )}
                              </Tab>
                            </div>
                          );
                        },
                      )}
                    </Tab.List>
                  </div>
                </Tab.Group>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
}

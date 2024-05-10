import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import classNames from "classnames";

interface IProps {
  buttonCustom: string | React.ReactNode | JSX.Element;
  content: string | React.ReactNode | JSX.Element;
  className?: string;
}
export default function Tooltip({
  buttonCustom,
  content,
  className = "",
}: IProps) {
  return (
    <Menu as="div">
      {({ open, close }) => (
        <div
          onMouseLeave={() => close()}
          className="text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <div>
            <Menu.Button
              onMouseEnter={(event: React.MouseEvent<HTMLButtonElement>) =>
                open ? "" : event.currentTarget.click()
              }
            >
              {buttonCustom}
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
              className={classNames(
                "absolute right-0 z-50 mx-2 min-h-[20px] min-w-[180px] max-w-[500px] origin-top-right rounded-lg bg-[#292929] px-2 py-1 text-center focus:outline-none",
                className,
              )}
            >
              <div className="max-w-[450px] break-words px-2 py-2 font-aeonikPro font-normal opacity-50">
                <Menu.Item>
                  <div>{content}</div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
}

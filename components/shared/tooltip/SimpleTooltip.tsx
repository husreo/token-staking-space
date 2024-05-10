"use client";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { classNames } from "utils/string";

const SimpleTooltip = ({
  text,
  children,
  className = "",
}: {
  text: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShowTooltip = () => {
    setShowTooltip(true);
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };
  const handleClickForMobile = () => {
    setShowTooltip(true);
  };
  return (
    <div
      onMouseEnter={handleShowTooltip}
      onMouseLeave={handleCloseTooltip}
      onClick={handleClickForMobile}
      className="truncate"
    >
      <div className="h-full truncate">
        {children}
        <Transition
          show={showTooltip}
          enter="transition-opacity ease-linear duration-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={classNames(
            "absolute bottom-full z-30 h-fit min-h-[20px] transform break-all rounded-lg bg-[#292929] px-2 py-3 text-sm text-white",
            className,
          )}
        >
          <span className="break-all opacity-50">{text}</span>
        </Transition>
      </div>
    </div>
  );
};
export default SimpleTooltip;

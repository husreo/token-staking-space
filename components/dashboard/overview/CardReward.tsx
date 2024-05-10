import React from "react";

import Image from "next/image";
import { classNames } from "utils/string";

const RewardCard = ({
  position,
  gift,
  amountGift,
  handleOpenModal,
}: {
  position: "first" | "second" | "third";
  gift: string;
  amountGift: string;
  handleOpenModal?: (data: any) => void;
}) => {
  return (
    <button
      onClick={handleOpenModal}
      className={classNames(
        "relative flex-1 ",
        position === "first" ? "order-3 md:order-2" : "",
        position === "second" ? "order-2 md:order-1 lg:mb-1" : "",
        position === "third" ? "md:order-3" : "",
      )}
    >
      <div
        className={`relative h-6 overflow-visible ${
          position === "first" ? "w-full lg:w-[216px]" : "w-full lg:w-[164px]"
        }`}
      >
        <div
          style={{
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          }}
          className="absolute bottom-0 h-full w-full bg-reward-clipPath lg:h-[30px]"
        ></div>
        <p
          className={classNames(
            "absolute left-1/2 z-10 flex -translate-x-1/2 transform items-center justify-center",
            position === "first"
              ? "bottom-2 h-36 w-24 lg:h-[87px] lg:w-16"
              : position === "second"
              ? "-bottom-4 h-[160px] w-[160px] md:-bottom-3 lg:h-[126px] lg:w-[122px]"
              : "bottom-3 h-24 w-[130px] lg:h-[62px] lg:w-[106px]",
          )}
        >
          <Image
            src={gift}
            fill
            quality={100}
            alt=""
            sizes="(max-width: 600px) 100vw, 100vw"
            loading="eager"
          />
        </p>
      </div>
      <div
        className={classNames(
          "flex flex-col items-center justify-center",
          position === "first"
            ? "h-[95px] w-full bg-reward-clipPath-2 lg:w-[216px]"
            : "h-[71px] w-full bg-reward-clipPath-3 lg:w-[164px]",
        )}
      >
        <p className="w-fit text-xl font-medium uppercase tracking-[-0.6px] text-white">
          {amountGift}
        </p>
      </div>
    </button>
  );
};

export default RewardCard;

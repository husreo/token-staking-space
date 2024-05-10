import React from "react";
import Image from "next/image";

export interface GiftType {
  placement: string;
  image: string;
  amountGift: string;
  nameGift: string;
  description: string | React.ReactNode;
}
export default function ModalShowGift({ dataModal }: { dataModal: GiftType }) {
  return (
    <div className="relative mx-10 h-fit w-full rounded-[10px] border border-white/[0.12] bg-gray1 p-5 text-white sm:mx-10 sm:h-[462px] sm:p-14 lg:w-[700px]">
      <div
        style={{
          background:
            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
        }}
        className="absolute z-0 h-[143px] w-full rounded-[661px] opacity-20 blur-[70px]"
      ></div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-5">
        <div
          className={`relative h-[194px] ${
            dataModal.placement === "first"
              ? " w-[150px]"
              : dataModal.placement === "second"
              ? " w-[202px]"
              : " w-[215px]"
          }`}
        >
          <Image
            src={dataModal.image}
            fill
            quality={100}
            alt=""
            sizes="(max-width: 600px) 100vw, 100vw"
            loading="eager"
          />
        </div>
        <h1 className="w-fit text-center text-2xl font-bold sm:text-[32px]">
          {dataModal.nameGift}
        </h1>
        <p className="w-fit text-center text-lg font-normal sm:text-xl">
          {dataModal.description}
        </p>
      </div>
    </div>
  );
}

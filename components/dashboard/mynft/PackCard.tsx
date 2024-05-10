import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { NFTMetada } from "types/nft";

export default function PackCard({
  footerCard,
  ...metadata
}: {
  footerCard?: JSX.Element | React.ReactNode;
} & NFTMetada) {
  return (
    <div className="min-h-[440px] w-full overflow-hidden rounded-[10px] bg-gray2">
      <div className="relative h-[286px] w-full">
        <Image
          className="rounded-tl-[10px] rounded-tr-[10px] object-cover"
          src={metadata.image}
          fill
          quality={100}
          alt=""
          sizes="(max-width: 600px) 100vw, 100vw"
          loading="eager"
        />
      </div>
      <div className="w-full p-6">
        <div className="mb-3 flex flex-col gap-y-3">
          <h1 className="text-xl font-medium">{metadata.name}</h1>
          <div className="flex justify-between text-[13px] font-normal">
            <span className="opacity-50">Purchase Date</span>
            <span>{dayjs(metadata.updated_at).format("DD MMM, YYYY")}</span>
          </div>
        </div>
        {footerCard}
      </div>
    </div>
  );
}

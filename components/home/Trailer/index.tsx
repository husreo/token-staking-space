"use client";

import ComponentContainer from "@/components/shared/container/ComponentContainer";
import { useRouter } from "next/navigation";
import Translation from "utils/translation";
import EpicGameStore from "./EpicGameStore";
import Video from "./Video";

export default function Trailer() {
  const router = useRouter();

  return (
    <ComponentContainer className="h-fit w-full px-3 lg:h-[260px] lg:px-0">
      <div
        style={{
          background:
            "linear-gradient(125deg, rgba(26, 19, 20, 0.70) 0%, rgba(53, 38, 40, 0.70) 100%)",
        }}
        className="h-full w-full rounded-xl border border-b-transparent border-l-border-trailer border-r-border-trailer border-t-border-trailer lg:flex"
      >
        <Video />
        <div className="flex flex-col justify-center p-5 lg:p-9">
          <div className="item-center flex flex-col gap-5 sm:flex-row sm:justify-between">
            <div className="flex w-full flex-col gap-1 text-center font-aeonikPro text-xl leading-7 tracking-[0.2px] text-shadow-4 sm:w-[400px] sm:text-left lg:gap-0">
              <p>
                <Translation text="home.trailer.description1" />
              </p>
              <p>
                <Translation text="home.trailer.description2" />
              </p>
              {/* <GameAccessCode /> */}
            </div>
            <EpicGameStore />
          </div>
          {/* <Categories /> */}
        </div>
      </div>
    </ComponentContainer>
  );
}

"use client";

import ComponentContainer from "@/components/shared/container/ComponentContainer";
import Image from "next/image";
import BGCharacter_1 from "public/images/testimotion_character_1.png";
import BGCharacter_2 from "public/images/testimotion_character_2.png";
import DotBG from "public/images/dot.png";
import Script from "next/script";
import { useEffect, useState } from "react";
import { classNames } from "utils/string";

const listTweets = [
  "1727733893351281026",
  "1727318297434280292",
  "1737031536992489528",
  "1739261638891765899",
];

const Testimotion = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [toggleShowMore, setToggleShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      listTweets.forEach((tweetId, index) => {
        console.log("tweetId", tweetId);
        //with masoory layout
        const tweetContainer = document.createElement("div");
        //add tweet to each column base on index
        const col = index % 2;
        const colElement = document.getElementById(`col-${col + 1}`);
        tweetContainer.id = `tweet-${tweetId}`;
        tweetContainer.className = "relative flex justify-center";
        colElement?.appendChild(tweetContainer);
        (window as any).twttr.widgets
          .createTweet(tweetId, tweetContainer, {
            theme: "dark",
            align: "center",
          })
          .then((el: any) => {
            setIsLoading(false);
          })
          .catch((e: any) => {
            console.log("error", e);
          });
      });
    }
  }, [isLoaded]);

  const handleToggleShowMore = () => {
    setToggleShowMore((prev) => !prev);
  };

  return (
    <>
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        onLoad={async (d) => {
          setIsLoaded(true);
        }}
        onError={(e) => {
          console.log("error", e);
          setIsLoading(false);
        }}
      ></Script>
      <div className="relative min-h-[2000px] w-screen bg-black">
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(123, 77, 190, 0.26) 0%, rgba(92, 35, 174, 0.00) 100%)",
          }}
          className="lef absolute left-0 right-0 top-0 h-[700px]"
        ></div>{" "}
        <Image src={DotBG} alt="bg" className="object-cover opacity-50" fill />
        <Image
          src={BGCharacter_1}
          alt=""
          className="absolute left-0 top-0 w-[400px] lg:w-[720px] xl:w-[826px]"
        />
        <Image
          src={BGCharacter_2}
          alt=""
          className="absolute right-0 top-0 w-[400px] object-contain lg:h-[1200px] lg:w-fit"
        />
        <ComponentContainer className="relative pt-36">
          <p className="mx-auto mb-16 max-w-[460px] text-center text-5xl xl:text-6xl">
            Success Stories
          </p>

          {/* create mansory layout */}
          {isLoading ? (
            <div className="flex gap-5">
              <div className="h-96 flex-1 animate-pulse rounded-lg bg-black/40"></div>
              <div className="h-96 flex-1 animate-pulse rounded-lg bg-black/40"></div>
              <div className="h-96 flex-1 animate-pulse rounded-lg bg-black/40"></div>
            </div>
          ) : null}
          <div
            id="container-tweet"
            className={classNames(
              "z-20 grid grid-cols-1 gap-4 overflow-hidden px-4 md:grid-cols-2 lg:grid-cols-2 lg:px-0",
              toggleShowMore ? "" : "max-h-[900px]",
              isLoading ? "opacity-0" : "opacity-100",
            )}
          >
            <div
              id="col-1"
              className="col-span-1 flex flex-col gap-1 md:gap-2 lg:gap-4"
            ></div>
            <div
              id="col-2"
              className="col-span-1 flex flex-col gap-1 md:gap-2 lg:gap-4"
            ></div>
            {/* <div
              id="col-3"
              className="col-span-1 flex flex-col gap-1 md:gap-2 lg:gap-4"
            ></div> */}
            {!toggleShowMore ? (
              <div
                className="absolute bottom-0 left-0 right-0 z-30 flex h-[559px] items-end justify-center"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.72) 44%, #000 100%)",
                }}
              >
                <button
                  className="h-14 w-[242px] rounded-[10px] bg-white/10 text-center text-white"
                  onClick={() => handleToggleShowMore()}
                >
                  Show More
                </button>
              </div>
            ) : null}
          </div>
        </ComponentContainer>
      </div>
    </>
  );
};

export default Testimotion;

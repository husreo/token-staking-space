'use client'
import ComponentContainer from "@/components/shared/container/ComponentContainer";
import Image from "next/image";
import LightBGImg from "public/images/light-bg-2.png";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { IPlatformStats } from "types/stats";
import Translation from "utils/translation";
import HomeTitle from "../HomeTitle";

export default function Web3Stat(stats: IPlatformStats) {
  const {
    total_code_used,
    total_code_worth,
    total_onchain,
    total_users,
    total_whitelisted,
  } = stats;

  const countUpRef: any = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    const checkIfInView = () => {
      if (!countUpRef.current) return;

      const rect = countUpRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (isVisible && !hasAnimated) {
        setHasAnimated(true);
      }
    };

    checkIfInView();

    window.addEventListener("scroll", checkIfInView);
    return () => window.removeEventListener("scroll", checkIfInView);
  }, [hasAnimated]);
  return (
    <ComponentContainer className="px-3 pb-20 pt-20 font-aeonikPro font-normal text-white md:pt-52 lg:px-5 xl:px-0">
      <div ref={countUpRef} className="relative flex gap-x-8 gap-y-20 max-md:flex-col sm:gap-x-10 lg:gap-x-[135px]">
        <Image
          className="absolute left-0 top-0 object-cover"
          fill
          src={LightBGImg}
          alt=""
          quality={50}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
        />
        <div className="lg:w-[630px]">
          <HomeTitle className="relative z-10 w-full pt-10 md:w-[521px]">
            <Translation text="home.web3-stat.title" />
          </HomeTitle>
          <div
            style={{
              background:
                "linear-gradient(241deg, rgba(255, 255, 255, 0.10) -0.03%, rgba(255, 255, 255, 0.00) 100.01%)",
            }}
            className="mt-11 skew-x-0 skew-y-[-5deg] transform rounded-xl border border-white/[0.17] pb-[55px] pl-[45px] pt-[198px] max-[414px]:pl-5 sm:mt-[100px]"
          >
            <h1 className="mb-2 break-all font-dinPro text-[120px] max-[414px]:text-7xl">
              {/* {formatStats({ n: 578309 })} */}
              {hasAnimated && <CountUp start={0} end={578309} duration={2} />}
            </h1>
            <p className="text-base uppercase">
              <Translation text="home.web3-stat.total-platform" />
            </p>
          </div>
        </div>

        <div  className="relative z-10 flex flex-col gap-8 text-center sm:gap-10 md:gap-14 lg:text-left">
          <div>
            <p className="break-all font-dinPro text-[90px] text-fcon text-shadow-5 lg:text-[120px] lg:leading-[150px]">
            {hasAnimated && <CountUp start={0} end={255235} duration={2} />}
              {/* {formatStats({ n: 255235 })} */}
            </p>
            <p className="text-base uppercase">
              <Translation text="home.web3-stat.sub-title1" />
            </p>
          </div>
          <div>
            <p className="break-all font-dinPro text-[90px] text-fcon text-shadow-5 lg:text-[120px] lg:leading-[150px]">
            {hasAnimated && <CountUp start={0} end={32980} duration={2} />}
              {/* {formatStats({ n: 32980 })} */}
            </p>
            <p className="text-base uppercase">
              <Translation text="home.web3-stat.sub-title2" />
            </p>
          </div>
          <div>
            <p className="break-all font-dinPro text-[90px] text-fcon text-shadow-5 lg:text-[120px] lg:leading-[150px]">
            {hasAnimated && <CountUp start={0} end={342240} duration={2} />}
              {/* ${formatStats({ n: 342240 })} */}
            </p>
            <p className="text-base uppercase">
              <Translation text="home.web3-stat.sub-title3" />
            </p>
          </div>
        </div>
      </div>
    </ComponentContainer>
  );
}

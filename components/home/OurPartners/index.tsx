import ComponentContainer from "@/components/shared/container/ComponentContainer";
import AWSLogo from "@/components/shared/icons/brand/aws";
import BinanceLogo from "@/components/shared/icons/brand/binance";
import CircleLogo from "@/components/shared/icons/brand/circle";
import CoinbaseLogo from "@/components/shared/icons/brand/coinbase";
import ConsensysLogo from "@/components/shared/icons/brand/consensys";
import EpicgamesLogo from "@/components/shared/icons/brand/epicgames";
import ImmutableLogo from "@/components/shared/icons/brand/immutable/imutable";
import KucoinLogo from "@/components/shared/icons/brand/kucoin";
import StripeLogo from "@/components/shared/icons/brand/stripe";
import VisaLogo from "@/components/shared/icons/brand/visa";
import Image from "next/image";
import GoogleClound from "public/images/google-cloud.png";
import Translation from "utils/translation";
import HomeSubTitle from "../SubTitle";
import HomeTitle from "../Title";

export default function OurPartners() {
  return (
    <ComponentContainer className="!max-w-[1420px] px-5 lg:px-2">
      <div className="mb-20 items-center justify-center pt-32 text-center">
        <div className="mb-5 font-normal tracking-wide md:mb-10 lg:mb-20">
          <HomeTitle className="mb-8">
            <Translation sub="our-partners" text="title" />
          </HomeTitle>
          <div className="flex justify-center text-center">
            <HomeSubTitle className="mt-2 max-w-[560px] ">
              <Translation sub="our-partners" text="content-partners" />
            </HomeSubTitle>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-16 lg:gap-y-10">
          <CoinbaseLogo className="w-32 lg:w-[179px]" />
          <BinanceLogo className="w-36 md:w-40 lg:w-60" />
          <EpicgamesLogo className="w-10 md:w-12 lg:w-[55px]" />
          <StripeLogo className="w-20 md:w-[87px]" />
          <KucoinLogo className="w-32 md:w-[157px]" />

          <VisaLogo className="w-16 text-white md:w-20" />
          {/* <a
            href="https://twitter.com/SpaceFalconIO/status/1692119698840887377"
            target="_blank"
          >
            <ZebecLogo className="w-28" />
          </a> */}
          <ImmutableLogo className="w-40 text-white lg:w-48" />
          <Image
            className="w-44 sm:w-52 lg:w-60 "
            src={GoogleClound}
            alt="google-cloud"
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            loading="eager"
          />
          <ConsensysLogo className="w-36 text-white md:w-40 " />
          <CircleLogo className="w-44 fill-[#3D3652] text-white" />
          <AWSLogo className="w-20" />
        </div>
      </div>
    </ComponentContainer>
  );
}

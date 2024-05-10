"use client";
import PresaleTopBanner from "@/components/presale/PresaleTopBanner";
import Button from "@/components/shared/button";
import ComponentContainer from "@/components/shared/container/ComponentContainer";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import HeroBG from "public/images/Hero/hero-bg.png";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { classNames } from "utils/string";
import Translation from "utils/translation";
import HeroTitle from "./HeroTitle";
import { scrollToCenterSmooth } from "utils/common";
import { useEffect, useRef } from "react";

const HomeHero = () => {
  const router = useRouter();
  const ref: any = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { session } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (window || pathname === "/") {
      scrollToCenterSmooth(ref.current);
    }
  }, [pathname]);
  return (
    <div
      ref={ref}
      className="relative h-[700px] w-screen bg-black md:h-[788px] lg:h-[70vh] lg:min-h-[788px]"
    >
      <ComponentContainer className="absolute left-0 right-0 top-[342px] z-20 mx-auto hidden w-full px-3 md:top-[152px] md:block">
        <PresaleTopBanner />
      </ComponentContainer>
      <div className="relative h-full w-full">
        <Image
          className="absolute top-0 bg-black object-cover"
          src={HeroBG}
          fill
          alt="bg-hero"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
        />
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
          }}
          className="absolute bottom-0 left-0 right-0 h-3/4 w-full"
        ></div>
        <ComponentContainer className="absolute bottom-24 left-0 right-0 z-10 px-3 font-aeonikPro font-normal text-white xl:px-0">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <HeroTitle />
            <Button
              onClick={() => router.push("/dashboard")}
              variant="default"
              className={classNames(
                "h-[56px] w-[218px] rounded-[10px] px-3 py-[7px] text-center !font-aeonikPro text-base font-medium text-gray0 shadow-[0px_0px_52px_0px_rgba(0,255,194,0.50)] transition-all duration-100 ease-linear",
                // loading ? "opacity-0" : "opacity-100",
              )}
            >
              {!!session?.user?.username ? (
                <>
                  <Translation text="home.hero.to-dashboard" />
                </>
              ) : (
                <>
                  <Translation text="home.hero.claim-prize" />
                </>
              )}
            </Button>
          </div>
        </ComponentContainer>
      </div>
    </div>
  );
};

export default HomeHero;

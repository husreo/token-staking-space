import ComponentContainer from "@/components/shared/container/ComponentContainer";
import HeartGalaxyIcon from "@/components/shared/icons/homepage/heart-of-galaxy";
import PunkWarsIcon from "@/components/shared/icons/homepage/punk-wars";
import Image from "next/image";
import HeartGalaxy from "public/images/games/heart_of_galaxy.png";
import PunkWars from "public/images/games/punk_wars.png";
import PunkWarsBg from "public/images/games/punk_wars_bg.png";
import Translation from "utils/translation";
import HomeTitle from "../HomeTitle";

const GameEcosystem = () => {
  return (
    <ComponentContainer className="overflow-hidden pt-20 font-aeonikPro font-normal text-white lg:pt-[264px] xl:px-0">
      <div className="flex w-full justify-center text-center lg:justify-start lg:text-left">
        <HomeTitle className="w-full md:w-[361px]">
          <Translation text="home.games.games-ecosystem" />
        </HomeTitle>
      </div>
      <div className="flex flex-col gap-6 pt-12 sm:flex-row">
        <div className="relative h-[270px] w-full rounded-xl bg-[#C4C4C4] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]">
          <Image
            className="absolute rounded-xl  object-cover"
            src={PunkWars}
            fill
            alt="PunkWars"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            quality={100}
          />
          <Image
            className="absolute left-0 right-0 top-0 z-10 rounded-xl object-cover mix-blend-plus-lighter"
            src={PunkWarsBg}
            fill
            alt="PunkWars"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            quality={100}
          />
          <div
            className="absolute left-0 right-0 top-0 z-20 h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(21, 21, 21, 0.35) 0%, rgba(21, 21, 21, 0.00) 100%)",
            }}
          ></div>
          <p className="absolute left-5 z-30 flex h-full w-full items-center">
            <PunkWarsIcon className="h-[88px] w-[226px]" />
          </p>
        </div>
        <div className="relative h-[270px] w-full rounded-xl bg-[#C4C4C4] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]">
          <Image
            className="absolute rounded-xl  object-cover"
            src={HeartGalaxy}
            fill
            alt="HeartGalaxy"
            sizes="(max-width: 600px) 100vw, 100vw"
            quality={100}
          />
          <div
            className="absolute left-0 right-0 top-0 z-10 h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(12, 12, 12, 0.26) 0%, rgba(21, 21, 21, 0.00) 100%, rgba(0, 0, 0, 0.00) 100%)",
            }}
          ></div>
          <p className="absolute z-20 flex h-full w-full items-center font-aeonikPro">
            <HeartGalaxyIcon className="h-[63px] w-[222px]" />
          </p>
        </div>
      </div>
    </ComponentContainer>
  );
};

export default GameEcosystem;

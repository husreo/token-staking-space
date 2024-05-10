import FalconBadge from "@/components/home/FalconBadge";
import GameEcosystem from "@/components/home/GameEcosystem";
import HomeHero from "@/components/home/Hero";
import HomeLeaderboard from "@/components/home/Leaderboard";
import OurPartners from "@/components/home/OurPartners";
import SkyWardLords from "@/components/home/SkyWarlords";
import SocialsGraphic from "@/components/home/SocialsGraphic";
import Testimotion from "@/components/home/Testimotion";
import Trailer from "@/components/home/Trailer";
import Web3Stat from "@/components/home/Web3Stat";
import AviatrixPage from "@/components/home/aviatrix";
import { getPlatformStats } from "@/lib/api";
import NotificationModal from "@/components/layout/NotificationModal.tsx";

export default async function Home({ searchParams }: { searchParams: any }) {
  const stats = await getPlatformStats();
  return (
    <>
    <div className="bg-black text-white">
      <HomeHero />
      <Trailer />
      <Web3Stat {...stats} />
      <AviatrixPage />
      <SkyWardLords />
      <FalconBadge />
      <GameEcosystem />

      <HomeLeaderboard />
      <Testimotion />
      <SocialsGraphic />
      <div className="bg-our-partner-gradient pb-10">
        <OurPartners />
      </div>
    </div>
    </>
  );
}

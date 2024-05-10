import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Translation from "utils/translation";
import StepCard from "./StepCard";

export default function MissionLogin({ active }: { active?: boolean }) {
  const { session } = useSelector((state: RootState) => state.user);
  return (
    <div className="w-full">
      <StepCard
        stepNumber="1"
        content={<Translation text="home.aviatrix.step1" />}
        active={active}
      >
        <div
          style={{
            border: session?.user?.username
              ? "1px solid rgba(0, 255, 194, 0.18)"
              : "1px solid rgba(255, 255, 255, 0.11)",
            background: session?.user?.username
              ? "rgba(0, 255, 194, 0.09)"
              : "transparent",
          }}
          className="flex h-12 cursor-pointer items-center justify-between rounded-[10px] px-5 py-[7px]"
        >
          {session?.user?.username ? (
            <>
              <span className="text-[15px] font-medium">
                <Translation text="home.aviatrix.logged" />
              </span>
              <div className="flex gap-x-2">
                <div
                  style={{
                    border: "1px solid rgba(6, 50, 40, 0.24);",
                  }}
                  className="relative h-5 w-5 rounded-full bg-[#DBFF00]"
                >
                  <Image
                    className="rounded-full object-cover"
                    src={"/images/mock_nft.png"}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>
                <span className="max-w-[70px] truncate text-[15px] font-medium">
                  {session?.user?.username}
                </span>
              </div>
            </>
          ) : (
            <Link
              href={"/login"}
              className="w-full text-center text-[15px] font-medium focus-within:border-white/50"
            >
              <Translation text="home.aviatrix.login-or-create" />
            </Link>
          )}
        </div>
      </StepCard>
    </div>
  );
}

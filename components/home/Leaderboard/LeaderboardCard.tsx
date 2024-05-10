import Image from "next/image";
import { classNames } from "utils/string";
import Translation from "utils/translation";

const LeaderboardCard = ({
  position,
  username,
  avatar,
}: {
  position: "first" | "second" | "third";
  username: string;
  avatar: string;
}) => {
  return (
    <div
      className={classNames(
        "flex-1",
        position === "first" ? "order-3 md:order-2" : "",
        position === "second" ? "order-2 md:order-1" : "",
        position === "third" ? "md:order-3" : "",
      )}
    >
      <div className="relative mx-auto mb-2 h-24 w-24 overflow-hidden rounded-xl">
        <Image
          src={avatar || "/images/mock_nft.png"}
          fill
          alt="nft"
          sizes="(max-width: 600px) 100vw, 100vw"
        />
      </div>
      <p className="mb-8 text-center font-medium text-white">{username}</p>

      <div className="relative h-10 overflow-visible">
        <div
          style={{
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          }}
          className="bottom-0 h-full w-full bg-leaderboard-upper-dark"
        ></div>
        <p
          className={classNames(
            "absolute -top-5 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 transform items-center justify-center rounded-[2px] border border-black/[0.15]",
            position === "first"
              ? "bg-[#FFD15B]"
              : position === "second"
              ? "bg-[#E4E4E4]"
              : "bg-[#DFAC9B]",
          )}
        >
          <span className="text-lg font-medium text-black">
            {position === "first" ? 1 : position === "second" ? 2 : 3}
          </span>
        </p>
      </div>
      <div
        className={classNames(
          "relative flex  items-center justify-between bg-leaderboard-dark p-6",
          position === "first" ? "h-[144px]" : "h-[105px]",
        )}
      >
        <div>
          <p className="mb-[2px] text-[13px] text-[#707070]">
            <Translation text="home.games.total-xp" />
          </p>
          <p className="font-medium text-white">32.049</p>
        </div>
        <div className="text-right">
          <p className="mb-[2px] text-[13px] text-[#707070]">
            <Translation text="home.games.last-game-xp" />
          </p>
          <p className="font-medium text-white">32.049</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;

import ComponentContainer from "@/components/shared/container/ComponentContainer";
import Image from "next/image";
import HomeLeaderBoardImage from "public/images/Leaderboard/home-leaderboard.png";
import Translation from "utils/translation";
import HomeTitle from "../HomeTitle";

const mockLeaderboard = [
  {
    placement: "first",
    username: "EASYGAME",
    avatar: "/images/mock_nft_2.png",
  },
  {
    placement: "second",
    username: "SAMURAI",
    avatar: "/images/mock_nft.png",
  },
  {
    placement: "third",
    username: "DARTVADER",
    avatar: "/images/mock_nft_3.png",
  },
];

const HomeLeaderboard = () => {
  return (
    // <ComponentContainer className="mt-10 flex justify-center rounded pb-20 pt-20  bg-gray0 md:mt-20 lg:mt-40">
    //   <div
    //     id="leaderboard"
    //     className="relative max-w-[941px] max-h-[941px] border flex-1 overflow-hidden px-10 pt-[84px] md:px-20 lg:px-[141px]"
    //   >
    //     <svg
    //       width="645"
    //       height="645"
    //       viewBox="0 0 645 645"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="absolute left-1/2 top-0 z-0 -translate-x-1/2 transform opacity-100"
    //     >
    //       <circle
    //         cx="322.5"
    //         cy="322.5"
    //         r="322.5"
    //         fill="url(#paint0_linear_892_2937)"
    //       />
    //       <defs>
    //         <linearGradient
    //           id="paint0_linear_892_2937"
    //           x1="322.5"
    //           y1="0"
    //           x2="322.5"
    //           y2="645"
    //           gradientUnits="userSpaceOnUse"
    //         >
    //           <stop stopColor="#272727" />
    //           <stop offset="1" stopColor="#00000042" stopOpacity="0" />
    //         </linearGradient>
    //       </defs>
    //     </svg>
    //     <div className="relative">
    //       <HomeTitle className="text-center mb-3">
    //         <Translation text="home.games.leaderboard" />
    //       </HomeTitle>
    //       <p className="mx-auto mb-14 mt-2 max-w-[480px] font-aeonikPro font-normal text-center text-[#AEAEAE] text-[17px]">
    //         <Translation text="home.games.leaderboard-description" />
    //       </p>
    //     </div>

    //     <div className="relative mx-auto mb-6 flex flex-col-reverse justify-evenly gap-8 md:flex-row md:items-end">
    //       {mockLeaderboard.map((user, idx) => (
    //         <LeaderboardCard
    //           key={`leaderboard-card-${idx}`}
    //           position={user.placement as any}
    //           {...user}
    //         />
    //       ))}
    //     </div>
    //     <div className="flex justify-center pt-4">
    //       <Button
    //         variant="default"
    //         className="w-full max-w-[250px] rounded-[4px] px-6 py-3 dark:border-white/10 text-black"
    //       >
    //         <span>
    //           <Translation text="home.games.view-full-leaderboard" />
    //         </span>
    //       </Button>
    //     </div>
    //   </div>
    // </ComponentContainer>
    <ComponentContainer className="mt-20 flex flex-col items-center justify-center px-3 sm:mt-36 sm:px-0 lg:mt-64">
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center sm:h-[941px] lg:w-[941px]">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1717 1717"
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full transform sm:scale-[2]"
        >
          <g filter="url(#filter0_f_5235_57181)">
            <circle
              cx="858.5"
              cy="858.5"
              r="470.5"
              fill="url(#paint0_linear_5235_57181)"
            ></circle>
          </g>
          <defs>
            <filter
              id="filter0_f_5235_57181"
              x="0"
              y="0"
              className="h-full w-full"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                result="effect1_foregroundBlur_5235_57181"
                stdDeviation="194"
              ></feGaussianBlur>
            </filter>
            <linearGradient
              id="paint0_linear_5235_57181"
              x1="858.5"
              x2="858.5"
              y1="1329"
              y2="388"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#86FFE2" stopOpacity="0"></stop>
              <stop offset="1" stopColor="#00FFC2" stopOpacity="0.24"></stop>
            </linearGradient>
          </defs>
        </svg> */}
        {/* <Image
        className="absolute bottom-0 left-0 right-0 top-0 object-cover blur-[71px]"
        src={BGBlur}
        fill
        alt="BGBlur"
        sizes="(max-width: 600px) 100vw, 100vw"
        quality={100} /> */}
        <div
          style={{
            background:
              "linear-gradient(0deg, rgba(134, 255, 226, 0.00) 0%, rgba(0, 255, 194, 0.24) 100%)",
          }}
          className="absolute flex h-full w-full flex-col items-center justify-center rounded-full border blur-[194px]"
        ></div>
        <div className="relative z-10">
          <HomeTitle className="mb-3 text-center">
            <Translation text="home.games.leaderboard" />
          </HomeTitle>
          <p className="mx-auto mb-5 mt-2 max-w-[480px] text-center font-aeonikPro text-[17px] font-normal text-[#AEAEAE] sm:mb-20">
            <Translation text="home.games.leaderboard-description" />
          </p>
        </div>
        <div className="relative h-[360px] w-full max-[360px]:h-[120px] sm:w-[630px]">
          <Image
            className="max-sm:object-contain"
            src={HomeLeaderBoardImage}
            fill
            alt="leaderboard"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
          />
        </div>
      </div>
    </ComponentContainer>
  );
};

export default HomeLeaderboard;

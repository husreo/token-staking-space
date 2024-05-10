"use client";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setShowNDModalFAQ } from "store/features/newDashboard/newDashboardSlice";
import Drawer from "../../shared/drawer";
import { Disclosure, Transition } from "@headlessui/react";
import { classNames } from "utils/string";

const FQAArrowIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <g clipPath="url(#clip0_1903_275)" opacity="0.4">
        <path fill="#fff" d="M24 12l-8 10-8-10h16z"></path>
      </g>
      <defs>
        <clipPath id="clip0_1903_275">
          <path fill="#fff" d="M0 0H32V32H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};
interface FQAItemProp {
  title: string;
  subContent: string | React.ReactNode;
}
const FAQGuideChampionsion = () => {
  const guideData = [
    "Mint the NFT and redeem it for a login code (ticket).",
    "Download the game.",
    "Enter the login code in the game and start the championship. You have 2 hours to score before the ticket expires.",
    "You can earn more scores by getting a new login code and playing in championship mode.",
    "Earn USDT rewards at the end of the championship.",
  ];
  return (
    <div className="leading-6">
      <p>
        First, connect your wallet to start minting the NFT. Each NFT can be
        redeemed for 3 championship login codes (which function like
        championship tickets). Here are some steps to remember:
      </p>
      {guideData.map((item, index) => {
        return (
          <div key={`guide-${index}`} className="flex">
            <div className="text-base leading-6">•</div>
            <span className="ml-3 flex-1 text-base leading-6">{item}</span>
          </div>
        );
      })}
    </div>
  );
};
const FAQNFTPlayers = () => {
  const notOwnNFT = [
    "Can only play Aviatrix.",
    "Cannot participate in the rankings.",
    "Cannot receive rewards worth $100k.",
    "Will not receive FCON Airdrops during the tournament.",
  ];
  const ownNFT = [
    "Will receive login codes to participate in the Aviatrix Championship tournament.",
    "Can participate in a tournament worth $100k.",
    "Are guaranteed to receive a number of FCON Airdrops, the amount depends on the NFT they own.",
  ];
  return (
    <div className="leading-6">
      <p>
        The difference between unowned and owned NFT players lies in the ability
        to participate in tournaments and receive rewards.
      </p>
      <div className="mt-6">
        <p className="font-bold">Players who do not own NFTs:</p>
        {notOwnNFT.map((item, index) => {
          return (
            <div key={`not-own-${index}`} className="flex">
              <div className="text-base leading-6">•</div>
              <span className="ml-3 flex-1 text-base leading-6">{item}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-6">
        <p className="font-bold">Players who own NFTs:</p>
        {ownNFT.map((item, index) => {
          return (
            <div key={`own-${index}`} className="flex">
              <div className="text-base leading-6">•</div>
              <span className="ml-3 flex-1 text-base leading-6">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const FAQLoginCode = () => {
  const loginCodeData = [
    "Each code provides access for 2 hours, totaling 6 hours of playtime.",
    "Your leaderboard ranking is based on your total score achieved within these 6 hours.",
    "The higher your score and leaderboard rank, the larger the prize you will receive.",
  ];
  return (
    <div className="leading-6">
      <p>
        After minting and redeeming, you will receive codes to log into the
        game. For example, you mint and redeem one NFT:
      </p>
      {loginCodeData.map((item, index) => {
        return (
          <div key={`login-code-${index}`} className="flex">
            <div className="text-base leading-6">•</div>
            <span className="ml-3 flex-1 text-base leading-6">{item}</span>
          </div>
        );
      })}
    </div>
  );
};
const FAQItem: FQAItemProp[] = [
  {
    title: "WHAT IS AVIATRIX CHAMPIONSHIP?",
    subContent:
      "The Aviatrix Championship is a major tournament with a total prize pool worth 100k USDT. To kick off and celebrate the launch of Aviatrix 2.0, we've designed this tournament! The rewards are substantial, and many FCON Airdrops are distributed to users participating in the tournament!",
  },
  {
    title: "HOW IS THE PRIZE POOL ALLOCATING TO PLAYERS?",
    subContent:
      "The prize pool is allocated based on performance in the tournament leaderboard. This means the more you play, the higher your chances of winning significant prizes.",
  },
  {
    title: "A GUIDE TO QUICK JOIN THE CHAMPIONSHION AND WIN",
    subContent: <FAQGuideChampionsion />,
  },
  {
    title: "WHAT IS THE DIFFERENT BETWEEN UNOWNED AND OWNED NFT PLAYER?",
    subContent: <FAQNFTPlayers />,
  },
  {
    title: "WHAT IS CHAMPIONSHIP LOGIN CODE & HOW DOES IT WORKS?",
    subContent: <FAQLoginCode />,
  },
  {
    title: "WHAT IS AVIATRIX CHAMPIONSHIP PASS REFERRAL PROGRAM?",
    subContent:
      "The Aviatrix Championship Pass referral program is designed for those participating in Aviatrix Championship minting. Upon minting, you receive a referral code. This code can be shared with others. If you rank among the top for sending the most referral codes, you stand a chance to win a substantial amount of USDT!",
  },
];
const FAQModal = () => {
  const dispatch = useDispatch();
  const { showFAQ, indexFAQ } = useSelector(
    (state: RootState) => state.newDashboard,
  );
  const closeModal = () => dispatch(setShowNDModalFAQ(false));
  const [userInteracted, setUserInteracted] = useState(false);
  useEffect(() => {
    setUserInteracted(false);
  }, [showFAQ]);
  return (
    <Fragment>
      <Drawer title="FAQ" isOpen={showFAQ} closeModal={closeModal} width={662}>
        <div className="flex h-[800px] w-full flex-col gap-2 overflow-y-scroll p-9">
          {FAQItem.map((item, index) => {
            return (
              <Disclosure
                key={`faq-${index}`}
                defaultOpen={!userInteracted && index === indexFAQ}
              >
                {({ open }) => (
                  <div className="flex flex-col">
                    <Disclosure.Button
                      onClick={() => setUserInteracted(true)}
                      className="flex w-full justify-between border border-white/[0.15] bg-white/[0.08] p-6 text-left text-base font-normal leading-6 outline-none ring-0"
                    >
                      {item.title}
                      <FQAArrowIcon
                        className={classNames(
                          "duration-250 h-8 w-8 transition-all ease-out",
                          open ? "" : "-rotate-90 transform",
                        )}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="bg-white/[0.09] p-6">
                        {item.subContent}
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            );
          })}
        </div>
      </Drawer>
    </Fragment>
  );
};

export default FAQModal;

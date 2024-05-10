"use client";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setShowNDModalFAQ,
  setIndexFAQ,
} from "store/features/newDashboard/newDashboardSlice";

const FAQItem = [
  {
    title: "WHAT IS AVIATRIX CHAMPIONSHIP?",
  },
  {
    title: "HOW IS THE PRIZE POOL ALLOCATING TO PLAYERS?",
  },
  {
    title: "A GUIDE TO QUICK JOIN THE CHAMPIONSHION AND WIN",
  },
  {
    title: "WHAT IS THE DIFFERENT BETWEEN UNOWNED AND OWNED NFT PLAYER?",
  },
  {
    title: "WHAT IS CHAMPIONSHIP LOGIN CODE & HOW DOES IT WORKS?",
  },
  {
    title: "WHAT IS AVIATRIX CHAMPIONSHIP PASS REFERRAL PROGRAM?",
  },
];
export default function FAQChampionship() {
  const dispatch = useDispatch();
  return (
    <div className="relative flex h-[518px] w-full flex-col border-b border-l border-r border-white/[0.15] p-9">
      <p className="pb-6 text-xl leading-[30px]">FALCON CHAMPIONSHIP FAQ</p>
      <div className="flex w-full flex-col gap-2 overflow-y-scroll">
        {FAQItem.map((item, index) => {
          return (
            <button
              key={`faq-${index}`}
              onClick={() => {
                dispatch(setShowNDModalFAQ(true));
                dispatch(setIndexFAQ(index));
              }}
              className="flex w-full items-center border border-white/[0.15] bg-white/[0.08] p-6 text-base font-normal leading-6 outline-none ring-0"
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

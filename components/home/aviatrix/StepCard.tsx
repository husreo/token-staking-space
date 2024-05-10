import React from "react";

export default function StepCard({
  children,
  stepNumber = "1",
  content = "",
  active = false,
}: {
  children: React.ReactNode;
  stepNumber: number | string;
  content: string | React.ReactNode;
  active?: boolean;
}) {
  return (
    <div className="flex h-fit w-full flex-col justify-between gap-y-5 rounded-2xl bg-[#101010] p-4 backdrop-blur-[18px] sm:p-8 md:h-[238px]">
      <div className="flex h-10 w-10 flex-col items-center justify-center rounded-[71px] bg-fcon py-2">
        <span className="font-dinPro text-xl font-black text-black">
          {stepNumber}
        </span>
      </div>
      <div className="w-full">
        <p className="pb-4 text-xl">{content}</p>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

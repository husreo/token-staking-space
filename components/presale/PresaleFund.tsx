import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Ellipse = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 1920 1785"
    >
      <path
        stroke="url(#paint0_linear_9087_7508)"
        d="M2744 1785C2744 799.724 1945.28 1 960 1-25.276 1-824 799.724-824 1785"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_9087_7508"
          x1="960"
          x2="960"
          y1="1"
          y2="1785"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7479FF"></stop>
          <stop offset="0.153" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

const PreslaeBox = ({
  title = "",
  content = "",
}: {
  title: string | React.ReactNode;
  content: string | React.ReactNode;
}) => {
  return (
    <div className="flex h-[261px] w-full flex-col justify-between rounded-[10px] border border-white/[0.19] bg-[rgba(27,27,27,0.65)] px-9 pb-[46px] pt-9">
      <p className="font-dinPro text-[50px] font-bold leading-[60px]">
        {title}
      </p>
      <p className="text-xl opacity-80">{content}</p>
    </div>
  );
};

export default function PresaleFund() {
  const t = useTranslations();
  const tranlate = (text: string) => t(`presale.${text}`);
  return (
    <div className="container relative mx-auto flex w-full max-w-[1404px] flex-col items-center px-3 font-aeonikPro font-normal text-white md:px-0">
      <div className="absolute left-[-66px] top-[-25px]  h-[1000px] w-[400px] text-white">
        <Image
          src="/images/Presale/gradient-1.png"
          alt="bg"
          className="object-cover"
          fill
          sizes="(max-width: 600px) 100vw, 100vw"
        />
      </div>
      <div className="w-full text-center">
        <h1 className="text-[50px] leading-[60px]">{tranlate("title-fund")}</h1>
        <p className="mt-6 text-xl">{tranlate("description-fund")}</p>
      </div>
      <div className="relative mt-[45px] flex w-screen items-center justify-center px-3 py-[38px] sm:px-0">
        <Ellipse className="absolute left-0 right-0 top-[11px] w-full" />
        <div className="relative z-10 flex max-w-[1047px] flex-col items-center justify-center gap-6 lg:flex-row">
          <PreslaeBox title="50%" content={tranlate("content-1")} />
          <PreslaeBox title="30%" content={tranlate("content-2")} />
          <PreslaeBox title="20%" content={tranlate("content-3")} />
        </div>
      </div>
    </div>
  );
}

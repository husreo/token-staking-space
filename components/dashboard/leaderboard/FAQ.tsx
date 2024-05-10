import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
const FAQItem = ({
  title = "",
  content = "",
  type = "normal",
  children,
}: {
  title?: string;
  content?: string;
  type?: "normal" | "custom";
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-[18px] bg-white/[0.08] p-5 shadow-[0px_14px_84px_-30px_rgba(0,0,0,0.06),0px_1px_7px_0px_rgba(0,0,0,0.02)] sm:p-9">
      {type === "normal" && (
        <>
          <p className="text-xl font-bold">{title}</p>
          <p className="text-base font-normal leading-6 text-[#C0C0C0]">
            {content}
          </p>
        </>
      )}
      {type === "custom" && <>{children}</>}
    </div>
  );
};

const FQAData = [
  {
    title: "",
    content: "",
  },
];
export default function FAQ() {
  const t = useTranslations();
  const tranlate = (text: string) => t(`leaderboard.FAQ.${text}`);
  return (
    <div id="fqa-leaderboard" className="mt-[80px] flex w-full justify-center">
      <div className="max-w-[931px]">
        <h1 className="w-full text-center text-[50px] font-medium">FAQ</h1>
        <div className="mt-6 flex flex-col gap-3">
          <FAQItem title={tranlate("title1")} content={tranlate("content1")} />
          <FAQItem title={tranlate("title2")} content={tranlate("content2")} />
          <FAQItem title={tranlate("title3")} content={tranlate("content3")} />
          <FAQItem title={tranlate("title4")} content={tranlate("content4")} />
          <FAQItem title={tranlate("title5")} content={tranlate("content5")} />
          <FAQItem title={tranlate("title6")} content={tranlate("content6")} />
          <FAQItem title={tranlate("title7")} content={tranlate("content7")} />
          <FAQItem title={tranlate("title8")} content={tranlate("content8")} />
          <FAQItem title={tranlate("title9")} content={tranlate("content9")} />
          <FAQItem type="custom">
            <p className="text-xl font-bold">{tranlate("title10")}</p>
            <p>
              {tranlate("content10")}{" "}
              <Link
                href={"/presale"}
                className="text-base font-normal leading-6 text-fcon underline hover:opacity-80"
              >
                Aviatrix Starter Pack
              </Link >{" "}
              {tranlate("or")}{" "}
              <Link href={"/dashboard?tab=overview"} className="text-base font-normal leading-6 text-fcon underline hover:opacity-80">
                {tranlate("sub-content10")}
              </Link>{" "}
              {tranlate("content10-1")}
            </p>
          </FAQItem>
        </div>
      </div>
    </div>
  );
}

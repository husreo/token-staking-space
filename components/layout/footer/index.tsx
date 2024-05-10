import { SOCIAL_LINK } from "constants/global";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";
import Translation from "utils/translation";
import ComponentContainer from "../../shared/container/ComponentContainer";
import DiscordIcon from "../../shared/icons/brand/discord/discord";
import TelegramIcon from "../../shared/icons/brand/telegram/telegram";
import TwitterIcon from "../../shared/icons/brand/twitter/twitter";
import dynamic from "next/dynamic";

const SocialLink = dynamic(
  async () =>
    (await import("./SocialLink")),
  { ssr: false },
);

const StyleLink = ({
  children,
  href,
  target = "_self",
}: {
  children: React.ReactNode;
  href: string;
  target?: HTMLAttributeAnchorTarget;
}) => {
  return (
    <Link
      target={target}
      href={href}
      className="text-base font-medium text-white"
    >
      {children}
    </Link>
  );
};
const ArrowLink = ({
  children,
  href,
  isExternal,
}: {
  children: React.ReactNode;
  href: string;
  isExternal?: boolean;
}) => {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : "_self"}
      className="flex w-fit items-center gap-3 rounded-lg border border-white/[0.16] py-1 pl-4 pr-1 font-medium text-white dark:border-white dark:text-white"
    >
      {children}
      <span className="flex h-8 w-8 items-center justify-center rounded bg-white/[0.13]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          fill="none"
          viewBox="0 0 13 13"
        >
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M2.5 1.005h9v9M1 11.495L11.495 1"
          ></path>
        </svg>
      </span>
    </Link>
  );
};

export default function Footer() {
  return (
    <footer className="bg-black py-12 pt-16 dark:bg-black">
      <ComponentContainer className="px-5 xl:px-0">
        <div className="relative mb-14 h-14 w-[140px]">
          <Image
            src="/images/logo.png"
            fill
            alt="logo"
            sizes="(max-width: 600px) 100vw, 100vw"
          />
        </div>
        <div className="mb-24 flex flex-col gap-12">
          <div className="flex flex-wrap items-start gap-5 sm:justify-between">
            <div className="flex flex-wrap items-center gap-5 gap-y-3">
              <ArrowLink isExternal href="https://forms.gle/8dMMN5xVYHqE4VDs6">
                <Translation text="footer.enquiries" />
              </ArrowLink>
              <ArrowLink isExternal href="https://forms.gle/8dMMN5xVYHqE4VDs6">
                <Translation text="footer.ventures" />
              </ArrowLink>
              <ArrowLink href="https://forms.gle/hLpdL2CB9ZGzsyZZ6" isExternal>
                <Translation text="footer.grants" />
              </ArrowLink>
            </div>
            <div className="flex items-center gap-10 lg:gap-20 xl:gap-28">
              <div className="flex flex-col gap-3">
                <StyleLink href="/privacy-policy">
                  <Translation text="footer.privacy" />
                </StyleLink>
                <StyleLink href="/terms-of-use">
                  <Translation text="footer.term-of-use" />
                </StyleLink>
                <StyleLink href="/branding-kit">
                  <Translation text="footer.branding-kit" />
                </StyleLink>
              </div>
              <div className="flex flex-col gap-3">
                <StyleLink href="/">
                  <Translation text="footer.leaderboard" />
                </StyleLink>
                <StyleLink href="/about-us">
                  <Translation text="footer.about-us" />
                </StyleLink>
                <StyleLink
                  target="_blank"
                  href="https://forms.gle/YYHKRcNYcqUuhkRdA"
                >
                  <Translation text="footer.support" />
                </StyleLink>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[#959595]">
            © <Translation text="footer.copy-right" />
          </p>
          <SocialLink />
        </div>
      </ComponentContainer>
    </footer>
  );
}

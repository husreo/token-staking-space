"use client";

import Button from "@/components/shared/button";
import { Transition } from "@headlessui/react";
import { Session } from "next-auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import "swiper/css";
import { classNames } from "utils/string";
import Translation from "utils/translation";
import OtherSignIn from "../OtherSignIn";
import SetupUsername from "./SetupUserName";

const SignupPanel = ({ session, locale }: { session: Session | null, locale: string }) => {
  const ref = useRef(null);
  const searchParams = useSearchParams();
  const [isShowing, setIsShowing] = useState(!!session?.provider);
  const referral = searchParams.get("referral");

  return (
    <div
      ref={ref}
      className={classNames(
        "flex w-full flex-1 items-center justify-center overflow-y-scroll px-3 sm:px-0",
        // size && size?.height > 800 ? "items-center" : "",
      )}
    >
      <Transition
        // as={Fragment}
        show={!isShowing}
        enter="transform transition duration-400"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0 origin-right"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 translate-x-0 origin-left"
        leaveTo="opacity-0 -translate-x-full"
      >
        <div className="w-full max-w-[556px] rounded-[10px] bg-white px-5 py-10 text-gray0 sm:px-20 sm:py-20">
          <div className="h-full w-full">
            <h2 className="mb-5 text-center text-[32px] font-medium">
              <Translation text="new-user.title" />
            </h2>
            {!session?.provider && (
              <>
                <OtherSignIn />
                <p className="my-4 w-full text-center text-base tracking-[-0.48]">
                  <Translation text="new-user.or" />
                </p>
              </>
            )}
            <Button
              // loading={loading}
              onClick={() => setIsShowing(true)}
              type="submit"
              className="h-10 w-full rounded-[1000px] font-aeonikPro font-medium"
            >
              <Translation text="new-user.create" />
            </Button>
            <p className="my-4 text-left text-[13px] font-normal tracking-[-0.1px]">
              <Translation text="new-user.signing-up" />{" "}
              <Link className="text-fcon" href={"/terms-of-use"}>
                {" "}
                <Translation text="footer.term-of-use" />
              </Link>{" "}
              <Translation text="new-user.read-policy" />{" "}
              <Link className="text-fcon" href={"/privacy-policy"}>
                <Translation text="footer.privacy" />
              </Link>
            </p>
            <p className="flex items-center gap-2 text-center text-base tracking-[-0.48px] text-gray0 sm:text-left">
              <Translation text="new-user.have-account" />
              <Link href={"/login"}>
                <span className="text-fcon">
                  <Translation text="button.login" />
                </span>
              </Link>
            </p>
          </div>
        </div>
      </Transition>
      <Transition
        // as={Fragment}
        show={isShowing}
        enter="transform transition duration-500"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0 origin-right"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 translate-x-0 origin-left"
        leaveTo="opacity-0 translate-x-full"
      >
        <div className="w-full max-w-2xl rounded-[10px] bg-white px-5 py-10 text-gray0 sm:px-20 sm:py-20">
          {/* <h2 className="tracking-[-0.48px] text-gray0">Step 1/3</h2> */}
          <SetupUsername
            session={session || undefined}
            locale={locale || undefined}
            // updateSession={handleUpdateSession}
            referralCode={referral || undefined}
          />
        </div>
      </Transition>
    </div>
  );
};

export default SignupPanel;

"use client";

import Button from "@/components/shared/button";
import confetti from "canvas-confetti";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUpdatedAt } from "store/features/user/userSlice";
import Translation from "utils/translation";

const WelcomeUser = ({ session }: { session: Session }) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUpdatedAt(Date.now()));
    confetti();
  }, [dispatch]);

  return (
    <div className="flex h-screen flex-col items-center justify-center px-3 sm:px-0">
      <div className="w-full max-w-2xl rounded-[10px] bg-white py-10 text-center">
        <Image
          src={session.user?.image || "/images/mock_avatar.png"}
          alt="avatar"
          width={128}
          height={128}
          className="mx-auto mb-8 rounded-full"
        />
        <div className="mb-14 text-center">
          <h2 className="mb-2 text-3xl font-medium text-black">
            <Translation text="new-user.welcome" /> {session?.user?.nickname}!
          </h2>
          <p className="mx-auto w-2/3 text-center text-black">
            <Translation text="new-user.congratulations1" />
          </p>
        </div>
        <Link href="/authorization?callback=dashboard">
          <Button className="mx-auto block rounded-3xl !px-10 !py-3 text-black">
            {t("new-user.take-me-to-dashboard")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeUser;

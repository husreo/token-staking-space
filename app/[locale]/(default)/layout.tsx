"use client";

import Footer from "@/components/layout/footer";
import NewNav from "@/components/layout/new-nav";

import { useEffect } from "react";

import { classNames } from "utils/string";
import "../../globals.css";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  searchParams?: any;
}) {
  const { push } = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  // get params "referral" from url
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referral = urlParams.get("referral");
    if (referral) {
      //redirect to dashboard
      // window.location.href = `/dashboard?referral=${referral}`;
      push("/dashboard?referral=" + referral);
    }
  }, []);

  return (
    <>
      <NewNav />
      <main
        className={classNames(
          "w-screen bg-gray0",
          // session?.user?.nickname && session?.user?.is_verified ? "" : "pt-10",
        )}
      >
        {/* {isLoading ? <LoadingPage /> : null} */}
        {children}
      </main>
      <Footer />
    </>
  );
}

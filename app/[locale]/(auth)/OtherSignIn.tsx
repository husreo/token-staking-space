import { Google } from "@/components/shared/icons";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

export default function OtherSignIn() {
  const { get } = useSearchParams();
  const d = useParams();
  const callback = get("callbackUrl");
  const referral = get("referral");

  const defaultURL = d?.locale ? "/" + d.locale + "/" : "/";

  const callbackURL = callback
    ? defaultURL +
      "authorization" +
      `?callback=${callback.replace("/", "")}&referral=${referral}`
    : defaultURL + "authorization" + `?referral=${referral}`;

  return (
    <div className="mt-4 flex w-full flex-wrap justify-center gap-3">
      <div
        className="flex w-[90px] cursor-pointer items-center justify-center rounded-[65px] border border-white/10 bg-[#F1F1F1] p-3 transition-all duration-100 max-[414px]:w-full"
        onClick={() =>
          signIn("google", {
            callbackUrl: callbackURL,
          })
        }
      >
        <Google className="w-5 h-5" />
      </div>
      {/* <div
        className="flex w-[90px] cursor-pointer items-center justify-center rounded-[65px] border border-white/10 bg-[#F1F1F1] p-3 transition-all duration-100"
        onClick={() => signIn("facebook")}
      >
        <Image
          src="/images/socials/facebook.png"
          width={24}
          height={24}
          alt="twitter"
        />
      </div> */}
      <div
        className="flex w-[90px] cursor-pointer items-center justify-center rounded-[65px] border border-white/10 bg-[#F1F1F1] p-3 transition-all duration-100 max-[414px]:w-full"
        onClick={() =>
          signIn("apple", {
            callbackUrl: callbackURL,
          })
        }
      >
        <Image
          src="/images/socials/apple.png"
          width={24}
          height={24}
          alt="apple"
        />
      </div>
      <div
        className="flex w-[90px] cursor-pointer items-center justify-center rounded-[65px] border border-white/10 bg-[#F1F1F1] p-3 transition-all duration-100 max-[414px]:w-full"
        onClick={() =>
          signIn("twitter", {
            callbackUrl: callbackURL,
          })
        }
      >
        <Image
          src="/images/socials/twitter.png"
          width={24}
          height={24}
          alt="twitter"
        />
      </div>
    </div>
  );
}

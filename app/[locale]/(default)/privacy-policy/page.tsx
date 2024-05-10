"use client";
import PrivacyPolicyEN from "./PrivacyEN";
import PrivacyPolicyVN from "./PrivacyVN";

export default function PrivacyPolicy({
  params,
}: {
  params: {
    locale: string;
  };
}) {
  const { locale } = params;

  return <>{locale === "en" ? <PrivacyPolicyEN /> : <PrivacyPolicyVN />}</>;
}

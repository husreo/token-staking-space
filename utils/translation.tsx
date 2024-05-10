"use client";

import { useTranslations } from "next-intl";

const Translation = ({ text, sub = "" }: { text: string; sub?: string }) => {
  const t = useTranslations(sub);
  return <>{t(text)}</>;
};

export default Translation;

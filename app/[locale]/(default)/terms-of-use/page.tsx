import TermOfUseEN from "./TermOfUseEN";
import TermOfUseVN from "./TermOfUseVN";

export default function TermOfUse({
  params,
}: {
  params: {
    locale: string;
  };
}) {
  const { locale } = params;

  return <>{locale === "en" ? <TermOfUseEN /> : <TermOfUseVN />}</>;
}

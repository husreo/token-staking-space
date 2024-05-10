import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignupPanel from "./NewUserPanel";

const SignupPage = async ({
  params,
}: {
  params: {
    locale: string;
  };
}) => {
  const session = await getServerSession(authOptions);
  if (session?.access_token) {
    redirect("/");
  }
  const { locale } = params;
  return <SignupPanel session={session} locale={locale} />;
};

export default SignupPage;

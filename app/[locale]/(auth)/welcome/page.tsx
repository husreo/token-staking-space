import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import WelcomeUser from "./WelcomeUser";

const WelcomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  return <WelcomeUser session={session} />;
};

export default WelcomePage;
